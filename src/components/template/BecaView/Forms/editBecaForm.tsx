import React, { useState } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import {
    Input,
    Button,
    Select,
    Switcher,
    DatePicker,
    Upload,
} from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import { Beca } from '@/@types/beca'
import { updateBeca } from '@/api/api'
import Swal from 'sweetalert2'
import DeleteButton from '../../DeleteButton'
import DividerMain from '../../DividerMain'
import { NAV_MODE_THEMED } from '@/constants/theme.constant'
import classNames from 'classnames'
import { useAppSelector } from '@/store'
import {
    tipoBecaOptions,
    nivelAcademicoOptions,
    countryOptions,
    regionOptions,
    duracionUnidadOptions,
    idiomaOptions,
    nivelIdiomaOptions,
    areaEstudioOptions,
} from '@/constants/becaOptions'
import { uploadFile } from '@/services/FileUploadService'

type BecaEditFormProps = {
    beca: Beca
    onEditSuccess: (updatedBeca: Beca) => void
    onCancel: () => void
}

const BecaEditForm: React.FC<BecaEditFormProps> = ({
    beca,
    onEditSuccess,
    onCancel,
}) => {
    const navMode = useAppSelector((state) => state.theme.navMode)
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel,
    )

    const [allCountries, setAllCountries] = useState<string[]>(
        countryOptions.map((option) => option.value),
    )
    const [selectedCountries, setSelectedCountries] = useState<string[]>(
        beca.paisPostulante || [],
    )
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [selectedLanguages, setSelectedLanguages] = useState<
        Array<{ idioma: string; nivelIdioma: string }>
    >(
        (beca.requisitos?.idiomasRequeridos || []).map((idioma) => ({
            idioma: idioma.idioma || '',
            nivelIdioma: idioma.nivelIdioma || '',
        })),
    )
    const [tempLanguage, setTempLanguage] = useState<{
        idioma: string
        nivelIdioma: string
    }>({ idioma: '', nivelIdioma: '' })
    const [selectedExams, setSelectedExams] = useState<string[]>(
        beca.requisitos?.examenesRequeridos || [],
    )
    const [tempExam, setTempExam] = useState('')

    const handleCountrySelect = (country: string) => {
        if (!selectedCountries.includes(country)) {
            setSelectedCountries([...selectedCountries, country])
        }
    }

    const handleCountryRemove = (country: string) => {
        setSelectedCountries(selectedCountries.filter((c) => c !== country))
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImage(file)
        }
    }

    const handleImageSelect = (file: File) => {
        setImage(file)
        setPreviewUrl(URL.createObjectURL(file))
    }

    const handleImageRemove = () => {
        setImage(null)
        setPreviewUrl(null)
    }

    const handleLanguageAdd = (idioma: string, nivelIdioma: string) => {
        if (!selectedLanguages.some((lang) => lang.idioma === idioma)) {
            setSelectedLanguages([
                ...selectedLanguages,
                { idioma, nivelIdioma },
            ])
        }
        // Reset temporal values
        setTempLanguage({ idioma: '', nivelIdioma: '' })
    }

    const handleLanguageRemove = (idioma: string) => {
        setSelectedLanguages(
            selectedLanguages.filter((lang) => lang.idioma !== idioma),
        )
    }

    const handleExamAdd = () => {
        if (tempExam.trim() && !selectedExams.includes(tempExam.trim())) {
            setSelectedExams([...selectedExams, tempExam.trim()])
            setTempExam('')
        }
    }

    const handleExamRemove = (exam: string) => {
        setSelectedExams(selectedExams.filter((e) => e !== exam))
    }

    const handleConfirmEdit = (values: Partial<Beca>) => {
        const updatedValues = {
            ...values,
            paisPostulante: selectedCountries,
            imagen: image ? URL.createObjectURL(image) : undefined,
            requisitos: {
                ...values.requisitos,
                idiomasRequeridos: selectedLanguages,
                examenesRequeridos: selectedExams,
            },
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas guardar los cambios en esta beca?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleEdit(updatedValues)
            }
        })
    }

    const handleEdit = async (values: Partial<Beca>) => {
        try {
            let imageUrl: string | undefined

            // Si hay una imagen seleccionada, súbela
            if (image) {
                imageUrl = await uploadFile(image, 'becas') // Cambia 'becas' por el nombre de la carpeta que desees
            }

            const updatedValues = {
                ...values,
                paisPostulante: selectedCountries,
                imagen: imageUrl || values.imagen, // Usa la URL de la imagen subida o la existente
            }

            const updatedBeca = await updateBeca(beca._id, updatedValues)
            Swal.fire({
                title: 'Guardado',
                text: 'La beca ha sido actualizada correctamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            })
            onEditSuccess(updatedBeca)
        } catch (error) {
            console.error('Error al actualizar la beca:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar la beca.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    return (
        <Formik
            initialValues={{
                ...beca,
                fechaInicioAplicacion: beca.fechaInicioAplicacion || '',
                fechaFinAplicacion: beca.fechaFinAplicacion || '',
            }}
            onSubmit={(values) => handleConfirmEdit(values)}
        >
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
                            Editar Beca
                        </h2>

                        {/* Sección Información Básica */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem
                                label="Nombre de la beca"
                                className="md:col-span-2 mb-0"
                            >
                                <Input
                                    name="nombreBeca"
                                    value={values.nombreBeca}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Tipo de beca" className="mb-0">
                                <Select
                                    name="tipoBeca"
                                    options={tipoBecaOptions}
                                    value={
                                        tipoBecaOptions.find(
                                            (opt) =>
                                                opt.value === values.tipoBeca,
                                        ) || null
                                    }
                                    onChange={(val) =>
                                        setFieldValue('tipoBeca', val?.value)
                                    }
                                />
                            </FormItem>

                            <FormItem label="Nivel académico" className="mb-0">
                                <Select
                                    name="nivelAcademico"
                                    options={nivelAcademicoOptions}
                                    value={
                                        nivelAcademicoOptions.find(
                                            (opt) =>
                                                opt.value ===
                                                values.nivelAcademico,
                                        ) || null
                                    }
                                    onChange={(val) =>
                                        setFieldValue(
                                            'nivelAcademico',
                                            val?.value,
                                        )
                                    }
                                />
                            </FormItem>

                            <FormItem className="mb-0" label="País destino">
                                <Select
                                    name="paisDestino"
                                    options={countryOptions}
                                    value={
                                        countryOptions.find(
                                            (opt) =>
                                                opt.value ===
                                                values.paisDestino,
                                        ) || null
                                    }
                                    onChange={(val) =>
                                        setFieldValue('paisDestino', val?.value)
                                    }
                                />
                            </FormItem>

                            <FormItem className="mb-0" label="Región destino">
                                <Select
                                    name="regionDestino"
                                    options={regionOptions}
                                    value={
                                        regionOptions.find(
                                            (opt) =>
                                                opt.value ===
                                                values.regionDestino,
                                        ) || null
                                    }
                                    onChange={(val) =>
                                        setFieldValue(
                                            'regionDestino',
                                            val?.value,
                                        )
                                    }
                                />
                            </FormItem>

                            <FormItem className="mb-0" label="Área de estudio">
                                <Input
                                    name="areaEstudio"
                                    value={values.areaEstudio}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem
                                className="mb-0"
                                label="Universidad destino"
                            >
                                <Input
                                    name="universidadDestino"
                                    value={values.universidadDestino || ''}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem className="mb-0" label="Entidad becaria">
                                <Input
                                    name="entidadBecaria"
                                    value={values.entidadBecaria || ''}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem
                                className="mb-0"
                                label="Cantidad de cupos"
                            >
                                <Input
                                    type="number"
                                    name="cantCupos"
                                    value={values.cantCupos || ''}
                                    onChange={handleChange}
                                />
                            </FormItem>
                        </div>

                        {/* Sección Duración */}
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormItem className="mb-0" label="Duración mínima">
                                <Input
                                    type="number"
                                    name="duracion.duracionMinima"
                                    value={
                                        values.duracion?.duracionMinima || ''
                                    }
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem className="mb-0" label="Duración máxima">
                                <Input
                                    type="number"
                                    name="duracion.duracionMaxima"
                                    value={
                                        values.duracion?.duracionMaxima || ''
                                    }
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem
                                className="mb-0"
                                label="Unidad de duración"
                            >
                                <Select
                                    name="duracion.duracionUnidad"
                                    options={duracionUnidadOptions}
                                    value={
                                        duracionUnidadOptions.find(
                                            (opt) =>
                                                opt.value ===
                                                values.duracion?.duracionUnidad,
                                        ) || null
                                    }
                                    onChange={(val) =>
                                        setFieldValue(
                                            'duracion.duracionUnidad',
                                            val?.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </div>

                        {/* Sección Fechas */}
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem
                                className="mb-0"
                                label="Fecha de aplicación inicial"
                            >
                                <DatePicker
                                    value={
                                        values.fechaInicioAplicacion
                                            ? new Date(
                                                  values.fechaInicioAplicacion,
                                              )
                                            : null
                                    }
                                    onChange={(date) => {
                                        if (date) {
                                            const formattedDate = date
                                                .toISOString()
                                                .split('T')[0]
                                            setFieldValue(
                                                'fechaInicioAplicacion',
                                                formattedDate,
                                            )
                                        } else {
                                            setFieldValue(
                                                'fechaInicioAplicacion',
                                                '',
                                            )
                                        }
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                className="mb-0"
                                label="Fecha de aplicación final"
                            >
                                <DatePicker
                                    value={
                                        values.fechaFinAplicacion
                                            ? new Date(
                                                  values.fechaFinAplicacion,
                                              )
                                            : null
                                    }
                                    onChange={(date) => {
                                        if (date) {
                                            const formattedDate = date
                                                .toISOString()
                                                .split('T')[0]
                                            setFieldValue(
                                                'fechaFinAplicacion',
                                                formattedDate,
                                            )
                                        } else {
                                            setFieldValue(
                                                'fechaFinAplicacion',
                                                '',
                                            )
                                        }
                                    }}
                                />
                            </FormItem>
                        </div>

                        {/* Paises Postulantes */}
                        <div>
                            <div className="mt-4">
                                <h4 className="font-medium">
                                    Paises postulantes
                                </h4>
                                <DividerMain className="mb-3" />
                            </div>

                            <FormItem
                                label="Países postulantes"
                                className="mb-0"
                            >
                                <Select
                                    options={countryOptions}
                                    onChange={(val) => {
                                        if (val?.value) {
                                            handleCountrySelect(val.value)
                                        }
                                    }}
                                />
                            </FormItem>
                            <div className="flex flex-wrap mt-2">
                                {selectedCountries.map((country, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2"
                                    >
                                        <span>{country}</span>
                                        <button
                                            type="button"
                                            className="ml-2 text-red-500"
                                            onClick={() =>
                                                handleCountryRemove(country)
                                            } // Permite borrar el país
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sección Requisitos */}
                        <div>
                            <div>
                                <div className="mt-4">
                                    <h4 className="font-medium">
                                        Requerimientos
                                    </h4>
                                    <DividerMain className="mb-3" />
                                </div>
                                <div>
                                    <div className="flex gap-4">
                                        <FormItem
                                            className="flex-1 mb-0"
                                            label="Nivel académico mínimo"
                                        >
                                            <Select
                                                name="requisitos.nivelAcademicoMin"
                                                options={nivelAcademicoOptions}
                                                value={
                                                    nivelAcademicoOptions.find(
                                                        (opt) =>
                                                            opt.value ===
                                                            values.requisitos
                                                                ?.nivelAcademicoMin,
                                                    ) || null
                                                }
                                                onChange={(val) =>
                                                    setFieldValue(
                                                        'requisitos.nivelAcademicoMin',
                                                        val?.value,
                                                    )
                                                }
                                            />
                                        </FormItem>

                                        <FormItem
                                            className="flex-1 mb-0"
                                            label="Edad máxima"
                                        >
                                            <Input
                                                type="number"
                                                name="requisitos.edadMax"
                                                value={
                                                    values.requisitos
                                                        ?.edadMax || ''
                                                }
                                                onChange={handleChange}
                                            />
                                        </FormItem>

                                        <FormItem
                                            className="flex-1 mb-0"
                                            label="Promedio mínimo"
                                        >
                                            <Input
                                                type="number"
                                                step="0.01"
                                                name="requisitos.promedioMin"
                                                value={
                                                    values.requisitos
                                                        ?.promedioMin || ''
                                                }
                                                onChange={handleChange}
                                            />
                                        </FormItem>
                                    </div>

                                    <div className="flex space-x-6 mt-3">
                                        <label className="flex items-center">
                                            <Switcher
                                                name="requisitos.idiomaCondicion"
                                                checked={
                                                    values.requisitos
                                                        ?.idiomaCondicion ||
                                                    false
                                                }
                                                onChange={(value) => {
                                                    setFieldValue(
                                                        'requisitos.idiomaCondicion',
                                                        !values.requisitos
                                                            ?.idiomaCondicion,
                                                    )
                                                }}
                                            />
                                            <span className="ml-1">
                                                Requiere idioma
                                            </span>
                                        </label>

                                        <label className="flex items-center">
                                            <Switcher
                                                name="requisitos.avalUnivProcedencia"
                                                checked={
                                                    values.requisitos
                                                        ?.avalUnivProcedencia ||
                                                    false
                                                }
                                                onChange={(value) => {
                                                    setFieldValue(
                                                        'requisitos.avalUnivProcedencia',
                                                        !values.requisitos
                                                            ?.avalUnivProcedencia,
                                                    )
                                                }}
                                            />
                                            <span className="ml-1">
                                                Aval universidad procedencia
                                            </span>
                                        </label>

                                        <label className="flex items-center">
                                            <Switcher
                                                name="requisitos.avalUnivDestino"
                                                checked={
                                                    values.requisitos
                                                        ?.avalUnivDestino ||
                                                    false
                                                }
                                                onChange={(value) => {
                                                    setFieldValue(
                                                        'requisitos.avalUnivDestino',
                                                        !values.requisitos
                                                            ?.avalUnivDestino,
                                                    )
                                                }}
                                            />
                                            <span className="ml-1">
                                                Aval universidad destino
                                            </span>
                                        </label>

                                        <label className="flex items-center">
                                            <Switcher
                                                name="requisitos.cartaRecomendacion"
                                                checked={
                                                    values.requisitos
                                                        ?.cartaRecomendacion ||
                                                    false
                                                }
                                                onChange={(value) => {
                                                    setFieldValue(
                                                        'requisitos.cartaRecomendacion',
                                                        !values.requisitos
                                                            ?.cartaRecomendacion,
                                                    )
                                                }}
                                            />
                                            <span className="ml-1">
                                                Carta de recomendación
                                            </span>
                                        </label>

                                        <label className="flex items-center">
                                            <Switcher
                                                name="requisitos.necesidadEconom"
                                                checked={
                                                    values.requisitos
                                                        ?.necesidadEconom ||
                                                    false
                                                }
                                                onChange={(value) => {
                                                    setFieldValue(
                                                        'requisitos.necesidadEconom',
                                                        !values.requisitos
                                                            ?.necesidadEconom,
                                                    )
                                                }}
                                            />
                                            <span className="ml-1">
                                                Necesidad económica
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Idiomas Requeridos */}
                        <div className="mt-4">
                            <h4 className="font-medium">Idiomas requeridos</h4>
                            <DividerMain className="mb-3" />

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <FormItem label="Idioma" className="mb-0">
                                    <Select
                                        value={
                                            tempLanguage.idioma
                                                ? idiomaOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                          tempLanguage.idioma,
                                                  )
                                                : null
                                        }
                                        options={idiomaOptions}
                                        onChange={(val) => {
                                            if (val?.value) {
                                                setTempLanguage((prev) => ({
                                                    ...prev,
                                                    idioma: val.value,
                                                }))
                                                if (tempLanguage.nivelIdioma) {
                                                    handleLanguageAdd(
                                                        val.value,
                                                        tempLanguage.nivelIdioma,
                                                    )
                                                }
                                            }
                                        }}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Nivel requerido"
                                    className="mb-0"
                                >
                                    <Select
                                        value={
                                            tempLanguage.nivelIdioma
                                                ? nivelIdiomaOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                          tempLanguage.nivelIdioma,
                                                  )
                                                : null
                                        }
                                        options={nivelIdiomaOptions}
                                        onChange={(val) => {
                                            if (val?.value) {
                                                setTempLanguage((prev) => ({
                                                    ...prev,
                                                    nivelIdioma: val.value,
                                                }))
                                                if (tempLanguage.idioma) {
                                                    handleLanguageAdd(
                                                        tempLanguage.idioma,
                                                        val.value,
                                                    )
                                                }
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
                                        <span>{`${lang.idioma} - ${lang.nivelIdioma}`}</span>
                                        <button
                                            type="button"
                                            className="ml-2 text-red-500"
                                            onClick={() =>
                                                handleLanguageRemove(
                                                    lang.idioma,
                                                )
                                            }
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Examenes Requeridos */}
                        <div className="mt-4">
                            <h4 className="font-medium">Exámenes requeridos</h4>
                            <DividerMain className="mb-3" />

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="col-span-2">
                                    <FormItem label="Examen" className="mb-0">
                                        <Input
                                            value={tempExam}
                                            onChange={(e) =>
                                                setTempExam(e.target.value)
                                            }
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleExamAdd()
                                                }
                                            }}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex items-end">
                                    <Button
                                        type="button"
                                        variant="solid"
                                        size="sm"
                                        onClick={handleExamAdd}
                                        className="w-full"
                                    >
                                        Añadir Examen
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap mt-2">
                                {selectedExams.map((exam, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2"
                                    >
                                        <span>{exam}</span>
                                        <button
                                            type="button"
                                            className="ml-2 text-red-500"
                                            onClick={() =>
                                                handleExamRemove(exam)
                                            }
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sección Cobertura */}
                        <div>
                            <div className="mt-4">
                                <h4 className="font-medium">Cobertura</h4>
                                <DividerMain className="mb-3" />
                            </div>
                            <div className="flex space-x-6 mt-3">
                                <label className="flex items-center">
                                    <Switcher
                                        name="cobertura.matricula"
                                        checked={
                                            values.cobertura?.matricula || false
                                        }
                                        onChange={(value) => {
                                            setFieldValue(
                                                'cobertura.matricula',
                                                !values.cobertura?.matricula,
                                            )
                                        }}
                                    />
                                    <span className="ml-1">Matrícula</span>
                                </label>
                                <label className="flex items-center">
                                    <Switcher
                                        name="cobertura.estipendio"
                                        checked={
                                            values.cobertura?.estipendio ||
                                            false
                                        }
                                        onChange={(value) => {
                                            setFieldValue(
                                                'cobertura.estipendio',
                                                !values.cobertura?.estipendio,
                                            )
                                        }}
                                    />
                                    <span className="ml-1">Estipendio</span>
                                </label>
                                <label className="flex items-center">
                                    <Switcher
                                        name="cobertura.pasajes"
                                        checked={
                                            values.cobertura?.pasajes || false
                                        }
                                        onChange={(value) => {
                                            setFieldValue(
                                                'cobertura.pasajes',
                                                !values.cobertura?.pasajes,
                                            )
                                        }}
                                    />
                                    <span className="ml-1">Pasajes</span>
                                </label>
                                <label className="flex items-center">
                                    <Switcher
                                        name="cobertura.seguroMedico"
                                        checked={
                                            values.cobertura?.seguroMedico ||
                                            false
                                        }
                                        onChange={(value) => {
                                            setFieldValue(
                                                'cobertura.seguroMedico',
                                                !values.cobertura?.seguroMedico,
                                            )
                                        }}
                                    />
                                    <span className="ml-1">Seguro médico</span>
                                </label>
                                <label className="flex items-center">
                                    <Switcher
                                        name="cobertura.alojamiento"
                                        checked={
                                            values.cobertura?.alojamiento ||
                                            false
                                        }
                                        onChange={(value) => {
                                            setFieldValue(
                                                'cobertura.alojamiento',
                                                !values.cobertura?.alojamiento,
                                            )
                                        }}
                                    />
                                    <span className="ml-1">Alojamiento</span>
                                </label>
                            </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem
                                className="mb-0"
                                label="Monto mensual mínimo"
                            >
                                <Input
                                    type="number"
                                    name="cobertura.montoMensualMin"
                                    value={
                                        values.cobertura?.montoMensualMin || ''
                                    }
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem
                                className="mb-0"
                                label="Monto mensual máximo"
                            >
                                <Input
                                    type="number"
                                    name="cobertura.montoMensualMax"
                                    value={
                                        values.cobertura?.montoMensualMax || ''
                                    }
                                    onChange={handleChange}
                                />
                            </FormItem>
                        </div>

                        {/* Sección Información Adicional */}
                        <div>
                            <div className="mt-4">
                                <h4 className="font-medium">
                                    Información adicional
                                </h4>
                                <DividerMain className="mb-3" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormItem label="Sitio web" className="mb-3">
                                    <Input
                                        name="informacionAdicional.sitioWeb"
                                        value={
                                            values.informacionAdicional
                                                ?.sitioWeb || ''
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Correo de contacto"
                                    className="mb-3"
                                >
                                    <Input
                                        type="email"
                                        name="informacionAdicional.correoContacto"
                                        value={
                                            values.informacionAdicional
                                                ?.correoContacto || ''
                                        }
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormItem
                                    label="Dificultad (1-5)"
                                    className="mb-1"
                                >
                                    <Input
                                        type="number"
                                        min="1"
                                        max="5"
                                        name="dificultad"
                                        value={values.dificultad || ''}
                                        onChange={handleChange}
                                    />
                                </FormItem>
                                <div className="flex items-center mt-6">
                                    <Switcher
                                        name="destacada"
                                        checked={values.destacada || false}
                                        onChange={(value) => {
                                            setFieldValue(
                                                'destacada',
                                                !values.destacada,
                                            )
                                        }}
                                    />
                                    <span className="ml-1">Beca Destacada</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-medium">
                                Imagen actual de la beca
                            </h4>
                            <DividerMain className="mb-3" />
                            {beca.imagen && (
                                <img
                                    src={beca.imagen}
                                    alt="Imagen actual"
                                    className="max-w-full h-auto rounded-lg"
                                />
                            )}
                        </div>

                        <div className="mt-4">
                            <h4 className="font-medium">Imagen de la beca</h4>
                            <DividerMain className="mb-3" />
                            <FormItem>
                                <Upload
                                    draggable
                                    uploadLimit={1}
                                    beforeUpload={(file) => {
                                        if (file) {
                                            const isImage =
                                                file[0].type.startsWith(
                                                    'image/',
                                                )
                                            if (!isImage) {
                                                return 'Solo se permiten archivos de imagen'
                                            }
                                            const isLt2M =
                                                file[0].size / 1024 / 1024 < 2
                                            if (!isLt2M) {
                                                return 'La imagen debe ser menor a 2MB'
                                            }
                                        }
                                        return true
                                    }}
                                    onChange={(files) => {
                                        if (files && files.length > 0) {
                                            handleImageSelect(files[0])
                                        }
                                    }}
                                    onFileRemove={() => handleImageRemove()}
                                >
                                    <div className="my-2 text-center">
                                        <div className="text-4xl mb-4 flex justify-center">
                                            <i className="ri-upload-cloud-2-line" />
                                        </div>
                                        <p className="font-semibold">
                                            <span className="text-gray-800 dark:text-white">
                                                Arrastra tu imagen aquí o{' '}
                                            </span>
                                            <span className="text-blue-500">
                                                búscala
                                            </span>
                                        </p>
                                        <p className="mt-1 opacity-60 dark:text-white">
                                            Soporta: jpg, png, gif
                                        </p>
                                    </div>
                                </Upload>
                                {previewUrl && (
                                    <div className="mt-4">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="max-w-full h-auto rounded-lg"
                                        />
                                    </div>
                                )}
                            </FormItem>
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

export default BecaEditForm
