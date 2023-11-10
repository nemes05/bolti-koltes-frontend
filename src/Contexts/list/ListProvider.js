import AsyncStorage from '@react-native-async-storage/async-storage'
import { useReducer } from 'react'

import ListContext from './list-context'

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
    }
}

/**
 * Context provider that declares the functions for maneging list items.
 * @param {ReactComponent}   children    The parameter for the children of the element.
 */
const ListProvider = (props) => {
    const [list, dispatch] = useReducer(listReducer, [])

    /**
     * The function that adds the product to the cart.
     * @param {object} product  The project with the detailes which should be added
     */
    const addProductHandler = (product) => {
        dispatch({ type: 'ADD_OR_UPDATE', product })
        saveItemHandler(product)
    }

    /**
     * The function that removes the specified product.
     * @param {string} barcode  The barcode of the product that should be removed.
     */
    const removeProductHandler = (barcode) => {
        dispatch({ type: 'REMOVE', barcode })
        removeItemHandler(barcode)
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
        updateItemHandler({ ...newProduct, Pieces: newPieces })
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
        list.forEach(
            (element) =>
                (price +=
                    element.Price[element.Price.findIndex((shop) => shop.ShopID === element.ShopID)].Price *
                    element.Pieces)
        )
        return price
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
        dispatch({ type: 'INIT_LOAD', list: localList })
    }

    const listContext = {
        addProduct: addProductHandler,
        updateProduct: updateProductHandler,
        removeProduct: removeProductHandler,
        getListPrice: getListPriceHandler,
        getShopPrice: getShopPriceHandler,
        initList: initListHandler,
        list,
    }

    return <ListContext.Provider value={listContext}>{props.children}</ListContext.Provider>
}
export default ListProvider
