import { useContext, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Portal, Modal, Card, Text, Button } from 'react-native-paper'

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
                                    Biztos törli a kosár tartalmát?
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
                    <FlatList data={cart.cart} renderItem={({ item }) => <CartProduct product={item} />} />
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
