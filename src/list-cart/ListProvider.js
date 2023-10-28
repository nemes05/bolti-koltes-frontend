import AsyncStorage from '@react-native-async-storage/async-storage'
import { useReducer } from 'react'

import ListContext from './list-context'

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

const ListProvider = (props) => {
    const [list, dispatch] = useReducer(listReducer, [])

    const addProductHandler = (product) => {
        console.log(product)
        dispatch({ type: 'ADD_OR_UPDATE', product })
        saveItemHandler(product)
    }

    const removeProductHandler = (barcode) => {
        dispatch({ type: 'REMOVE', barcode })
        removeItemHandler(barcode)
    }

    const updateProductHandler = (product, newPieces, newShopID) => {
        const newProduct = { ...product, Pieces: newPieces - product.Pieces, ShopID: newShopID }
        dispatch({ type: 'UPDATE', product: newProduct })
        updateItemHandler(newProduct)
    }

    const saveItemHandler = (product) => {
        AsyncStorage.setItem(product.Barcode, JSON.stringify(product)).catch((err) => {
            console.log(err.message)
        })
    }

    const removeItemHandler = (barcode) => {
        AsyncStorage.removeItem(barcode).catch((err) => {
            console.log(err.message)
        })
    }

    const updateItemHandler = (product) => {
        AsyncStorage.mergeItem(product.Barcode, JSON.stringify(product)).catch((err) => {
            console.log(err.message)
        })
    }

    const getContentPriceHandler = () => {
        let price = 0
        list.forEach(
            (element) =>
                (price +=
                    element.Price[element.Price.findIndex((shop) => shop.ShopID === element.ShopID)].Price *
                    element.Pieces)
        )
        return price
    }

    const loadListHandler = async () => {
        const keys = await AsyncStorage.getAllKeys()
        const list = await AsyncStorage.multiGet(keys)
        const localList = []
        list.forEach((element) => {
            localList.push(JSON.parse(element[1]))
        })
        dispatch({ type: 'INIT_LOAD', list: localList })
    }

    const getShopPriceHandler = (product, shopID) => {
        return product.Price[product.Price.findIndex((shop) => shop.ShopID === shopID)].Price
    }

    const listContext = {
        addProduct: addProductHandler,
        getContentPrice: getContentPriceHandler,
        updateProduct: updateProductHandler,
        removeProduct: removeProductHandler,
        initLoad: loadListHandler,
        getShopPrice: getShopPriceHandler,
        list,
    }
    return <ListContext.Provider value={listContext}>{props.children}</ListContext.Provider>
}
export default ListProvider
