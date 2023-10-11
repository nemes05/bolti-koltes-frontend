import { useState } from 'react'

import CartContext from './cart-context'

const CartProvider = (props) => {
    const [cart, setCart] = useState([])

    const addProductHandler = (product) => {
        setCart((prevCart) => [...prevCart, product])
    }

    const listContext = {
        addProduct: addProductHandler,
        cart,
    }
    return <CartContext.Provider value={listContext}>{props.children}</CartContext.Provider>
}
export default CartProvider
