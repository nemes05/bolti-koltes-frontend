import { useContext, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Portal, Modal, Card, Text, Button } from 'react-native-paper'

import CartContext from '../../Contexts/cart/cart-context'
import PreferencesContext from '../../Contexts/preferences/preferences-context'
import CustomIconButton from '../UI/CustomIconButton'
import CartProduct from '../UI/Product/CartProduct'
import SimplifiedCartProduct from '../UI/Product/SimplifiedCartProduct'

/**
 * The screen that renders the cart items.
 * @param {function}    cartSwipeHandler    The function that gets called if a swipe is detected on the screen.
 */
const CartScreen = ({ cartSwipeHandler }) => {
    const panGesture = Gesture.Pan()
        .activeOffsetX(80)
        .onEnd(() => {
            cartSwipeHandler('cart')
        })

    const cart = useContext(CartContext)
    const preferences = useContext(PreferencesContext)
    const [deleteCart, setDeleteCart] = useState(false)

    return (
        <>
            <Portal>
                <Modal
                    visible={deleteCart}
                    onDismiss={() => {
                        setDeleteCart(false)
                    }}
                >
                    <View style={styles.cardcontainer}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text variant="headlineSmall" style={styles.text}>
                                    Biztos befejezi a vásárlást?
                                </Text>
                            </Card.Content>
                            <Card.Actions style={styles.actionscontainer}>
                                <Button
                                    style={styles.button}
                                    mode="outlined"
                                    onPress={() => {
                                        cart.emptyCart()
                                        setDeleteCart(false)
                                    }}
                                >
                                    Igen
                                </Button>
                                <Button
                                    style={styles.button}
                                    mode="outlined"
                                    onPress={() => {
                                        setDeleteCart(false)
                                    }}
                                >
                                    Nem
                                </Button>
                            </Card.Actions>
                        </Card>
                    </View>
                </Modal>
            </Portal>

            <GestureDetector gesture={panGesture}>
                <View style={styles.cartcontainer}>
                    {preferences.cardSize === 'small' && (
                        <FlatList
                            data={cart.cart}
                            renderItem={({ item }) => <SimplifiedCartProduct product={item} />}
                        />
                    )}
                    {preferences.cardSize === 'big' && (
                        <FlatList data={cart.cart} renderItem={({ item }) => <CartProduct product={item} />} />
                    )}
                    <CustomIconButton
                        icon="cash-multiple"
                        handlePress={() => {
                            setDeleteCart(true)
                        }}
                    />
                </View>
            </GestureDetector>
        </>
    )
}

const styles = StyleSheet.create({
    cartcontainer: {
        height: '100%',
        marginTop: 5,
        marginBottom: 5,
    },
    cardcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        padding: 5,
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
    actionscontainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        width: '70%',
        margin: 5,
    },
})

export default CartScreen
