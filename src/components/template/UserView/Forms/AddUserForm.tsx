import React, { useState } from 'react'
import { User } from '@/@types/user'
import { Button } from '@/components/ui'
import Swal from 'sweetalert2'
import { useUsers } from '@/utils/hooks/useUsers'

interface AddUserFormProps {
    onAddSuccess: (newUser: User) => void
    onCancel: () => void
}

const AddUserForm: React.FC<AddUserFormProps> = ({
    onAddSuccess,
    onCancel,
}) => {
    const { addUser } = useUsers()
    const [formData, setFormData] = useState<Partial<User>>({
        email: '',
        password: '',
        emailVerified: false,
        personalData: {
            firstName: '',
            lastName: '',
        },
        role: 'user',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const userData = {
                email: formData.email || '',
                password: formData.password || '',
                firstName: formData.personalData?.firstName || '',
                lastName: formData.personalData?.lastName || '',
                role: formData.role || 'user',
            }

            const response = await addUser(userData)
            if (
                response &&
                typeof response === 'object' &&
                !('msg' in response)
            ) {
                onAddSuccess(response as User)
                Swal.fire({
                    title: 'Éxito',
                    text: 'Usuario creado correctamente',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
            } else {
                throw new Error('Error al crear el usuario')
            }
        } catch (error) {
            console.error('Error creating user:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al crear el usuario',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section?: keyof User,
    ) => {
        const { name, value } = e.target

        if (section) {
            setFormData((prev) => ({
                ...prev,
                [section]: {
                    ...(prev[section] as Record<string, any>),
                    [name]: value,
                },
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    return (
        <div className="add-form-container">
            <h3 className="text-xl font-bold mb-4">Agregar Nuevo Usuario</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-section">
                    <h4 className="font-medium mb-2">Datos Personales</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Nombre</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.personalData?.firstName || ''}
                                onChange={(e) =>
                                    handleChange(e, 'personalData')
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Apellido</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.personalData?.lastName || ''}
                                onChange={(e) =>
                                    handleChange(e, 'personalData')
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Rol</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <Button type="button" onClick={onCancel} size="md">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="solid" size="md">
                        Crear Usuario
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddUserForm
