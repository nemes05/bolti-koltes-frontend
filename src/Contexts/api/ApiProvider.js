//eslint error handling
/* global AbortController */
import { decode } from 'base-64'
import * as SecureStore from 'expo-secure-store'
import { jwtDecode } from 'jwt-decode'
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
    global.atob = decode

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

            let accessToken
            if (userLoggedIn) {
                accessToken = await getTokenHandler()
            }

            const res = await fetch(`${API_URL}/${barcode}`, {
                method: 'GET',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
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
     * The function requests the categories from the specified store.
     * @param {number} ShopID   The ID of the shop from which we want the categories
     * @returns {Promise}   The promise resolves to the array of categories
     */
    const getCategoriesHandler = async (ShopID) => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const res = await fetch(`${API_URL}/categories/${ShopID}`, {
                method: 'GET',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
            })

            clearTimeout(timeoutID)

            if (res.status === 200) {
                return await res.json()
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

    const getProductsInCategoryHandler = async (SubCatID) => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const res = await fetch(`${API_URL}/products/${SubCatID}`, {
                method: 'GET',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
            })

            clearTimeout(timeoutID)

            if (res.status === 200) {
                return await res.json()
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

    /**
     * Saves an item to the remote storage.
     * @param {object} product  The product which should be added.
     */
    const saveItemHandler = async (product) => {
        const priceIndex = product.Price.findIndex((element) => element.ShopID === product.ShopID)

        const listItem = {
            Barcode: product.Barcode,
            CurrentPrice: product.Price[priceIndex].Price,
            ShopID: product.ShopID,
            Quantity: product.Pieces,
            InCart: product.InCart,
        }

        const controller = new AbortController()

        const timeoutID = setTimeout(() => {
            controller.abort()
        }, 30000)

        const accessToken = await getTokenHandler()

        const res = await fetch(`${API_URL}/list/add`, {
            method: 'POST',
            signal: controller.signal,
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
            body: JSON.stringify(listItem),
        })

        clearTimeout(timeoutID)

        if (res.status === 200) {
            console.log('saved')
            return
        }

        if (res.status === 401) {
        }
    }

    /**
     * Removes an item from the list in the remote storage.
     * @param {string} barcode
     */
    const removeItemHandler = async (barcode) => {
        const controller = new AbortController()

        const timeoutID = setTimeout(() => {
            controller.abort()
        }, 30000)

        const accessToken = await getTokenHandler()

        const res = await fetch(`${API_URL}/list/remove`, {
            method: 'DELETE',
            signal: controller.signal,
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
            body: JSON.stringify({ Barcode: barcode }),
        })

        clearTimeout(timeoutID)

        if (res.status === 200) {
            console.log('deleted')
            return
        }

        if (res.status === 401) {
        }
    }

    /**
     * Updates an item in the remote storage.
     * @param {objetc}  product  The product object with the new values.
     */
    const updateItemHandler = async (product) => {
        const priceIndex = product.Price.findIndex((element) => element.ShopID === product.ShopID)

        const listItem = {
            Barcode: product.Barcode,
            CurrentPrice: product.Price[priceIndex].Price,
            ShopID: product.ShopID,
            Quantity: product.Pieces,
            InCart: product.InCart,
        }

        const controller = new AbortController()

        const timeoutID = setTimeout(() => {
            controller.abort()
        }, 30000)

        const accessToken = await getTokenHandler()

        const res = await fetch(`${API_URL}/list/modify`, {
            method: 'POST',
            signal: controller.signal,
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
            body: JSON.stringify(listItem),
        })

        clearTimeout(timeoutID)

        if (res.status === 200) {
            console.log('saved')
            return
        }

        if (res.status === 403) {
        }

        if (res.status === 401) {
        }
    }

    /**
     * The function the gets the users list from the database.
     * @returns {Promise} The array of the product objects
     */
    const getListHandler = async () => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const accessToken = await getTokenHandler()

            const res = await fetch(`${API_URL}/list`, {
                method: 'GET',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
            })

            clearTimeout(timeoutID)

            if (res.status === 200) {
                return res.json()
            }

            if (res.status === 400) {
                throw new Error('Nem tudtunk csatlakozni a kiszolgálóhoz!')
            }

            if (res.status === 401) {
                throw new Error('Nem tudtunk csatlakozni a kiszolgálóhoz!')
            }

            if (res.status === 403) {
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
     * The fuction gets user favourite items.
     * @returns {Promise}   The promise resolves to the list of items
     */
    const getFavouritesHandler = async () => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const accessToken = await getTokenHandler()

            const res = await fetch(`${API_URL}/favourites`, {
                method: 'GET',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
            })

            clearTimeout(timeoutID)

            if (res.status === 200) {
                return res.json()
            }

            if (res.status === 400) {
                throw new Error('Nem tudtunk csatlakozni a kiszolgálóhoz!')
            }

            if (res.status === 403) {
                throw new Error('Be kell jelentkeznie ehhez a funkcióhoz')
            }

            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }
        } catch (err) {
            throw err
        }
    }

    /**
     * The fuction adds a product to the favourites.
     * @param {string} barcode  The barcode of the product which we want to add to favourites.
     */
    const addFavouriteHandler = async (barcode) => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const accessToken = await getTokenHandler()

            const res = await fetch(`${API_URL}/favourites/add`, {
                method: 'POST',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
                body: JSON.stringify({ Barcode: barcode }),
            })

            clearTimeout(timeoutID)

            if (res.status === 200) {
                return
            }

            if (res.status === 400) {
                throw new Error('Nem tudtunk csatlakozni a kiszolgálóhoz!')
            }

            if (res.status === 403) {
                throw new Error('Be kell jelentkeznie ehhez a funkcióhoz')
            }

            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }
        } catch (err) {
            throw err
        }
    }

    /**
     * The function that removes a favourite item.
     * @param {string} barcode  The barcode that specifies the item.
     */
    const removeFavouriteHandler = async (barcode) => {
        try {
            const controller = new AbortController()

            const timeoutID = setTimeout(() => {
                controller.abort()
            }, 30000)

            const accessToken = await getTokenHandler()

            const res = await fetch(`${API_URL}/favourites/remove`, {
                method: 'DELETE',
                signal: controller.signal,
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + accessToken },
                body: JSON.stringify({ Barcode: barcode }),
            })

            clearTimeout(timeoutID)

            if (res.status === 200) {
                return
            }

            if (res.status === 400) {
                throw new Error('Nem tudtunk csatlakozni a kiszolgálóhoz!')
            }

            if (res.status === 403) {
                throw new Error('Be kell jelentkeznie ehhez a funkcióhoz')
            }

            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }
        } catch (err) {
            throw err
        }
    }

    /**
     * Requests a new access token and sets it.
     * @returns {string}    The requested access token
     */
    const refreshToken = async () => {
        const controller = new AbortController()

        const timeoutID = setTimeout(() => {
            controller.abort()
        }, 30000)

        const res = await fetch(`${API_URL}/token`, {
            method: 'POST',
            signal: controller.signal,
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: token.refresh }),
        })

        clearTimeout(timeoutID)

        if (res.status === 200) {
            const resData = await res.json()
            setToken((prevState) => {
                return { access: resData.accessToken, refresh: prevState.refresh }
            })
            return resData.accessToken
        }

        if (res.status === 401) {
            throw new Error('Jelentkezzen be újra!')
        }

        if (res.status === 403) {
            throw new Error('Jelentkezzen be újra!')
        }

        if (!res.ok) {
            throw new Error('Jelentkezzen be újra!')
        }
    }

    /**
     * A function for managing the access token
     * @returns {string}   Returns a valid access token.
     */
    const getTokenHandler = async () => {
        if (token.access === null) return await refreshToken()

        const decode = jwtDecode(token.access)
        if (decode.exp * 1000 < Date.now()) {
            return await refreshToken()
        }

        return token.access
    }

    /**
     * The function that reads the refreshToken from the store and sets it.
     */
    const initUserHandler = async () => {
        const refreshToken = await SecureStore.getItemAsync('refreshToken')
        if (refreshToken !== null) {
            setToken({ access: null, refresh: refreshToken })
            setUserLoggedIn(true)
        }
    }

    const apiContext = {
        getProduct: getProductHandler,
        getShops: getShopsHandler,
        getCategories: getCategoriesHandler,
        getProductsInCategory: getProductsInCategoryHandler,
        register: registerHandler,
        login: loginHandler,
        logout: logoutHandler,
        getList: getListHandler,
        saveItem: saveItemHandler,
        removeItem: removeItemHandler,
        updateItem: updateItemHandler,
        getFavourites: getFavouritesHandler,
        addFavourite: addFavouriteHandler,
        removeFavourite: removeFavouriteHandler,
        initUser: initUserHandler,
        userStatus: userLoggedIn,
        shops: shopList,
    }

    return <ApiContext.Provider value={apiContext}>{children}</ApiContext.Provider>
}

export default ApiProvider
