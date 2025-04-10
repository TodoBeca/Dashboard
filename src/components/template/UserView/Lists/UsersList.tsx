import React, { useState } from 'react'
import { Table, Button } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { Skeleton } from '@/components/ui'
import '../usersViewStyles.css'
import { User } from '@/@types/user'
import UserEditForm from '../Forms/UserEditForm'
import AddUserButton from '../Buttons/AddUserButton'
import AddUserForm from '../Forms/AddUserForm'
import DeleteButton from '../../DeleteButton'
import UserDetailsButton from '../Buttons/UserDetailsButton'
import EditButton from '../../EditButton'
import Swal from 'sweetalert2'
import { useUsers } from '@/utils/hooks/useUsers'

interface UsersListProps {
    onEdit: (user: User) => void
    onViewDetails: (user: User) => void
}

const UsersList: React.FC<UsersListProps> = ({ onEdit, onViewDetails }) => {
    const { users, loading, error, fetchUsers, searchUsers, removeUser } =
        useUsers()
    const [expandedUser, setExpandedUser] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [isAddingUser, setIsAddingUser] = useState(false)

    const toggleExpandUser = (id: string) => {
        setExpandedUser(expandedUser === id ? null : id)
    }

    const filteredUsers = searchUsers(searchTerm)

    const handleEditSuccess = (updatedUser: User) => {
        setEditingUser(null)
        fetchUsers()
    }

    const handleAddUser = () => {
        setIsAddingUser(true)
    }

    const handleAddSuccess = (newUser: User) => {
        setIsAddingUser(false)
        fetchUsers()
    }

    const handleDeleteUser = async (id: string) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará el usuario permanentemente y no se podrá recuperar.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            })

            if (result.isConfirmed) {
                await removeUser(id)
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El usuario ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
            }
        } catch (error) {
            console.error('Error deleting user:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el usuario.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    if (loading) {
        return (
            <div>
                {Array.from(new Array(5)).map((_, index) => (
                    <Skeleton
                        key={index}
                        width="100%"
                        height={120}
                        style={{ marginBottom: '10px' }}
                    />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-message">
                Error al cargar los usuarios: {error}
            </div>
        )
    }

    const formatDate = (date?: Date | string) => {
        if (!date) return 'No especificado'
        const dateObj = typeof date === 'string' ? new Date(date) : date
        return dateObj.toLocaleDateString()
    }

    const renderDetails = (user: User) => (
        <div className="user-details">
            <h4 className="pb-2">Detalles completos del usuario</h4>

            {/* Información Personal */}
            <div className="details-section">
                <h5 className="font-medium mb-2">Información Personal</h5>
                <div className="details-grid">
                    <div className="detail-item">
                        <strong>Nombre:</strong> {user.personalData.firstName}{' '}
                        {user.personalData.lastName}
                    </div>
                    <div className="detail-item">
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div className="detail-item">
                        <strong>Fecha de nacimiento:</strong>{' '}
                        {formatDate(user.personalData.birthDate)}
                    </div>
                    <div className="detail-item">
                        <strong>Género:</strong>{' '}
                        {user.personalData.gender || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>País:</strong>{' '}
                        {user.personalData.paisCode || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Teléfono:</strong>{' '}
                        {user.personalData.phone || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Nacionalidad:</strong>{' '}
                        {user.personalData.nationality || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Ciudad actual:</strong>{' '}
                        {user.personalData.currentCity || 'No especificado'}
                    </div>
                </div>
            </div>

            {/* Datos Académicos */}
            {user.academicData && user.academicData.length > 0 && (
                <div className="details-section mt-4">
                    <h5 className="font-medium mb-2">Datos Académicos</h5>
                    {user.academicData.map((academic, index) => (
                        <div key={index} className="details-grid">
                            <div className="detail-item">
                                <strong>Institución:</strong>{' '}
                                {academic.institution}
                            </div>
                            <div className="detail-item">
                                <strong>Título:</strong> {academic.degree}
                            </div>
                            <div className="detail-item">
                                <strong>Disciplina:</strong>{' '}
                                {academic.discipline}
                            </div>
                            <div className="detail-item">
                                <strong>Período:</strong> {academic.startMonth}/
                                {academic.startYear} - {academic.endMonth}/
                                {academic.endYear}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Idiomas */}
            {user.languages && user.languages.length > 0 && (
                <div className="details-section mt-4">
                    <h5 className="font-medium mb-2">Idiomas</h5>
                    <div className="details-grid">
                        {user.languages.map((lang, index) => (
                            <div key={index} className="detail-item">
                                <strong>{lang.language}:</strong> {lang.level}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Redes sociales */}
            {user.socialMedia &&
                Object.values(user.socialMedia).some((link) => link) && (
                    <div className="details-section mt-4">
                        <h5 className="font-medium mb-2">Redes Sociales</h5>
                        <div className="details-grid">
                            {Object.entries(user.socialMedia).map(
                                ([platform, link]) =>
                                    link && (
                                        <div
                                            key={platform}
                                            className="detail-item"
                                        >
                                            <strong>
                                                {platform
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    platform.slice(1)}
                                                :
                                            </strong>{' '}
                                            {link}
                                        </div>
                                    ),
                            )}
                        </div>
                    </div>
                )}

            {/* Perfil de Becas */}
            {user.scholarshipProfile && (
                <div className="details-section mt-4">
                    <h5 className="font-medium mb-2">Perfil de Becas</h5>
                    <div className="details-grid">
                        <div className="detail-item">
                            <strong>Áreas de interés:</strong>{' '}
                            {user.scholarshipProfile.areasOfInterest?.join(
                                ', ',
                            )}
                        </div>
                        <div className="detail-item">
                            <strong>Regiones de interés:</strong>{' '}
                            {user.scholarshipProfile.regionsOfInterest?.join(
                                ', ',
                            )}
                        </div>
                        <div className="detail-item">
                            <strong>Países de interés:</strong>{' '}
                            {user.scholarshipProfile.countriesOfInterest?.join(
                                ', ',
                            )}
                        </div>
                        <div className="detail-item">
                            <strong>Tipos de becas:</strong>{' '}
                            {user.scholarshipProfile.scholarshipTypes?.join(
                                ', ',
                            )}
                        </div>
                        <div className="detail-item">
                            <strong>Vulnerabilidad económica:</strong>{' '}
                            {user.scholarshipProfile.economicVulnerability
                                ? 'Sí'
                                : 'No'}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

    return (
        <div className="users-container">
            {isAddingUser ? (
                <AddUserForm
                    onAddSuccess={handleAddSuccess}
                    onCancel={() => setIsAddingUser(false)}
                />
            ) : editingUser ? (
                <UserEditForm
                    user={editingUser}
                    onEditSuccess={handleEditSuccess}
                    onCancel={() => setEditingUser(null)}
                />
            ) : (
                <>
                    <div className="filters-container">
                        <input
                            type="text"
                            placeholder="Buscar usuarios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />

                        <AddUserButton
                            onAddUser={handleAddUser}
                            size="medium"
                        />
                    </div>

                    {filteredUsers.length > 0 ? (
                        <Table className="users-table">
                            <THead className="text-center">
                                <Th className="text-center">#</Th>
                                <Th className="text-center">Nombre</Th>
                                <Th className="text-center">Email</Th>
                                <Th className="text-center">Rol</Th>
                                <Th className="text-center">Acciones</Th>
                            </THead>
                            <TBody>
                                {filteredUsers.map((user, index) => (
                                    <React.Fragment key={user._id}>
                                        <tr>
                                            <Td className="text-center">
                                                {index + 1}
                                            </Td>
                                            <Td className="text-left">
                                                {user.personalData.firstName}{' '}
                                                {user.personalData.lastName}
                                            </Td>
                                            <Td className="text-center">
                                                {user.email}
                                            </Td>
                                            <Td className="text-center">
                                                {user.role}
                                            </Td>
                                            <Td className="text-center">
                                                <UserDetailsButton
                                                    size="medium"
                                                    userInfo={() =>
                                                        toggleExpandUser(
                                                            user._id,
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                <EditButton
                                                    size="medium"
                                                    isOpen={() =>
                                                        setEditingUser(user)
                                                    }
                                                />
                                                <DeleteButton
                                                    size="medium"
                                                    onDelete={() =>
                                                        handleDeleteUser(
                                                            user._id,
                                                        )
                                                    }
                                                />
                                            </Td>
                                        </tr>
                                        {expandedUser === user._id && (
                                            <tr className="expanded-row">
                                                <Td colSpan={5}>
                                                    {renderDetails(user)}
                                                </Td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TBody>
                        </Table>
                    ) : (
                        <div className="no-results">
                            No se encontraron usuarios con los filtros
                            seleccionados.
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default UsersList
