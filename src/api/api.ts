import { Beca } from '@/@types/beca'

// const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL as string
const API_BASE_URL: string = 'https://backend-8vsm.onrender.com'

// AUTH
export const userLogin = async (
    userEmail: string,
    userPassword: string,
): Promise<any> => {
    const LOGIN_ENDPOINT: string = '/auth/userLogin'

    try {
        const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail, userPassword }),
        })

        if (!response.ok) {
            throw new Error(`Error al iniciar sesion: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error al iniciar sesion:', error)
        throw error
    }
}

// BECAS
export const getBecas = async (): Promise<any> => {
    const BECAS_ENDPOINT: string = '/beca/getBecas'

    try {
        const response = await fetch(`${API_BASE_URL}${BECAS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener becas: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error al obtener becas:', error)
        throw error
    }
}

export const updateBeca = async (
    id: string,
    updates: Partial<Beca>,
): Promise<Beca> => {
    try {
        const response = await fetch(`${API_BASE_URL}/beca/updateBeca/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updates),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Error al actualizar la beca')
        }

        const data = await response.json()
        return data.updatedBeca
    } catch (error) {
        console.error('Error en updateBeca:', error)
        throw error
    }
}

export const createBeca = async (becaData: Partial<Beca>): Promise<Beca> => {
    try {
        const response = await fetch(`${API_BASE_URL}/beca/crearBeca`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(becaData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.msg || 'Error al crear la beca')
        }

        const data = await response.json()
        return data.beca
    } catch (error) {
        console.error('Error en createBeca:', error)
        throw error
    }
}
