import { useState } from 'react'

import CartContext from './cart-context'

const CartProvider = (props) => {
    const [cart, setCart] = useState([])

    const addProductHandler = (product) => {
        const newProd = cart.find((listProduct) => listProduct.Barcode === product.Barcode)
        if (newProd !== undefined) {
            const newList = cart.filter((element) => element.Barcode !== product.Barcode)
            setCart([...newList, { ...newProd, Price: product.Price, Pieces: product.Pieces + newProd.Pieces }])
        } else {
            setCart((prevList) => [...prevList, product])
        }
    }

    const listContext = {
        addProduct: addProductHandler,
        cart,
    }
    return <CartContext.Provider value={listContext}>{props.children}</CartContext.Provider>
}
export default CartProvider
