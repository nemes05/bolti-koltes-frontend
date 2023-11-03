import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useReducer } from 'react'

import CartContext from './cart-context'
import ListContext from '../list/list-context'

const cartReducer = (state, action) => {
    if (action.type === 'ADD_OR_UPDATE') {
        const newProd = state.find((element) => element.Barcode === action.product.Barcode)
        if (newProd !== undefined) {
            action.type = 'UPDATE'
        } else if (action.inList) {
            action.type = 'ADD_IN_LIST'
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
        case 'ADD_IN_LIST': {
            return [...state, { ...action.product, Pieces: +action.product.Pieces + +action.inList.Pieces }]
        }
        case 'REMOVE': {
            return state.filter((item) => item.Barcode !== action.barcode)
        }
        case 'INIT_LOAD': {
            return action.cart
        }
    }
}

const CartProvider = (props) => {
    const [cart, dispatch] = useReducer(cartReducer, [])
    const list = useContext(ListContext)

    const addProductHandler = (product) => {
        const inListProduct = list.list.find((item) => item.Barcode === product.Barcode)
        if (inListProduct) {
            dispatch({
                type: 'ADD_OR_UPDATE',
                inList: { Pieces: inListProduct.Pieces },
                product,
            })
            return
        }
        dispatch({ type: 'ADD_OR_UPDATE', product })
        saveItemHandler(product)
    }

    const removeProductHandler = (barcode) => {
        dispatch({ type: 'REMOVE', barcode })
        removeItemHandler(barcode)
    }

    const updateProductHandler = (product, newPieces, newShopID, inCart) => {
        const newProduct = { ...product, Pieces: newPieces - product.Pieces, ShopID: newShopID, InCart: inCart }
        dispatch({ type: 'UPDATE', product: newProduct })
        updateItemHandler({ ...newProduct, Pieces: newPieces })
    }

    const emptyCartHandler = () => {
        cart.forEach((item) => {
            removeProductHandler(item.Barcode)
            list.removeProduct(item.Barcode)
        })
    }

    const saveItemHandler = (product) => {
        AsyncStorage.setItem(`@cart:${product.Barcode}`, JSON.stringify(product)).catch((err) => {
            console.log(err.message)
        })
    }

    const removeItemHandler = (barcode) => {
        AsyncStorage.removeItem(`@cart:${barcode}`).catch((err) => {
            console.log(err.message)
        })
    }

    const updateItemHandler = (product) => {
        AsyncStorage.mergeItem(`@list:${product.Barcode}`, JSON.stringify(product)).catch((err) => {
            console.log(err.message)
        })
    }

    const initCartHandler = async () => {
        let keys = await AsyncStorage.getAllKeys()
        keys = keys.filter((element) => element.includes('@cart'))
        const cart = await AsyncStorage.multiGet(keys)
        const localCart = []
        cart.forEach((element) => {
            localCart.push(JSON.parse(element[1]))
        })
        dispatch({ type: 'INIT_LOAD', cart: localCart })
    }

    const getCartPriceHandler = () => {
        let price = 0
        cart.forEach(
            (element) =>
                (price +=
                    element.Price[element.Price.findIndex((shop) => shop.ShopID === element.ShopID)].Price *
                    element.Pieces)
        )
        return price
    }

    const getShopPriceHandler = (product, shopID) => {
        return product.Price[product.Price.findIndex((shop) => shop.ShopID === shopID)].Price
    }

    const carContext = {
        addProduct: addProductHandler,
        removeProduct: removeProductHandler,
        updateProduct: updateProductHandler,
        getShopPrice: getShopPriceHandler,
        getCartPrice: getCartPriceHandler,
        emptyCart: emptyCartHandler,
        initCart: initCartHandler,
        cart,
    }
    return <CartContext.Provider value={carContext}>{props.children}</CartContext.Provider>
}
export default CartProvider
