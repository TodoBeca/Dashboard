import React, { useState } from 'react'
import UsersList from './Lists/UsersList'
import AddUserForm from './Forms/AddUserForm'
import EditUserForm from './Forms/EditUserForm'
import UserDetails from './UserDetails'
import { Button } from '@/components/ui'
import { User } from '@/@types/user'
import { useAppSelector } from '@/store'
import { NAV_MODE_THEMED } from '@/constants/theme.constant'
import classNames from 'classnames'
import './usersViewStyles.css'

const UserView = () => {
    const [viewMode, setViewMode] = useState<
        'list' | 'add' | 'edit' | 'details'
    >('list')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const navMode = useAppSelector((state) => state.theme.navMode)
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel,
    )

    const handleAddUser = () => {
        setViewMode('add')
    }

    const handleEditUser = (user: User) => {
        setSelectedUser(user)
        setViewMode('edit')
    }

    const handleViewDetails = (user: User) => {
        setSelectedUser(user)
        setViewMode('details')
    }

    const handleCancel = () => {
        setViewMode('list')
        setSelectedUser(null)
    }

    const handleAddSuccess = (newUser: User) => {
        setViewMode('list')
    }

    const handleEditSuccess = (updatedUser: User) => {
        setViewMode('list')
        setSelectedUser(null)
    }

    const renderContent = () => {
        switch (viewMode) {
            case 'list':
                return (
                    <UsersList
                        onEdit={handleEditUser}
                        onViewDetails={handleViewDetails}
                    />
                )
            case 'add':
                return (
                    <AddUserForm
                        onAddSuccess={handleAddSuccess}
                        onCancel={handleCancel}
                    />
                )
            case 'edit':
                return (
                    <EditUserForm
                        user={selectedUser}
                        onEditSuccess={handleEditSuccess}
                        onCancel={handleCancel}
                    />
                )
            case 'details':
                return (
                    <UserDetails
                        user={selectedUser}
                        onEdit={handleEditUser}
                        onCancel={handleCancel}
                    />
                )
            default:
                return null
        }
    }

    return (
        <div className="users-view">
            <div className="users-view-header">
                <h1
                    className={classNames(
                        'users-view-title',
                        navMode === NAV_MODE_THEMED
                            ? 'text-white'
                            : `dark:text-white text-${themeColor}-${primaryColorLevel}`,
                    )}
                >
                    {viewMode === 'list' && 'Usuarios'}
                    {viewMode === 'add' && 'Agregar Usuario'}
                    {viewMode === 'edit' && 'Editar Usuario'}
                    {viewMode === 'details' && 'Detalles del Usuario'}
                </h1>
                {viewMode === 'list' && (
                    <div className="users-view-actions">
                        <Button variant="solid" onClick={handleAddUser}>
                            Agregar Usuario
                        </Button>
                    </div>
                )}
            </div>
            <div className="users-view-content">{renderContent()}</div>
        </div>
    )
}

export default UserView
