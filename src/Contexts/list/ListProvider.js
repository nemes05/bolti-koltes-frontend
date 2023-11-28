import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useEffect, useReducer } from 'react'

import ListContext from './list-context'
import ApiContext from '../api/api-context'

/**
 * Reducer function for handing the list.
 * @param   {object} state    The previous state of the cart.
 * @param   {object} action   Specifies the action that should occure and can hold payload.
 * @returns {object}          New state.
 */
const listReducer = (state, action) => {
    if (action.type === 'ADD_OR_UPDATE') {
        const newProd = state.find((element) => element.Barcode === action.product.Barcode)
        if (newProd !== undefined) {
            action.type = 'UPDATE'
        } else {
            action.type = 'ADD'
        }
    }

    switch (action.type) {
        case 'ADD': {
            return [...state, action.product]
        }
        case 'UPDATE': {
            return state.map((item) => {
                if (item.Barcode !== action.product.Barcode) {
                    return item
                } else {
                    return {
                        ...item,
                        Pieces: +item.Pieces + +action.product.Pieces,
                        ShopID: action.product.ShopID,
                        Price: action.product.Price,
                        InCart: action.product.InCart,
                    }
                }
            })
        }
        case 'REMOVE': {
            return state.filter((item) => item.Barcode !== action.barcode)
        }
        case 'INIT_LOAD': {
            return action.list
        }
        case 'DISCOUNT': {
            return state.map((item) => {
                if (item.Barcode !== action.barcode) {
                    return item
                } else {
                    return {
                        ...item,
                        Discount: action.discount,
                    }
                }
            })
        }
    }
}

/**
 * Context provider that declares the functions for maneging list items.
 * @param {ReactComponent}   children    The parameter for the children of the element.
 */
