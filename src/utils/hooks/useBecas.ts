import { useState, useEffect, useCallback } from 'react'
import { Beca } from '@/@types/beca'
import { getBecas, deleteBeca, createBeca } from '@/api/api'

// Tipo para la respuesta de la API
type ApiResponse<T> = {
    data?: T
    message?: string
    success?: boolean
}

export const useBecas = () => {
    const [becas, setBecas] = useState<Beca[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBecas = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const response: ApiResponse<Beca[]> | Beca[] = await getBecas()

            // Maneja diferentes formatos de respuesta
            if (Array.isArray(response)) {
                setBecas(response)
            } else if (response?.data && Array.isArray(response.data)) {
                setBecas(response.data)
            } else {
                throw new Error('Formato de datos inesperado')
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Error al cargar las becas',
            )
            console.error('Error fetching becas:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBecas()
    }, [fetchBecas])

    // Función para filtrar becas por tipo
    const filterByType = useCallback(
        (type: string) => {
            return becas.filter(
                (beca) => type === 'all' || beca.tipoBeca === type,
            )
        },
        [becas],
    )

    // Función para buscar becas por nombre
    const searchBecas = useCallback(
        (query: string) => {
            return becas.filter((beca) =>
                beca.nombreBeca.toLowerCase().includes(query.toLowerCase()),
            )
        },
        [becas],
    )

    // Función para crear una nueva beca
    const addBeca = useCallback(async (becaData: Partial<Beca>) => {
        try {
            const newBeca = await createBeca(becaData)
        } catch (error) {
            console.error('Error creando beca:', error)
            throw error
        }
    }, [])

    return {
        becas,
        loading,
        error,
        fetchBecas,
        filterByType,
        searchBecas,
        addBeca,
        // Placeholders para futuras implementaciones
        editBeca: () => Promise.reject('Endpoint no implementado'),
        removeBeca: async (id: string) => {
            try {
                await deleteBeca(id)
                await fetchBecas() // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting beca:', error)
                throw error
            }
        },
    }
}
