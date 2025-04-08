import React, { useState } from 'react'
import { User } from '@/@types/user'
import { Button } from '@/components/ui'
import Swal from 'sweetalert2'

interface UserEditFormProps {
    user: User
    onEditSuccess: (updatedUser: User) => void
    onCancel: () => void
}

const UserEditForm: React.FC<UserEditFormProps> = ({
    user,
    onEditSuccess,
    onCancel,
}) => {
    const [formData, setFormData] = useState<User>(user)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario')
            }

            const updatedUser = await response.json()
            onEditSuccess(updatedUser)
            Swal.fire({
                title: 'Éxito',
                text: 'Usuario actualizado correctamente',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            })
        } catch (error) {
            console.error('Error updating user:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el usuario',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section?: string,
        index?: number,
    ) => {
        const { name, value } = e.target

        if (section && index !== undefined) {
            setFormData((prev) => ({
                ...prev,
                [section]: prev[section].map((item, i) =>
                    i === index ? { ...item, [name]: value } : item,
                ),
            }))
        } else if (section) {
            setFormData((prev) => ({
                ...prev,
                [section]: {
                    ...prev[section],
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
        <div className="edit-form-container">
            <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Data */}
                <div className="form-section">
                    <h4 className="font-medium mb-2">Datos Personales</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Nombre</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.personalData.firstName}
                                onChange={(e) =>
                                    handleChange(e, 'personalData')
                                }
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Apellido</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.personalData.lastName}
                                onChange={(e) =>
                                    handleChange(e, 'personalData')
                                }
                                className="w-full p-2 border rounded"
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
                    <Button
                        type="button"
                        onClick={onCancel}
                        variant="secondary"
                        size="medium"
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" size="medium">
                        Guardar Cambios
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UserEditForm
