import { useContext } from 'react'
import { Card, Text } from 'react-native-paper'

import CartContext from '../../../Contexts/cart/cart-context'

const CartDiscount = ({ discount }) => {
    const cart = useContext(CartContext)

    const removeDiscountHandler = () => {
        cart.removeDiscount(discount)
    }

    return (
        <Card style={{ margin: 5 }} onLongPress={removeDiscountHandler}>
            <Card.Content>
                <Text variant="labelLarge">{discount.DiscountName}</Text>
            </Card.Content>
        </Card>
    )
}

export default CartDiscount
