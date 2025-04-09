import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { Formik, Form } from 'formik'
import { FormItem, FormContainer, Input } from '@/components/ui'
import { Button } from '@/components/ui'
import UploadButton from '../Buttons/UploadButton'
import { Beca } from '@/@types/beca'

type AddBecaListFormProps = {
    onAddSuccess: (newBeca: Beca) => void
    onCancel: () => void
    onFileUpload: (data: Beca[]) => void
}

const AddBecaListForm: React.FC<AddBecaListFormProps> = ({
    onAddSuccess,
    onCancel,
    onFileUpload,
}) => {
    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string>('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)
        setFileName(selectedFile ? selectedFile.name : '')
    }

    const handleFileUpload = () => {
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (!e.target?.result) return

                const data = new Uint8Array(e.target.result as ArrayBuffer)
                const workbook = XLSX.read(data, { type: 'array' })

                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]

                if (!sheet) {
                    console.error(
                        'No se encontró la hoja especificada en el archivo.',
                    )
                    return
                }

                const jsonData = XLSX.utils.sheet_to_json(sheet, {
                    header: 1,
                    range: 6,
                }) as any[][]

                const becas: Beca[] = jsonData.map((row) => {
                    return {
                        _id: row[0],
                        nombreBeca: row[1],
                        tipoBeca: row[2],
                        paisDestino: row[3],
                        regionDestino: row[4],
                        areaEstudio: row[5],
                        universidadDestino: row[6],
                        entidadBecaria: row[7],
                        cantCupos: row[8],
                        duracion: {
                            duracionMinima: row[9],
                            duracionMaxima: row[10],
                            duracionUnidad: row[11],
                        },
                        fechaInicioAplicacion: row[12],
                        fechaFinAplicacion: row[13],
                        requisitos: {
                            nivelAcademicoMin: row[14],
                            edadMax: row[15],
                            promedioMin: row[16],
                            idiomaCondicion: row[17],
                            avalUnivProcedencia: row[18],
                            avalUnivDestino: row[19],
                            cartaRecomendacion: row[20],
                            necesidadEconom: row[21],
                            idiomasRequeridos: row[22]
                                ? JSON.parse(row[22])
                                : [],
                        },
                        cobertura: {
                            matricula: row[23],
                            estipendio: row[24],
                            pasajes: row[25],
                            seguroMedico: row[26],
                            alojamiento: row[27],
                            montoMensualMin: row[28],
                            montoMensualMax: row[29],
                        },
                        informacionAdicional: {
                            sitioWeb: row[30],
                            correoContacto: row[31],
                        },
                        dificultad: row[32],
                        destacada: row[33],
                    } as Beca
                })

                onFileUpload(becas)
                onAddSuccess(becas[0])
            }
            reader.readAsArrayBuffer(file)
        } else {
            console.error('No se seleccionó ningún archivo.')
        }
    }

    return (
        <Formik
            initialValues={{}}
            onSubmit={(values) => {
                console.log('Form values:', values)
            }}
        >
            <Form>
                <FormContainer className="flex items-center justify-between">
                    <FormItem label="Archivo" className="w-10/12 mx-2">
                        <Input type="text" value={fileName} disabled />
                    </FormItem>
                    <UploadButton size="medium" onChange={handleFileChange} />
                    <Button
                        type="button"
                        onClick={handleFileUpload}
                        variant="twoTone"
                    >
                        Cargar archivo
                    </Button>
                </FormContainer>
            </Form>
        </Formik>
    )
}

export default AddBecaListForm
