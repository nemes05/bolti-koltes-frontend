import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'

import ApiContext from './api-context'

const API_URL = process.env.EXPO_PUBLIC_API_URL

const ApiProvider = (props) => {
    const [shopList, setShopList] = useState([])
    const [token, setToken] = useState({ access: null, refresh: null })
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const getProductHandler = async (barcode) => {
        try {
            const res = await fetch(`${API_URL}/${barcode}`, {
                method: 'GET',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
            })

            if (res.status === 200) {
                return res.json()
            }

            if (res.status === 400) {
                throw new Error('Nem találtuk a terméket!')
            }

            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }
        } catch (err) {
            throw err
        }
    }

    const getShopsHandler = async () => {
        try {
            const res = await fetch(`${API_URL}/shops`, {
                method: 'GET',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
            })

            if (res.status === 200) {
                const resList = await res.json()
                setShopList(resList)
                return
            }

            if (res.status === 400) {
                throw new Error('Nem tudtunk csatlakozni a kiszolgálóhoz!')
            }

            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }
        } catch (err) {
            throw err
        }
    }

    const registerHandler = async (registerData) => {
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData),
            })

            if (res.status === 200) {
                return
            }

            if (res.status === 409) {
                throw new Error('Az e-mail már regisztrálva van!')
            }

            if (res.status === 400) {
                throw new Error('Nem tudtunk csatlakozni a kiszolgálóhoz!')
            }

            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }
        } catch (err) {
            throw err
        }
    }

    const loginHandler = async (loginData) => {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            })

            if (res.status === 200) {
                const tokens = await res.json()
                setToken({ access: tokens.accessToken, refresh: tokens.refreshToken })
                await SecureStore.setItemAsync('refreshToken', tokens.refreshToken)
                setUserLoggedIn(true)
                return
            }

            if (res.status === 401) {
                throw new Error('Nem megfelelő e-mail jelszó páros!')
            }

            if (res.status === 400) {
                throw new Error('Nem tudtunk csatlakozni a kiszolgálóhoz!')
            }

            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }
        } catch (err) {
            throw err
        }
    }

    const logoutHandler = async () => {
        try {
            const res = await fetch(`${API_URL}/logout`, {
                method: 'DELETE',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: token.refresh }),
            })

            if (res.status === 200) {
                await SecureStore.deleteItemAsync('refreshToken')
                setUserLoggedIn(false)
                setToken({ access: null, refresh: null })
                return
            }

            if (res.status === 400) {
                throw new Error('Nem tudtunk csatlakozni a kiszolgálóhoz!')
            }

            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }
        } catch (err) {
            throw err
        }
    }

    const apiContext = {
        getProduct: getProductHandler,
        getShops: getShopsHandler,
        register: registerHandler,
        login: loginHandler,
        logout: logoutHandler,
        userStatus: userLoggedIn,
        shops: shopList,
    }

    return <ApiContext.Provider value={apiContext}>{props.children}</ApiContext.Provider>
}

export default ApiProvider
