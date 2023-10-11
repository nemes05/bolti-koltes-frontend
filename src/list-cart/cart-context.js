import React from 'react'

const CartContext = React.createContext({
    addProduct: (product) => {},
    cart: [],
})

export default CartContext
