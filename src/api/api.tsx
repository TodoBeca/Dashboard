// const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL as string
const API_BASE_URL: string = 'https://cardpay-dev.xcp.xrob.com.ar/api'

export const fetchCustomersData = async (queryParams: string): Promise<any> => {
    const response = await fetch(
        'https://www.primefaces.org/data/customers?' + queryParams,
    )
    return response.json()
}

export const fetchPayments = async (userId: string): Promise<any> => {
    const PAYMENTS_ENDPOINT: string = '/payments'

    try {
        const response = await fetch(`${API_BASE_URL}${PAYMENTS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'X-User-ID': userId,
            },
        })

        if (!response.ok) {
            throw new Error(`Error al obtener los pagos: ${response.status}`)
        }

        const data = await response.json()
        return data.payments
    } catch (error) {
        console.error('Error al obtener los pagos:', error)
        throw error
    }
}

export const fetchUpdatePassword = async (
    userId: string,
    oldPassword: string,
    newPassword: string,
): Promise<boolean> => {
    const UPDATE_PASS_ENDPOINT: string = '/update-pass'

    try {
        const response = await fetch(
            `${API_BASE_URL}${UPDATE_PASS_ENDPOINT}/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contrasena_actual: oldPassword,
                    nueva_contrasena: newPassword,
                }),
            },
        )

        if (!response.ok) {
            throw new Error(
                `Error al actualizar la contraseña: ${response.status}`,
            )
        }

        console.log('Contraseña actualizada correctamente')
        return true
    } catch (error: any) {
        console.error('Error de red:', error.message)
        throw error
    }
}

export const fetchSalesStats = async (userId: string): Promise<any> => {
    const SALES_STATS_ENDPOINT: string = '/sales-stats'

    try {
        const response = await fetch(`${API_BASE_URL}${SALES_STATS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'X-User-ID': userId,
            },
        })

        if (!response.ok) {
            throw new Error(
                `Error al obtener estadisticas de ventas: ${response.status}`,
            )
        }

        const data = await response.json()
        return {
            salesToday: {
                cantidad: data.salesToday.cantidad,
                monto: data.salesToday.monto,
            },
            salesLast7Days: {
                cantidad: data.salesLast7Days.cantidad,
                monto: data.salesLast7Days.monto,
            },
            salesLastDay: {
                cantidad: data.salesLastDay.cantidad,
                monto: data.salesLastDay.monto,
            },
            salesLastMonth: {
                cantidad: data.salesLastMonth.cantidad,
                monto: data.salesLastMonth.monto,
            },
        }
    } catch (error) {
        console.error('Error al obtener estadisticas de ventas:', error)
        throw error
    }
}

export const fetchLoginUser = async (
    email: string,
    password: string,
): Promise<any> => {
    const LOGIN_ENDPOINT: string = '/auth/login'

    try {
        const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
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