const ListProvider = (props) => {
    const [list, dispatch] = useReducer(listReducer, [])
    const api = useContext(ApiContext)

    useEffect(() => {
        initListHandler()
    }, [api.userStatus])

    /**
     * The function that adds the product to the cart.
     * @param {object} product  The project with the detailes which should be added
     */
    const addProductHandler = (product) => {
        dispatch({ type: 'ADD_OR_UPDATE', product })
        api.saveItem(product)
            .then(() => {})
            .catch((err) => {
                console.log(err.message)
            })
        saveItemHandler(product)
    }

    /**
     * The function that removes the specified product.
     * @param {string} barcode  The barcode of the product that should be removed.
     */
    const removeProductHandler = (barcode) => {
        dispatch({ type: 'REMOVE', barcode })
        removeItemHandler(barcode)
        api.removeItem(barcode)
            .then(() => {})
            .catch((err) => {
                console.log(err.message)
            })
    }

    /**
     * The function updates the product with the specified detiles.
     * @param {object} product      The product which should be updated.
     * @param {number} newPieces    The new quantity of the product.
     * @param {number} newShopID    The ShopID from which the product will be bought.
     * @param {boolean} inCart      The variable indicates if the product is in the cart or not.
     */
    const updateProductHandler = (product, newPieces, newShopID, inCart) => {
        const newProduct = { ...product, Pieces: newPieces - product.Pieces, ShopID: newShopID, InCart: inCart }
        dispatch({ type: 'UPDATE', product: newProduct })
        api.updateItem({ ...newProduct, Pieces: newPieces })
            .then(() => {})
            .catch((err) => {
                console.log(err.message)
            })
        updateItemHandler({ ...newProduct, Pieces: newPieces })
    }

    /**
     * The function updates the product with the given discount
     * @param {string} barcode  The barcode of the product which should be updated
     * @param {object} discount The discount object with the details of the discount
     */
    const addDiscountHandler = (product, barcode, discount) => {
        dispatch({ type: 'DISCOUNT', discount, barcode })
        updateItemHandler({ ...product, Discount: discount })
    }

    /**
     * The object where we want to delete the discount
     * @param {object} product
     */
    const removeDiscountHandler = (product) => {
        dispatch({ type: 'DISCOUNT', discount: undefined, barcode: product.Barcode })
        updateItemHandler({ ...product, Discount: undefined })
    }

    /**
     * The function saves the the product to Async Storage.
     * @param {object} product  The product that should be saved.
     */
    const saveItemHandler = (product) => {
        AsyncStorage.setItem(`@list:${product.Barcode}`, JSON.stringify(product)).catch((err) => {
            console.log(err.message)
        })
    }

    /**
     * The function removes the specified item from Async Storage
     * @param {string} barcode  The barcode of the product which should be deleted.
     */
    const removeItemHandler = (barcode) => {
        AsyncStorage.removeItem(`@list:${barcode}`).catch((err) => {
            console.log(err.message)
        })
    }

    /**
     * The function updates the product in Async Storage
     * @param {object} product  The product with the updated details.
     */
    const updateItemHandler = (product) => {
        AsyncStorage.mergeItem(`@list:${product.Barcode}`, JSON.stringify(product)).catch((err) => {
            console.log(err.message)
        })
    }

    /**
     * The function calculates the value of the list
     * @returns {number}    The value of the list with all the items.
     */
    const getListPriceHandler = () => {
        let price = 0
        list.forEach((element) => {
            if (element.Discount !== undefined) {
                price += calculateDiscount(element)
            } else {
                price +=
                    element.Price[element.Price.findIndex((shop) => shop.ShopID === element.ShopID)].Price *
                    element.Pieces
            }
        })
        return price
    }

    /**
     * The function calculates the discounted price for the given product
     * @param {object} product  The product for calculating the discounted price
     * @returns {number}    The calculated price
     */
    const calculateDiscount = (product) => {
        switch (product.Discount.DiscountID) {
            case 1: {
                if (product.Pieces > product.Discount.Quantity) {
                    const index = product.Price.findIndex((item) => item.ShopID === product.ShopID)
                    const price = product.Price[index].Price
                    return Math.round(price * (1 - product.Discount.Percent / 100) * product.Pieces)
                } else {
                    return (
                        product.Price[product.Price.findIndex((shop) => shop.ShopID === product.ShopID)].Price *
                        product.Pieces
                    )
                }
            }
        }
    }

    /**
     * The function returns the price of the product in the specified shop.
     * @param {object} product
     * @param {number} shopID
     * @returns {number}    The price of the product in the specified shop.
     */
    const getShopPriceHandler = (product, shopID) => {
        return product.Price[product.Price.findIndex((shop) => shop.ShopID === shopID)].Price
    }

    const getProductPriceHandler = (product, shopID) => {
        if (product.Discount !== undefined) {
            return calculateDiscount(product)
        } else {
            return product.Price[product.Price.findIndex((shop) => shop.ShopID === shopID)].Price * product.Pieces
        }
    }

    /**
     * The function loads the list.
     * (Should be called when app starts)
     */
    const initListHandler = async () => {
        let keys = await AsyncStorage.getAllKeys()
        keys = keys.filter((element) => element.includes('@list'))
        const list = await AsyncStorage.multiGet(keys)
        const localList = []
        list.forEach((element) => {
            localList.push(JSON.parse(element[1]))
        })

        if (api.userStatus) {
            const remoteList = await api.getList()
            remoteList.forEach((product) => {
                const index = localList.findIndex((item) => item.Barcode === product.Barcode)
                if (index === -1) {
                    localList.push(product)
                    saveItemHandler(product)
                }
            })
        }

        dispatch({ type: 'INIT_LOAD', list: localList })
    }

    const listContext = {
        addProduct: addProductHandler,
        updateProduct: updateProductHandler,
        removeProduct: removeProductHandler,
        addDiscount: addDiscountHandler,
        removeDiscount: removeDiscountHandler,
        getListPrice: getListPriceHandler,
        getShopPrice: getShopPriceHandler,
        getProductPrice: getProductPriceHandler,
        initList: initListHandler,
        list,
    }

    return <ListContext.Provider value={listContext}>{props.children}</ListContext.Provider>
}
export default ListProvider
