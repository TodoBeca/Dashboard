import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Input, Button, Select, Switcher, Upload } from '@/components/ui'
import { FormItem, FormContainer } from '@/components/ui'
import { User } from '@/@types/user'
import Swal from 'sweetalert2'
import DividerMain from '../../DividerMain'
import { NAV_MODE_THEMED } from '@/constants/theme.constant'
import classNames from 'classnames'
import { useAppSelector } from '@/store'
import { uploadFile } from '@/services/FileUploadService'

type EditUserFormProps = {
    user: User | null
    onEditSuccess: (updatedUser: User) => void
    onCancel: () => void
}

const rolOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuario' },
]

const estadoOptions = [
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
]

const EditUserForm: React.FC<EditUserFormProps> = ({
    user,
    onEditSuccess,
    onCancel,
}) => {
    const navMode = useAppSelector((state) => state.theme.navMode)
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel,
    )
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>(user?.imagen || '')

    const handleSubmit = async (values: Partial<User>) => {
        try {
            // Si hay una imagen seleccionada, la subimos primero
            if (selectedImage) {
                const imageUrl = await uploadFile(selectedImage, 'users')
                values.imagen = imageUrl
            }

            // Aquí deberías llamar a tu API para actualizar el usuario
            const updatedUser = {
                ...values,
                id: user?.id,
                fechaActualizacion: new Date().toISOString(),
            } as User

            Swal.fire({
                title: 'Éxito',
                text: 'El usuario ha sido actualizado correctamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            })
            onEditSuccess(updatedUser)
        } catch (error) {
            console.error('Error al actualizar el usuario:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el usuario.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleImageSelect = (file: File) => {
        setSelectedImage(file)
        // Crear URL temporal para la vista previa
        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)
    }

    const handleImageRemove = () => {
        setSelectedImage(null)
        // Revocar la URL del objeto para liberar memoria
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
        setPreviewUrl('')
    }

    if (!user) {
        return null
    }

    return (
        <Formik
            initialValues={{
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                telefono: user.telefono || '',
                rol: user.rol,
                estado: user.estado,
                imagen: user.imagen || '',
            }}
            onSubmit={handleSubmit}
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
                            Editar Usuario
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem label="Nombre" className="mb-0">
                                <Input
                                    name="nombre"
                                    value={values.nombre}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Apellido" className="mb-0">
                                <Input
                                    name="apellido"
                                    value={values.apellido}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Email" className="mb-0">
                                <Input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Teléfono" className="mb-0">
                                <Input
                                    name="telefono"
                                    value={values.telefono}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="Rol" className="mb-0">
                                <Select
                                    name="rol"
                                    options={rolOptions}
                                    value={
                                        rolOptions.find(
                                            (opt) => opt.value === values.rol,
                                        ) || null
                                    }
                                    onChange={(val) =>
                                        setFieldValue('rol', val?.value)
                                    }
                                />
                            </FormItem>

                            <FormItem label="Estado" className="mb-0">
                                <Select
                                    name="estado"
                                    options={estadoOptions}
                                    value={
                                        estadoOptions.find(
                                            (opt) =>
                                                opt.value === values.estado,
                                        ) || null
                                    }
                                    onChange={(val) =>
                                        setFieldValue('estado', val?.value)
                                    }
                                />
                            </FormItem>
                        </div>

                        {/* Sección de Imagen */}
                        <div className="mt-4">
                            <h4 className="font-medium">Imagen del usuario</h4>
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

export default EditUserForm
