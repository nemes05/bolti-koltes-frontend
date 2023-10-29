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
            return list.getContentPrice().toLocaleString()
        } else {
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
