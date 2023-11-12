//eslint error handling
/* global AbortController */
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'

import ApiContext from './api-context'

const API_URL = process.env.EXPO_PUBLIC_API_URL

/**
 * The component for declardeclaring the the fuctions for using the api.
 * @param {ReactComponent}   children    The parameter for the children of the element.
 */
const ApiProvider = ({ children }) => {
    const [shopList, setShopList] = useState([])
    const [token, setToken] = useState({ access: null, refresh: null })
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    /**
     * The function returns the details for the specified product
     * @param {int} barcode The barcode for the requested product.
     * @return {Promise}    Returns a promise that resolves to the Product object.
     */
    const getProductHandler = async (barcode) => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const res = await fetch(`${API_URL}/${barcode}`, {
                method: 'GET',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
            })

            clearTimeout(timeoutID)

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
            if (err.name === 'AbortError') throw new Error('Nem értük el a szolgáltatót!')
            throw err
        }
    }

    /**
     * The function sets the shopList that returns from the api.
     */
    const getShopsHandler = async () => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const res = await fetch(`${API_URL}/shops`, {
                method: 'GET',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
            })

            clearTimeout(timeoutID)

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

    /**
     * The function sends a request for registration for the specified user.
     * @param {object}  registerData            Object that containes the email, username and password.
     * @param {string}  registerData.email      The email of the user.
     * @param {string}  registerData.username   The username of the user.
     * @param {string}  registerData.password   The password of the user.
     */
    const registerHandler = async (registerData) => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData),
            })

            clearTimeout(timeoutID)

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

    /**
     * The function sends a request for login for the specified user.
     * @param {object}  loginData            Object that containes the email and the password.
     * @param {string}  loginData.email      The email of the user.
     * @param {string}  loginData.password   The password of the user.
     */
    const loginHandler = async (loginData) => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            })

            clearTimeout(timeoutID)

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

    /**
     * The function sends a request for logout.
     */
    const logoutHandler = async () => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const res = await fetch(`${API_URL}/logout`, {
                method: 'DELETE',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: token.refresh }),
            })

            clearTimeout(timeoutID)

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

    return <ApiContext.Provider value={apiContext}>{children}</ApiContext.Provider>
}

export default ApiProvider
