import { Beca } from '@/@types/beca'
import { User } from '@/@types/user'

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

export const deleteBeca = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/beca/deleteBeca/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Error al eliminar la beca')
        }

        console.log('Beca eliminada exitosamente')
    } catch (error) {
        console.error('Error en deleteBeca:', error)
        throw error
    }
}

// USERS
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/getUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener usuarios: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error al obtener usuarios:', error)
        throw error
    }
}

export const createUser = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    [key: string]: any
}): Promise<{ msg: string }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.msg || 'Error al crear el usuario')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en createUser:', error)
        throw error
    }
}

export const updateUser = async (
    id: string,
    updates: Partial<User>,
): Promise<User> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/updateUser/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updates),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
                errorData.message || 'Error al actualizar el usuario',
            )
        }

        return await response.json()
    } catch (error) {
        console.error('Error en updateUser:', error)
        throw error
    }
}

export const deleteUser = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/deleteUser/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Error al eliminar el usuario')
        }
    } catch (error) {
        console.error('Error en deleteUser:', error)
        throw error
    }
}

export const getUserById = async (id: string): Promise<User> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/getUserById/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener usuario: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error al obtener usuario:', error)
        throw error
    }
}

//SITEMAP
export const generarSitemap = async () => {
    const res = await fetch(`${API_BASE_URL}/auth/generarSitemap`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await res.json()
    alert(data.message)
}

// AI ASSISTANT
export const chatWithGPT = async (config: {
    systemPrompt: string
    temperature: number
    maxTokens: number
    model: string
    message: string
}): Promise<any> => {
    try {
        // Primero obtenemos todas las becas
        const becasResponse = await fetch(`${API_BASE_URL}/beca/getBecas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (!becasResponse.ok) {
            throw new Error('Error al obtener las becas')
        }

        const becasData = await becasResponse.json()

        // Luego enviamos el mensaje con la información de las becas
        const response = await fetch(`${API_BASE_URL}/chat/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                message: config.message,
                settings: {
                    systemPrompt: config.systemPrompt,
                    temperature: config.temperature,
                    maxTokens: config.maxTokens,
                    model: config.model,
                },
                becas: becasData, // Incluimos todas las becas en la solicitud
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Error al enviar el mensaje')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en chatWithGPT:', error)
        throw error
    }
}

// AI ASSISTANT SETTINGS
export const updateChatSettings = async (
    id: string,
    settings: {
        systemPrompt: string
        temperature: number
        maxTokens: number
        model: string
    },
): Promise<any> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/chat/updateSettings/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(settings),
            },
        )

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
                errorData.message || 'Error al actualizar la configuración',
            )
        }

        return await response.json()
    } catch (error) {
        console.error('Error en updateChatSettings:', error)
        throw error
    }
}

export const getActiveSettings = async (): Promise<any> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/chat/getActiveSettings/active`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
                errorData.message || 'Error al obtener la configuración activa',
            )
        }

        return await response.json()
    } catch (error) {
        console.error('Error en getActiveSettings:', error)
        throw error
    }
}
