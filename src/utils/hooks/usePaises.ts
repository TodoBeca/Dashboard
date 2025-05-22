import { useState, useEffect, useCallback } from 'react'
import { Pais } from '@/@types/pais'
import { getPaises, deletePais, createPais } from '@/api/api'

// Tipo para la respuesta de la API
type ApiResponse<T> = {
    data?: T
    message?: string
    success?: boolean
}

export const usePaises = () => {
    const [paises, setPaises] = useState<Pais[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPaises = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const response: ApiResponse<Pais[]> | Pais[] = await getPaises()

            // Maneja diferentes formatos de respuesta
            if (Array.isArray(response)) {
                setPaises(response)
            } else if (response?.data && Array.isArray(response.data)) {
                setPaises(response.data)
            } else {
                throw new Error('Formato de datos inesperado')
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Error al cargar las Paises',
            )
            console.error('Error fetching Paises:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPaises()
    }, [fetchPaises])

    // Función para buscar Paises por nombre
    const searchPaises = useCallback(
        (query: string) => {
            return paises.filter((pais) =>
                pais.nombre.toLowerCase().includes(query.toLowerCase()),
            )
        },
        [paises],
    )

    // Función para crear una nueva beca
    const addPais = useCallback(async (paisData: Partial<Pais>) => {
        try {
            const newPais = await createPais(paisData)
        } catch (error) {
            console.error('Error creando pais:', error)
            throw error
        }
    }, [])

    return {
        paises,
        loading,
        error,
        fetchPaises,
        searchPaises,
        addPais,
        // Placeholders para futuras implementaciones
        editPais: () => Promise.reject('Endpoint no implementado'),
        removePais: async (id: string) => {
            try {
                await deletePais(id)
                await fetchPaises() // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting pais:', error)
                throw error
            }
        },
    }
}
