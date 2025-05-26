import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { Input, Button, Select, Switcher } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import { Pais } from '@/@types/pais'
import { updatePais } from '@/api/api'
import Swal from 'sweetalert2'
import DividerMain from '../../DividerMain'
import { NAV_MODE_THEMED } from '@/constants/theme.constant'
import classNames from 'classnames'
import { useAppSelector } from '@/store'
import {
    countryOptions,
    regionCountries,
    idiomaOptions,
    rankingOptions,
} from '@/constants/paisOptions'

type CountryOption = {
    value: string
    label: string
    capital: string
}

type RegionCountries = {
    [key: string]: CountryOption[]
}

type EditPaisFormProps = {
    pais: Pais
    onEditSuccess: (updatedPais: Pais) => void
    onCancel: () => void
}

const initialValues: Partial<Pais> = {
    nombre: '',
    ficha_general_pais: {
        capital: '',
        idiomas_oficiales: [],
        region: '',
        poblacion_total: '',
    },
    costo_vida_mensual_usd: {
        moneda: '',
        tipo_cambio_usd: '',
        residencia_universitaria_usd: '',
        supermercado_mensual_usd: undefined,
        transporte_publico_usd: undefined,
        seguro_medico_obligatorio: '',
    },
    sistema_educacion: {
        descripcion_general: '',
        idiomas_instruccion: [],
        calendario_academico: '',
    },
    universidades_mejor_rankeadas: [],
    comunidad_estudiantil_internacional: {
        porcentaje_estudiantes_internacionales: undefined,
    },
    visa_y_requisitos_migratorios: {
        tipo_visa_estudiante: '',
        documentacion_necesaria: [],
        trabajo_con_visa_estudiante: '',
    },
    clima_y_estilo_vida: {
        clima_promedio_ciudades: '',
        nivel_seguridad: '',
        oferta_cultural_recreativa: '',
        enchufes_y_voltaje: '',
    },
}

