import React, { useState, useEffect } from 'react'
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
import DividerMain from '../../DividerMain'
import { NAV_MODE_THEMED } from '@/constants/theme.constant'
import classNames from 'classnames'
import { useAppSelector } from '@/store'
import {
    tipoBecaOptions,
    nivelAcademicoOptions,
    countryOptions,
    regionOptions,
    regionCountries,
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

type SelectOption = {
    value: string
    label: string
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
    const [selectedDestinoCountries, setSelectedDestinoCountries] = useState<
        string[]
    >(beca.paisDestino ? [...beca.paisDestino] : [])
    const [selectedDestinoRegions, setSelectedDestinoRegions] = useState<
        string[]
    >(beca.regionDestino || [])
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [selectedLanguages, setSelectedLanguages] = useState<
        Array<{ idioma: string; nivelIdioma: string }>
    >(
        beca.requisitos?.idiomasRequeridos?.map((lang) => ({
            idioma: lang.idioma || '',
            nivelIdioma: lang.nivelIdioma || '',
        })) || [],
    )
    const [tempLanguage, setTempLanguage] = useState<{
        idioma: string
        nivelIdioma: string
    }>({ idioma: '', nivelIdioma: '' })
    const [selectedExams, setSelectedExams] = useState<string[]>(
        beca.requisitos?.examenesRequeridos || [],
    )
    const [tempExam, setTempExam] = useState('')

    useEffect(() => {
        if (beca) {
            setSelectedCountries(beca.paisPostulante || [])
            setSelectedDestinoCountries(
                beca.paisDestino ? [...beca.paisDestino] : [],
            )
            setSelectedDestinoRegions(beca.regionDestino || [])
            setSelectedLanguages(
                beca.requisitos?.idiomasRequeridos?.map((lang) => ({
                    idioma: lang.idioma || '',
                    nivelIdioma: lang.nivelIdioma || '',
                })) || [],
            )
            setSelectedExams(beca.requisitos?.examenesRequeridos || [])
        }
    }, [beca])

    const getCountriesByRegion = (region: keyof typeof regionCountries) => {
        return (
            regionCountries[region]?.map(
                (country: { value: string; label: string }) => country.value,
            ) || []
        )
    }

    const handleCountrySelect = (
        country: string,
        setFieldValue: (field: string, value: any) => void,
    ) => {
        if (!selectedCountries.includes(country)) {
            setSelectedCountries([...selectedCountries, country])
        }
        // Reset the country selector
        setFieldValue('paisPostulante', '')
    }

    const handleCountryRemove = (country: string) => {
        setSelectedCountries(selectedCountries.filter((c) => c !== country))
    }

    const handleRegionSelect = (
        region: string,
        setFieldValue: (field: string, value: any) => void,
    ) => {
        const countries = getCountriesByRegion(
            region as keyof typeof regionCountries,
        )
        const newCountries = [...new Set([...selectedCountries, ...countries])]
        setSelectedCountries(newCountries)
        // Reset the region selector
        setFieldValue('region', '')
    }

    const handleClearAllCountries = () => {
        setSelectedCountries([])
    }

    const getRegionsFromCountries = (countries: string[]) => {
        console.log('getRegionsFromCountries - Países recibidos:', countries)
        const regions = new Set<string>()
        countries.forEach((country) => {
            console.log('Buscando región para país:', country)
            for (const [region, regionCountriesList] of Object.entries(
                regionCountries,
            )) {
                console.log('Revisando región:', region)
                console.log('Países en esta región:', regionCountriesList)
                if (
                    regionCountriesList.some(
                        (c: { value: string; label: string }) =>
                            c.value === country,
                    )
                ) {
                    console.log('País encontrado en región:', region)
                    regions.add(region)
                }
            }
        })
        console.log('Regiones encontradas:', Array.from(regions))
        return Array.from(regions)
    }

    const handleDestinoCountrySelect = (
        country: string,
        setFieldValue: (field: string, value: any) => void,
    ) => {
        const updatedCountries = [...selectedDestinoCountries, country]
        setSelectedDestinoCountries(updatedCountries)
        const updatedRegions = getRegionsFromCountries(updatedCountries)
        setSelectedDestinoRegions(updatedRegions)
        setFieldValue('paisDestino', updatedCountries)
        setFieldValue('regionDestino', updatedRegions)
        // Reset the country selector
        setFieldValue('paisDestinoSelect', null)
    }

    const handleDestinoRegionSelect = (
        region:
            | 'América Latina'
            | 'Centroamérica'
            | 'América del Norte'
            | 'Europa'
            | 'Asia'
            | 'Oceanía'
            | 'África',
        setFieldValue: (field: string, value: any) => void,
    ) => {
        const regionCountries = getCountriesByRegion(region)
        const updatedCountries = [
            ...new Set([...selectedDestinoCountries, ...regionCountries]),
        ]
        setSelectedDestinoCountries(updatedCountries)
        const updatedRegions = getRegionsFromCountries(updatedCountries)
        setSelectedDestinoRegions(updatedRegions)
        setFieldValue('paisDestino', updatedCountries)
        setFieldValue('regionDestino', updatedRegions)
        // Reset the region selector
        setFieldValue('regionDestinoSelect', null)
    }

    const handleDestinoCountryRemove = (
        country: string,
        setFieldValue: (field: string, value: any) => void,
    ) => {
        const newCountries = selectedDestinoCountries.filter(
            (c) => c !== country,
        )
        setSelectedDestinoCountries(newCountries)
        const regions = getRegionsFromCountries(newCountries)
        setFieldValue('paisDestino', newCountries)
        setFieldValue('regionDestino', regions)
    }

    const handleDestinoRegionRemove = (
        region: string,
        setFieldValue: (field: string, value: any) => void,
    ) => {
        const newRegions = selectedDestinoRegions.filter((r) => r !== region)
        setSelectedDestinoRegions(newRegions)
        // Remove countries that belong only to this region
        const countriesToKeep = selectedDestinoCountries.filter((country) => {
            const countryRegions = Object.entries(regionCountries)
                .filter(([_, countries]) =>
                    countries.some((c) => c.value === country),
                )
                .map(([region]) => region)
            return countryRegions.some(
                (r) => newRegions.includes(r) && r !== region,
            )
        })
        setSelectedDestinoCountries(countriesToKeep)
        setFieldValue('regionDestino', newRegions)
        setFieldValue('paisDestino', countriesToKeep)
    }

    const handleClearAllDestinoCountries = (
        setFieldValue: (field: string, value: any) => void,
    ) => {
        setSelectedDestinoCountries([])
        setSelectedDestinoRegions([])
        setFieldValue('paisDestino', [])
        setFieldValue('regionDestino', [])
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

    const handleSubmit = async (values: Partial<Beca>) => {
        try {
            console.log('Valores antes de enviar:', values)
            // Si hay una imagen seleccionada, la subimos primero
            if (image) {
                const imageUrl = await uploadFile(image, 'becas')
                values.imagen = imageUrl
            }

            // Aseguramos que las regiones se incluyan en los valores
            values.paisPostulante = selectedCountries
            values.paisDestino = selectedDestinoCountries
            values.regionDestino = selectedDestinoRegions
            values.requisitos = {
                ...values.requisitos,
                idiomasRequeridos: selectedLanguages,
                examenesRequeridos: selectedExams,
            }
            console.log('Valores finales a enviar:', values)
            const updatedBeca = await updateBeca(beca._id, values)
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

    const initialValues: Partial<Beca> = {
        nombreBeca: beca.nombreBeca,
        tipoBeca: beca.tipoBeca,
        nivelAcademico: beca.nivelAcademico,
        paisDestino: beca.paisDestino || [],
        regionDestino: beca.regionDestino || [],
        paisDestinoSelect: null,
        regionDestinoSelect: null,
        areaEstudio: beca.areaEstudio,
        universidadDestino: beca.universidadDestino || '',
        entidadBecaria: beca.entidadBecaria || '',
        cantCupos: beca.cantCupos,
        duracion: beca.duracion || {
            duracionMinima: undefined,
            duracionMaxima: undefined,
            duracionUnidad: '',
        },
        fechaInicioAplicacion: beca.fechaInicioAplicacion || '',
        fechaFinAplicacion: beca.fechaFinAplicacion || '',
        requisitos: {
            nivelAcademicoMin:
                beca.requisitos?.nivelAcademicoMin || 'Doctorado',
            edadMax: beca.requisitos?.edadMax,
            promedioMin: beca.requisitos?.promedioMin,
            idiomaCondicion: beca.requisitos?.idiomaCondicion || false,
            avalUnivProcedencia: beca.requisitos?.avalUnivProcedencia || false,
            avalUnivDestino: beca.requisitos?.avalUnivDestino || false,
            cartaRecomendacion: beca.requisitos?.cartaRecomendacion || false,
            necesidadEconom: beca.requisitos?.necesidadEconom || false,
            idiomasRequeridos: beca.requisitos?.idiomasRequeridos || [],
        },
        cobertura: {
            matricula: beca.cobertura?.matricula || false,
            estipendio: beca.cobertura?.estipendio || false,
            pasajes: beca.cobertura?.pasajes || false,
            seguroMedico: beca.cobertura?.seguroMedico || false,
            alojamiento: beca.cobertura?.alojamiento || false,
            montoMensualMin: beca.cobertura?.montoMensualMin,
            montoMensualMax: beca.cobertura?.montoMensualMax,
        },
        informacionAdicional: {
            sitioWeb: beca.informacionAdicional?.sitioWeb || '',
            correoContacto: beca.informacionAdicional?.correoContacto || '',
        },
        dificultad: beca.dificultad,
        destacada: beca.destacada || false,
        imagen: beca.imagen || '',
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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

                            <div className="md:col-span-2 grid grid-cols-3 gap-4">
                                <FormItem label="Tipo de beca" className="mb-0">
                                    <Select
                                        name="tipoBeca"
                                        options={tipoBecaOptions}
                                        value={
                                            tipoBecaOptions.find(
                                                (opt) =>
                                                    opt.value ===
                                                    values.tipoBeca,
                                            ) || null
                                        }
                                        onChange={(val) =>
                                            setFieldValue(
                                                'tipoBeca',
                                                val?.value,
                                            )
                                        }
                                    />
                                </FormItem>

                                <FormItem
                                    label="Nivel académico"
                                    className="mb-0"
                                >
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

                                <FormItem
                                    className="mb-0"
                                    label="Área de estudio"
                                >
                                    <Select
                                        name="areaEstudio"
                                        options={areaEstudioOptions}
                                        value={
                                            areaEstudioOptions.find(
                                                (opt) =>
                                                    opt.value ===
                                                    values.areaEstudio,
                                            ) || null
                                        }
                                        onChange={(val) =>
                                            setFieldValue(
                                                'areaEstudio',
                                                val?.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-2 gap-4">
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

                                <FormItem
                                    className="mb-0"
                                    label="Entidad becaria"
                                >
                                    <Input
                                        name="entidadBecaria"
                                        value={values.entidadBecaria || ''}
                                        onChange={handleChange}
                                    />
                                </FormItem>
                            </div>
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
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormItem
                                className="mb-0"
                                label="Fecha de inscripción inicial"
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
                                label="Fecha de inscripción final"
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

                            <FormItem
                                className="mb-0"
                                label="Cantidad de cupos"
                            >
                                <Input
                                    type="number"
                                    name="cantCupos"
                                    min={0}
                                    value={values.cantCupos || ''}
                                    onChange={handleChange}
                                />
                            </FormItem>
                        </div>

                        {/* Países de Destino */}
                        <div className="md:col-span-2">
                            <div className="mt-4">
                                <h4 className="font-medium">
                                    Países de destino
                                </h4>
                                <DividerMain className="mb-3" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Países destino"
                                    className="mb-0"
                                >
                                    <Select<SelectOption>
                                        name="paisDestinoSelect"
                                        value={
                                            values.paisDestinoSelect
                                                ? countryOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                          values.paisDestinoSelect,
                                                  )
                                                : null
                                        }
                                        options={
                                            countryOptions as SelectOption[]
                                        }
                                        onChange={(val) => {
                                            if (val?.value) {
                                                handleDestinoCountrySelect(
                                                    val.value,
                                                    setFieldValue,
                                                )
                                                setFieldValue(
                                                    'paisDestinoSelect',
                                                    null,
                                                )
                                            }
                                        }}
                                    />
                                </FormItem>
                                <FormItem label="Región" className="mb-0">
                                    <Select<SelectOption>
                                        name="regionDestinoSelect"
                                        value={
                                            values.regionDestinoSelect
                                                ? regionOptions.find(
                                                      (opt) =>
                                                          opt.value ===
                                                          values.regionDestinoSelect,
                                                  )
                                                : null
                                        }
                                        options={
                                            regionOptions as SelectOption[]
                                        }
                                        onChange={(val) => {
                                            if (val?.value) {
                                                handleDestinoRegionSelect(
                                                    val.value as
                                                        | 'América Latina'
                                                        | 'Centroamérica'
                                                        | 'América del Norte'
                                                        | 'Europa'
                                                        | 'Asia'
                                                        | 'Oceanía'
                                                        | 'África',
                                                    setFieldValue,
                                                )
                                                setFieldValue(
                                                    'regionDestinoSelect',
                                                    null,
                                                )
                                            }
                                        }}
                                    />
                                </FormItem>
                            </div>

                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    {selectedDestinoCountries.map(
                                        (country, index) => (
                                            <div
                                                key={`country-${index}`}
                                                className="flex items-center bg-gray-200 rounded-full px-2 py-1"
                                            >
                                                <span>{country}</span>
                                                <button
                                                    type="button"
                                                    className="ml-2 text-red-500"
                                                    onClick={() =>
                                                        handleDestinoCountryRemove(
                                                            country,
                                                            setFieldValue,
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

                            {selectedDestinoCountries.length > 0 && (
                                <div className="mt-2">
                                    <Button
                                        type="button"
                                        variant="plain"
                                        size="sm"
                                        onClick={() =>
                                            handleClearAllDestinoCountries(
                                                setFieldValue,
                                            )
                                        }
                                    >
                                        Borrar todo
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Paises Postulantes */}
                        <div>
                            <div className="mt-4">
                                <h4 className="font-medium">
                                    Paises postulantes
                                </h4>
                                <DividerMain className="mb-3" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    label="Países postulantes"
                                    className="mb-0"
                                >
                                    <Select<{ value: string; label: string }>
                                        name="paisPostulante"
                                        value={null}
                                        options={countryOptions}
                                        onChange={(val) => {
                                            if (val?.value) {
                                                handleCountrySelect(
                                                    val.value,
                                                    setFieldValue,
                                                )
                                            }
                                        }}
                                    />
                                </FormItem>
                                <FormItem label="Región" className="mb-0">
                                    <Select<{ value: string; label: string }>
                                        name="region"
                                        value={null}
                                        options={regionOptions}
                                        onChange={(val) => {
                                            if (val?.value) {
                                                handleRegionSelect(
                                                    val.value,
                                                    setFieldValue,
                                                )
                                            }
                                        }}
                                    />
                                </FormItem>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex flex-wrap flex-1">
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
                                                }
                                            >
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {selectedCountries.length > 0 && (
                                    <Button
                                        type="button"
                                        variant="plain"
                                        size="sm"
                                        onClick={handleClearAllCountries}
                                        className="ml-2"
                                    >
                                        Borrar todo
                                    </Button>
                                )}
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
                                <div className="flex items-end mb-1">
                                    <Button
                                        type="button"
                                        variant="solid"
                                        size="sm"
                                        onClick={handleExamAdd}
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

                        {/* Sección Información Adicional */}
                        <div>
                            <div className="mt-4">
                                <h4 className="font-medium">
                                    Información adicional
                                </h4>
                                <DividerMain className="mb-3" />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <FormItem
                                    label="Sitio web"
                                    className="mb-3 col-span-2"
                                >
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
                                <div className="flex items-center mt-5">
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
