import { useContext } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import CartContext from '../../list-cart/cart-context'
import CustomIconButton from '../Navigation/CustomIconButton'
import CartProduct from '../UI/Product/CartProduct'

const CartScreen = (props) => {
    const panGesture = Gesture.Pan()
        .activeOffsetX(80)
        .onEnd(() => {
            props.cartSwipeHandler('cart')
        })

    const cart = useContext(CartContext)

    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.cartcontainer}>
                <FlatList data={cart.cart} renderItem={({ item }) => <CartProduct product={item} />} />
                <CustomIconButton
                    icon="cash-multiple"
                    handlePress={() => {
                        console.log('Empty cart')
                    }}
                />
            </View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    cartcontainer: {
        height: '100%',
        marginTop: 5,
        marginBottom: 5,
    },
})

export default CartScreen
