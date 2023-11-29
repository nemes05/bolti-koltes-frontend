import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'

import CartContext from '../../../Contexts/cart/cart-context'

/**
 * The component that renders a discount card in the cart
 * @param {object} discount The discount with the discount details
 */
const CartDiscount = ({ discount }) => {
    const cart = useContext(CartContext)

    const removeDiscountHandler = () => {
        cart.removeDiscount(discount)
    }

    return (
        <Card style={{ margin: 5 }} onLongPress={removeDiscountHandler}>
            <Card.Content>
                <View style={styles.container}>
                    <Card.Cover source={{ uri: discount.ImageLink }} style={styles.card} />
                    <Text variant="labelLarge" style={styles.text}>
                        {discount.DiscountName}
                    </Text>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    card: {
        width: 70,
        height: 70,
        marginRight: 5,
    },
    text: {
        color: 'rgb(186, 26, 26)',
        textAlign: 'center',
        marginLeft: 25,
    },
})

export default CartDiscount
