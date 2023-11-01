/**
 * Component for displaying the price of the cart or the list
 * @param {string}  screen  The string that tells wich price should the appear, could be 'list' or 'cart'.
 */
import { useContext } from 'react'
import { Text, useTheme } from 'react-native-paper'

import CartContext from '../../list-cart/cart-context'
import ListContext from '../../list-cart/list-context'

const PriceContainer = ({ screen }) => {
    const list = useContext(ListContext)
    const cart = useContext(CartContext)
    const theme = useTheme()

    const getTotalPrice = () => {
        if (screen === 'list') {
            return list.getListPrice().toLocaleString()
        } else if (screen === 'cart') {
            return cart.getCartPrice().toLocaleString()
        }
    }

    return (
        <Text
            style={{ backgroundColor: theme.colors.secondaryContainer, padding: 10, borderRadius: 10 }}
            variant="headlineMedium"
        >
            {getTotalPrice()} Ft
        </Text>
    )
}

export default PriceContainer
