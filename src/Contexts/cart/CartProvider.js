import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useReducer, useEffect } from 'react'

import CartContext from './cart-context'
import ApiContext from '../api/api-context'
import ListContext from '../list/list-context'

/**
 * Reducer function for managing the cart.
 * @param   {object} state    The previous state of the cart.
 * @param   {object} action   Specifies the action that should occure and can hold payload.
 * @returns {object}          New state.
 */
const cartReducer = (state, action) => {
    if (action.type === 'ADD_OR_UPDATE') {
        const newProd = state.find((element) => element.Barcode === action.product.Barcode)
        if (newProd === undefined && action.inList === undefined) {
            action.type = 'ADD'
        } else if (newProd !== undefined) {
            action.type = 'UPDATE'
        } else {
            action.type = 'ADD_IN_LIST'
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
        case 'ADD_DISCOUNT': {
            const index = state.findIndex((item) => item.hasOwnProperty('DiscountID'))
            if (index === -1) {
                return [...state, action.discount]
            } else {
                return state.map((item) => {
                    if (item.hasOwnProperty('DiscountID')) {
                        return action.discount
                    } else {
                        return item
                    }
                })
            }
        }
        case 'REMOVE_DISCOUNT': {
            return state.filter((item) => item.DiscountName !== action.discount.DiscountName)
        }
    }
}

/**
 * Context provider that declares the functions for maneging the cart items.
 * @param {ReactComponent}   children    The parameter for the children of the element.
 */
const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [])
    const list = useContext(ListContext)
    const api = useContext(ApiContext)

    useEffect(() => {
        initCartHandler()
    }, [api.userStatus])

    /**
     * The function for adding products to the cart, also can handle updating.
     * (This function should be called if we don't know if the product is already in the cart.)
     * @param {object}  product A product object that should be added to the cart.
     * @param {string}  caller  The name of the screen that called the function.
     */
    const addProductHandler = (product, caller) => {
        if (caller === 'list_screen') {
            dispatch({ type: 'ADD_OR_UPDATE', product })
            saveItemHandler(product)
            return
        }

        const inListProduct = list.list.find((item) => item.Barcode === product.Barcode)
        if (inListProduct) {
            dispatch({
                type: 'ADD_OR_UPDATE',
                inList: { Pieces: inListProduct.Pieces },
                product,
            })
            saveItemHandler(product)
            return
        }

        dispatch({ type: 'ADD_OR_UPDATE', product })
        saveItemHandler(product)
    }

    /**
     * The function for removing products from the cart.
     * @param {string}  barcode  The barcode of the product.
     */
    const removeProductHandler = (barcode) => {
        dispatch({ type: 'REMOVE', barcode })
        removeItemHandler(barcode)
    }

    /**
     * The function for updating products in the cart.
     * @param {object}  product     The barcode of the product.
     * @param {number}  newPieces   The new quantity of the product
     * @param {number}  newShopID   The ShopID of the shop from which we want to buy the product.
     * @param {boolean} InCart      The variable determines if the product should be in the cart or not.
     */
    const updateProductHandler = (product, newPieces, newShopID, inCart) => {
        const newProduct = { ...product, Pieces: newPieces - product.Pieces, ShopID: newShopID, InCart: inCart }
        dispatch({ type: 'UPDATE', product: newProduct })
        updateItemHandler({ ...newProduct, Pieces: newPieces })
    }

    /**
     * The function adds the specified discount to the cart
     * @param {object} discount         The discount that should be added
     * @param {number} DiscountID       The id of the discount
     * @param {string} DiscountName     The name of the discount
     * @param {number} Price            The minimum price of the purchase (for the discount to activate)
     * @param {string} ImageLink        Link for the image to show for the user
     * @param {string} DiscountValue    The value of the discount (in FT)
     * @param {string} Percent          The value of the discount (in %)
     */
    const addDiscountHandler = (discount) => {
        dispatch({ type: 'ADD_DISCOUNT', discount })
    }

    /**
     * The function that removes the specified discount
     * @param {object} discount         The discount that should be added
     * @param {number} DiscountID       The id of the discount
     * @param {string} DiscountName     The name of the discount
     * @param {number} Price            The minimum price of the purchase (for the discount to activate)
     * @param {string} ImageLink        Link for the image to show for the user
     * @param {string} DiscountValue    The value of the discount (in FT)
     * @param {string} Percent          The value of the discount (in %)
     */
    const removeDiscountHandler = (discount) => {
        dispatch({ type: 'REMOVE_DISCOUNT', discount })
    }

    /**
     * The function that removes all the products from the cart.
     */
    const emptyCartHandler = async () => {
        const save = []
        if (api.userStatus) {
            cart.forEach((product) => {
                removeProductHandler(product.Barcode)
                list.removeProduct(product.Barcode)
                const index = product.Price.findIndex((item) => item.ShopID === product.ShopID)
                save.push({
                    Barcode: product.Barcode,
                    Quantity: product.Pieces,
                    Price: product.Price[index].Price,
                    ShopID: product.ShopID,
                })
            })
            api.saveHistory(save)
        } else {
            cart.forEach((product) => {
                removeProductHandler(product.Barcode)
                list.removeProduct(product.Barcode)
            })
        }
    }

    /**
     * The function saves the product to Async Storage
     * @param {object} product  The product object which should be saved.
     */
    const saveItemHandler = (product) => {
        AsyncStorage.setItem(`@cart:${product.Barcode}`, JSON.stringify(product)).catch((err) => {
            console.log(err.message)
        })
    }

    /**
     * The function deletes the specified product from the Async Storage.
     * @param {string} barcode  The barcode of the product which should be removed.
     */
    const removeItemHandler = (barcode) => {
        AsyncStorage.removeItem(`@cart:${barcode}`).catch((err) => {
            console.log(err.message)
        })
    }

    /**
     * The function updates the specified product in Async Storage
     * @param {object} product
     */
    const updateItemHandler = (product) => {
        AsyncStorage.mergeItem(`@cart:${product.Barcode}`, JSON.stringify(product)).catch((err) => {
            console.log(err.message)
        })
    }

    /**
     * The function reads the cart items from Async Storage.
     * (Should be called when the app starts)
     */
    const initCartHandler = async () => {
        let keys = await AsyncStorage.getAllKeys()
        keys = keys.filter((element) => element.includes('@cart'))
        const cart = await AsyncStorage.multiGet(keys)
        const localCart = []
        cart.forEach((element) => {
            localCart.push(JSON.parse(element[1]))
        })

        if (api.userStatus) {
            const remoteCart = await api.getList()
            remoteCart.forEach((product) => {
                if (product.InCart === true) {
                    const index = localCart.findIndex((item) => item.Barcode === product.Barcode)
                    if (index === -1) {
                        localCart.push(product)
                        saveItemHandler(product)
                    }
                }
            })
        }

        dispatch({ type: 'INIT_LOAD', cart: localCart })
    }

    /**
     * The function returns the value of the cart.
     * @returns {number}    The value of the cart with all the products.
     */
    const getCartPriceHandler = () => {
        let price = 0
        cart.forEach((element) => {
            if (!element.hasOwnProperty('DiscountName')) {
                if (element.Discount !== undefined) {
                    price += calculateDiscount(element)
                } else {
                    price +=
                        element.Price[element.Price.findIndex((shop) => shop.ShopID === element.ShopID)].Price *
                        element.Pieces
                }
            }
        })
        const index = cart.findIndex((item) => item.hasOwnProperty('DiscountID'))

        if (index !== -1) {
            const discount = cart[index]
            switch (discount.DiscountID) {
                case 2: {
                    if (price >= discount.Price) {
                        price = price * ((100 - discount.Percent) / 100)
                    }
                    break
                }
                case 3: {
                    if (price >= discount.Price) {
                        price = price - discount.DiscountValue
                    }
                    break
                }
            }
        }

        return Math.round(price)
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
     * @param {object} product  The product which we want to know the price.
     * @param {number} shopID   The ID of the shop from which we want to know the price.
     * @returns {number}        The price of the product.
     */
    const getShopPriceHandler = (product, shopID) => {
        return product.Price[product.Price.findIndex((shop) => shop.ShopID === shopID)].Price
    }

    /**
     * The function thet returns the price of a product with the discounts already calculated
     * @param {object} product  The object that contains the product
     * @param {number} shopID   The id of the shop from where we want to get the price
     * @returns {number}    The calculated price
     */
    const getProductPriceHandler = (product, shopID) => {
        if (product.Discount !== undefined) {
            return calculateDiscount(product)
        } else {
            return product.Price[product.Price.findIndex((shop) => shop.ShopID === shopID)].Price * product.Pieces
        }
    }

    const carContext = {
        addProduct: addProductHandler,
        removeProduct: removeProductHandler,
        updateProduct: updateProductHandler,
        addDiscount: addDiscountHandler,
        removeDiscount: removeDiscountHandler,
        getShopPrice: getShopPriceHandler,
        getProductPrice: getProductPriceHandler,
        getCartPrice: getCartPriceHandler,
        emptyCart: emptyCartHandler,
        initCart: initCartHandler,
        cart,
    }
    return <CartContext.Provider value={carContext}>{children}</CartContext.Provider>
}
export default CartProvider