const EditPaisForm: React.FC<EditPaisFormProps> = ({
    pais,
    onEditSuccess,
    onCancel,
}) => {
    const navMode = useAppSelector((state) => state.theme.navMode)
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel,
    )
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
        pais.ficha_general_pais?.idiomas_oficiales || [],
    )
    const [rankedUniversities, setRankedUniversities] = useState<
        Array<{
            nombreRanking: string
            universidades: Array<{
                nombre: string
                posicion: number
                _id?: string
            }>
        }>
    >(pais.universidades_mejor_rankeadas || [])
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>(
        pais.visa_y_requisitos_migratorios?.documentacion_necesaria || [],
    )
    const [tempUniversity, setTempUniversity] = useState('')
    const [tempPosition, setTempPosition] = useState('')
    const [selectedRanking, setSelectedRanking] = useState('')
    const [tempDocument, setTempDocument] = useState('')

    const handleCountryChange = (
        country: CountryOption | null,
        setFieldValue: any,
    ) => {
        if (country) {
            // Encontrar la región del país
            const region = Object.entries(
                regionCountries as RegionCountries,
            ).find(([_, countries]) =>
                countries.some((c: CountryOption) => c.value === country.value),
            )?.[0]

            // Actualizar los campos
            setFieldValue('nombre', country.value)
            setFieldValue('ficha_general_pais.region', region)
            setFieldValue('ficha_general_pais.capital', country.capital)
        }
    }

    const handleSubmit = async (values: Partial<Pais>) => {
        try {
            if (!values.ficha_general_pais) {
                values.ficha_general_pais = {
                    capital: '',
                    idiomas_oficiales: [],
                }
            }
            if (!values.visa_y_requisitos_migratorios) {
                values.visa_y_requisitos_migratorios = {
                    tipo_visa_estudiante: '',
                    documentacion_necesaria: [],
                    trabajo_con_visa_estudiante: '',
                }
            }

            values.ficha_general_pais.idiomas_oficiales = selectedLanguages
            values.universidades_mejor_rankeadas = rankedUniversities
            values.visa_y_requisitos_migratorios.documentacion_necesaria =
                selectedDocuments

            const updatedPais = await updatePais(pais._id, values)
            Swal.fire({
                title: 'Éxito',
                text: 'El país ha sido actualizado correctamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            })
            onEditSuccess(updatedPais)
        } catch (error) {
            console.error('Error al actualizar el país:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el país.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleLanguageAdd = (idioma: string) => {
        if (!selectedLanguages.includes(idioma)) {
            setSelectedLanguages([...selectedLanguages, idioma])
        }
    }

    const handleLanguageRemove = (idioma: string) => {
        setSelectedLanguages(
            selectedLanguages.filter((lang) => lang !== idioma),
        )
    }

    const handleUniversityAdd = () => {
        if (
            !tempUniversity.trim() ||
            !tempPosition.trim() ||
            !selectedRanking
        ) {
            return
        }

        const position = parseInt(tempPosition)
        if (isNaN(position)) {
            Swal.fire({
                title: 'Error',
                text: 'La posición debe ser un número válido',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
            return
        }

        const newUniversity = {
            nombre: tempUniversity.trim(),
            posicion: position,
        }

        // Verificar duplicados antes de actualizar el estado
        const rankingIndex = rankedUniversities.findIndex(
            (r) => r.nombreRanking === selectedRanking,
        )

        if (rankingIndex !== -1) {
            const ranking = rankedUniversities[rankingIndex]
            const universityExists = ranking.universidades.some(
                (u) =>
                    u.nombre.toLowerCase() ===
                    newUniversity.nombre.toLowerCase(),
            )

            if (universityExists) {
                Swal.fire({
                    title: 'Error',
                    text: 'Esta universidad ya existe en el ranking seleccionado',
                    icon: 'error',
                    confirmButtonColor: '#d33',
                })
                return
            }
        }

        // Crear una copia del estado actual
        const updatedRankings = [...rankedUniversities]

        if (rankingIndex === -1) {
            // Si el ranking no existe, crear uno nuevo
            updatedRankings.push({
                nombreRanking: selectedRanking,
                universidades: [newUniversity],
            })
        } else {
            // Si el ranking existe, agregar la universidad
            updatedRankings[rankingIndex].universidades.push(newUniversity)
        }

        // Actualizar el estado una sola vez
        setRankedUniversities(updatedRankings)
        setTempUniversity('')
        setTempPosition('')
    }

    const handleUniversityRemove = (
        rankingName: string,
        universityName: string,
    ) => {
        setRankedUniversities((prev) =>
            prev
                .map((ranking) => {
                    if (ranking.nombreRanking === rankingName) {
                        return {
                            ...ranking,
                            universidades: ranking.universidades.filter(
                                (u) => u.nombre !== universityName,
                            ),
                        }
                    }
                    return ranking
                })
                .filter((ranking) => ranking.universidades.length > 0),
        )
    }

    const handleDocumentAdd = () => {
        if (
            tempDocument.trim() &&
            !selectedDocuments.includes(tempDocument.trim())
        ) {
            setSelectedDocuments([...selectedDocuments, tempDocument.trim()])
            setTempDocument('')
        }
    }

    const handleDocumentRemove = (document: string) => {
        setSelectedDocuments(selectedDocuments.filter((d) => d !== document))
    }

    return (
        <Formik initialValues={pais} onSubmit={handleSubmit}>
            {({ values, handleChange, setFieldValue }) => (
                <Form>
                    <FormContainer>
                        <h2
                            className={classNames(
                                'text-xl font-semibold mb-6',
                                navMode === NAV_MODE_THEMED
                                    ? 'text-white'
                                    : `dark:text-white text-${themeColor}-${primaryColorLevel}`,
                            )}
                        >
                            Editar País
                        </h2>

                        {/* Información Básica */}
                        <div className="mt-4">
                            <h4 className="font-medium">Información Básica</h4>
                            <DividerMain className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem label="País" className="mb-0">
                                    <Select
                                        options={countryOptions}
                                        value={countryOptions.find(
                                            (opt) =>
                                                opt.value === values.nombre,
                                        )}
                                        onChange={(val) =>
                                            handleCountryChange(
                                                val,
                                                setFieldValue,
                                            )
                                        }
                                    />
                                </FormItem>
                                <FormItem label="Capital" className="mb-0">
                                    <Input
                                        name="ficha_general_pais.capital"
                                        value={
                                            values.ficha_general_pais?.capital
                                        }
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </FormItem>
                                <FormItem label="Región" className="mb-0">
                                    <Input
                                        name="ficha_general_pais.region"
                                        value={
                                            values.ficha_general_pais?.region
                                        }
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </FormItem>
                                <FormItem
                                    label="Población total"
                                    className="mb-0"
                                >
                                    <Input
                                        name="ficha_general_pais.poblacion_total"
                                        value={
                                            values.ficha_general_pais
                                                ?.poblacion_total
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        {/* Idiomas Oficiales */}
                        <div className="mt-4">
                            <h4 className="font-medium">Idiomas Oficiales</h4>
                            <DividerMain className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem label="Idioma" className="mb-0">
                                    <Select
                                        options={idiomaOptions}
                                        onChange={(val) => {
                                            if (val?.value) {
                                                handleLanguageAdd(val.value)
                                            }
                                        }}
                                    />
                                </FormItem>
                            </div>
                            <div className="flex flex-wrap mt-2">
                                {selectedLanguages.map((lang, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2"
                                    >
                                        <span>{lang}</span>
                                        <button
                                            type="button"
                                            className="ml-2 text-red-500"
                                            onClick={() =>
                                                handleLanguageRemove(lang)
                                            }
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Costo de Vida */}
                        <div className="mt-4">
                            <h4 className="font-medium">Costo de Vida</h4>
                            <DividerMain className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem label="Moneda" className="mb-0">
                                    <Input
                                        name="costo_vida_mensual_usd.moneda"
                                        value={
                                            values.costo_vida_mensual_usd
                                                ?.moneda
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Tipo de cambio USD"
                                    className="mb-0"
                                >
                                    <Input
                                        name="costo_vida_mensual_usd.tipo_cambio_usd"
                                        value={
                                            values.costo_vida_mensual_usd
                                                ?.tipo_cambio_usd
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Residencia universitaria (USD)"
                                    className="mb-0"
                                >
                                    <Input
                                        name="costo_vida_mensual_usd.residencia_universitaria_usd.min"
                                        value={
                                            values.costo_vida_mensual_usd
                                                ?.residencia_universitaria_usd
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Supermercado mensual (USD)"
                                    className="mb-0"
                                >
                                    <Input
                                        name="costo_vida_mensual_usd.supermercado_mensual_usd"
                                        value={
                                            values.costo_vida_mensual_usd
                                                ?.supermercado_mensual_usd
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Transporte público (USD)"
                                    className="mb-0"
                                >
                                    <Input
                                        name="costo_vida_mensual_usd.transporte_publico_usd"
                                        value={
                                            values.costo_vida_mensual_usd
                                                ?.transporte_publico_usd
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Seguro médico obligatorio"
                                    className="mb-0"
                                >
                                    <Input
                                        name="costo_vida_mensual_usd.seguro_medico_obligatorio"
                                        value={
                                            values.costo_vida_mensual_usd
                                                ?.seguro_medico_obligatorio
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        {/* Sistema de Educación */}
                        <div className="mt-4">
                            <h4 className="font-medium">
                                Sistema de Educación
                            </h4>
                            <DividerMain className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Descripción general"
                                    className="mb-0 md:col-span-2"
                                >
                                    <Input
                                        name="sistema_educacion.descripcion_general"
                                        value={
                                            values.sistema_educacion
                                                ?.descripcion_general
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Calendario académico"
                                    className="mb-0"
                                >
                                    <Input
                                        name="sistema_educacion.calendario_academico"
                                        value={
                                            values.sistema_educacion
                                                ?.calendario_academico
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        {/* Universidades Mejor Rankeadas */}
                        <div className="mt-4">
                            <h4 className="font-medium">
                                Universidades Mejor Rankeadas
                            </h4>
                            <DividerMain className="mb-3" />
                            <div className="grid grid-cols-1 gap-4 mb-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormItem label="Ranking" className="mb-0">
                                        <Select
                                            options={rankingOptions}
                                            value={rankingOptions.find(
                                                (opt) =>
                                                    opt.value ===
                                                    selectedRanking,
                                            )}
                                            onChange={(val) =>
                                                setSelectedRanking(
                                                    val?.value || '',
                                                )
                                            }
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Universidad"
                                        className="mb-0"
                                    >
                                        <Input
                                            value={tempUniversity}
                                            onChange={(e) =>
                                                setTempUniversity(
                                                    e.target.value,
                                                )
                                            }
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleUniversityAdd()
                                                }
                                            }}
                                        />
                                    </FormItem>
                                    <FormItem label="Posición" className="mb-0">
                                        <Input
                                            type="number"
                                            value={tempPosition}
                                            onChange={(e) =>
                                                setTempPosition(e.target.value)
                                            }
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleUniversityAdd()
                                                }
                                            }}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="solid"
                                        size="sm"
                                        onClick={handleUniversityAdd}
                                    >
                                        Añadir Universidad
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {rankedUniversities.map(
                                    (ranking, rankingIndex) => (
                                        <div
                                            key={rankingIndex}
                                            className="bg-gray-50 p-4 rounded-lg"
                                        >
                                            <h5 className="font-medium mb-2">
                                                {ranking.nombreRanking}
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                                {ranking.universidades.map(
                                                    (university, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center bg-white rounded-full px-3 py-1 border"
                                                        >
                                                            <span>
                                                                {
                                                                    university.nombre
                                                                }{' '}
                                                                (#
                                                                {
                                                                    university.posicion
                                                                }
                                                                )
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="ml-2 text-red-500"
                                                                onClick={() =>
                                                                    handleUniversityRemove(
                                                                        ranking.nombreRanking,
                                                                        university.nombre,
                                                                    )
                                                                }
                                                            >
                                                                x
                                                            </button>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* Comunidad Estudiantil Internacional */}
                        <div className="mt-4">
                            <h4 className="font-medium">
                                Comunidad Estudiantil Internacional
                            </h4>
                            <DividerMain className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Porcentaje de estudiantes internacionales"
                                    className="mb-0"
                                >
                                    <Input
                                        name="comunidad_estudiantil_internacional.porcentaje_estudiantes_internacionales"
                                        value={
                                            values
                                                .comunidad_estudiantil_internacional
                                                ?.porcentaje_estudiantes_internacionales
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        {/* Visa y Requisitos Migratorios */}
                        <div className="mt-4">
                            <h4 className="font-medium">
                                Visa y Requisitos Migratorios
                            </h4>
                            <DividerMain className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Tipo de visa estudiante"
                                    className="mb-0"
                                >
                                    <Input
                                        name="visa_y_requisitos_migratorios.tipo_visa_estudiante"
                                        value={
                                            values.visa_y_requisitos_migratorios
                                                ?.tipo_visa_estudiante
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Trabajo con visa estudiante"
                                    className="mb-0"
                                >
                                    <Input
                                        name="visa_y_requisitos_migratorios.trabajo_con_visa_estudiante"
                                        value={
                                            values.visa_y_requisitos_migratorios
                                                ?.trabajo_con_visa_estudiante
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-medium mb-2">
                                    Documentación necesaria
                                </h5>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="col-span-2">
                                        <FormItem
                                            label="Documento"
                                            className="mb-0"
                                        >
                                            <Input
                                                value={tempDocument}
                                                onChange={(e) =>
                                                    setTempDocument(
                                                        e.target.value,
                                                    )
                                                }
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault()
                                                        handleDocumentAdd()
                                                    }
                                                }}
                                            />
                                        </FormItem>
                                    </div>
                                    <div className="flex items-end mb-1">
                                        <Button
                                            type="button"
                                            variant="solid"
                                            size="sm"
                                            onClick={handleDocumentAdd}
                                        >
                                            Añadir Documento
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-2">
                                    {selectedDocuments.map(
                                        (document, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2"
                                            >
                                                <span>{document}</span>
                                                <button
                                                    type="button"
                                                    className="ml-2 text-red-500"
                                                    onClick={() =>
                                                        handleDocumentRemove(
                                                            document,
                                                        )
                                                    }
                                                >
                                                    x
                                                </button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Clima y Estilo de Vida */}
                        <div className="mt-4">
                            <h4 className="font-medium">
                                Clima y Estilo de Vida
                            </h4>
                            <DividerMain className="mb-3" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Clima promedio"
                                    className="mb-0"
                                >
                                    <Input
                                        name="clima_y_estilo_vida.clima_promedio_ciudades"
                                        value={
                                            values.clima_y_estilo_vida
                                                ?.clima_promedio_ciudades
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Nivel de seguridad"
                                    className="mb-0"
                                >
                                    <Input
                                        name="clima_y_estilo_vida.nivel_seguridad"
                                        value={
                                            values.clima_y_estilo_vida
                                                ?.nivel_seguridad
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Oferta cultural y recreativa"
                                    className="mb-0"
                                >
                                    <Input
                                        name="clima_y_estilo_vida.oferta_cultural_recreativa"
                                        value={
                                            values.clima_y_estilo_vida
                                                ?.oferta_cultural_recreativa
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Enchufes y voltaje"
                                    className="mb-0"
                                >
                                    <Input
                                        name="clima_y_estilo_vida.enchufes_y_voltaje"
                                        value={
                                            values.clima_y_estilo_vida
                                                ?.enchufes_y_voltaje
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-end space-x-4 mt-8">
                            <Button
                                type="button"
                                variant="plain"
                                onClick={onCancel}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" variant="solid">
                                Guardar cambios
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default EditPaisForm
