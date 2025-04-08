import React from 'react'
import { User } from '@/@types/user'
import { Button } from '@/components/ui'
import { HiOutlinePencil } from 'react-icons/hi'
import { useAppSelector } from '@/store'
import { NAV_MODE_THEMED } from '@/constants/theme.constant'
import classNames from 'classnames'
import DividerMain from '../DividerMain'

interface UserDetailsProps {
    user: User | null
    onEdit: (user: User) => void
    onCancel: () => void
}

const UserDetails: React.FC<UserDetailsProps> = ({
    user,
    onEdit,
    onCancel,
}) => {
    const navMode = useAppSelector((state) => state.theme.navMode)
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel,
    )

    if (!user) {
        return null
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'text-blue-500'
            case 'user':
                return 'text-gray-500'
            default:
                return ''
        }
    }

    return (
        <div className="users-view-details">
            <div className="users-view-details-header">
                <h2
                    className={classNames(
                        'text-xl font-semibold mb-6',
                        navMode === NAV_MODE_THEMED
                            ? 'text-white'
                            : `dark:text-white text-${themeColor}-${primaryColorLevel}`,
                    )}
                >
                    Detalles del Usuario
                </h2>
                <div className="flex justify-end mb-6">
                    <Button
                        variant="solid"
                        icon={<HiOutlinePencil />}
                        onClick={() => onEdit(user)}
                    >
                        Editar
                    </Button>
                </div>
            </div>

            <div className="users-view-details-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold mb-2">
                            Información Personal
                        </h3>
                        <DividerMain className="mb-4" />
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Nombre
                                </p>
                                <p className="font-medium">
                                    {user.personalData.firstName}{' '}
                                    {user.personalData.lastName}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Email
                                </p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Teléfono
                                </p>
                                <p className="font-medium">
                                    {user.personalData.phone || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Género
                                </p>
                                <p className="font-medium">
                                    {user.personalData.gender || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Nacionalidad
                                </p>
                                <p className="font-medium">
                                    {user.personalData.nationality || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Ciudad Actual
                                </p>
                                <p className="font-medium">
                                    {user.personalData.currentCity || '-'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">
                            Información de Cuenta
                        </h3>
                        <DividerMain className="mb-4" />
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Rol
                                </p>
                                <p
                                    className={classNames(
                                        'font-medium',
                                        getRoleColor(user.role),
                                    )}
                                >
                                    {user.role === 'admin'
                                        ? 'Administrador'
                                        : 'Usuario'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Email Verificado
                                </p>
                                <p className="font-medium">
                                    {user.emailVerified ? 'Sí' : 'No'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Fecha de Creación
                                </p>
                                <p className="font-medium">
                                    {user.createdAt
                                        ? new Date(
                                              user.createdAt,
                                          ).toLocaleDateString()
                                        : '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Última Actualización
                                </p>
                                <p className="font-medium">
                                    {user.updatedAt
                                        ? new Date(
                                              user.updatedAt,
                                          ).toLocaleDateString()
                                        : '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {user.imagen && (
                    <div className="mt-8">
                        <h3 className="font-semibold mb-2">Imagen de Perfil</h3>
                        <DividerMain className="mb-4" />
                        <div className="flex justify-center">
                            <img
                                src={user.imagen}
                                alt={`${user.personalData.firstName} ${user.personalData.lastName}`}
                                className="max-w-xs rounded-lg"
                            />
                        </div>
                    </div>
                )} */}

                <div className="flex justify-end mt-8">
                    <Button variant="plain" onClick={onCancel}>
                        Volver
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
