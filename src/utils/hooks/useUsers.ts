import { useState, useEffect, useCallback } from 'react'
import { User } from '@/@types/user'
import { getUsers, deleteUser, updateUser, createUser } from '@/api/api'

// Tipo para la respuesta de la API
type ApiResponse<T> = {
    data?: T
    message?: string
    success?: boolean
}

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const response = (await getUsers()) as User[] | ApiResponse<User[]>

            // Maneja diferentes formatos de respuesta
            if (Array.isArray(response)) {
                setUsers(response)
            } else if (
                response &&
                'data' in response &&
                Array.isArray(response.data)
            ) {
                setUsers(response.data)
            } else {
                throw new Error('Formato de datos inesperado')
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Error al cargar los usuarios',
            )
            console.error('Error fetching users:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    // Función para buscar usuarios
    const searchUsers = useCallback(
        (query: string) => {
            return users.filter(
                (user) =>
                    user.personalData.firstName
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    user.personalData.lastName
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    user.email.toLowerCase().includes(query.toLowerCase()),
            )
        },
        [users],
    )

    // Función para filtrar usuarios por rol
    const filterByRole = useCallback(
        (role: string) => {
            return users.filter((user) => role === 'all' || user.role === role)
        },
        [users],
    )

    return {
        users,
        loading,
        error,
        fetchUsers,
        searchUsers,
        filterByRole,
        addUser: async (userData: {
            email: string
            password: string
            firstName: string
            lastName: string
            [key: string]: any
        }) => {
            try {
                const response = await createUser(userData)
                await fetchUsers()
                return response
            } catch (error) {
                console.error('Error adding user:', error)
                throw error
            }
        },
        editUser: async (id: string, updates: Partial<User>) => {
            try {
                const response = await updateUser(id, updates)
                await fetchUsers()
                return response
            } catch (error) {
                console.error('Error editing user:', error)
                throw error
            }
        },
        removeUser: async (id: string) => {
            try {
                await deleteUser(id)
                await fetchUsers()
            } catch (error) {
                console.error('Error deleting user:', error)
                throw error
            }
        },
    }
}
