import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, IconButton, useTheme, Divider, Portal, Modal } from 'react-native-paper'

import ProductDetails from './ProductDetails'
import CartContext from '../../../list-cart/cart-context'
import ListContext from '../../../list-cart/list-context'

const CartProduct = ({ product }) => {
    const [showDetails, setShowDetails] = useState(false)
    const cart = useContext(CartContext)
    const list = useContext(ListContext)
    const theme = useTheme()

    return (
        <>
            <Portal>
                <Modal
                    visible={showDetails}
                    onDismiss={() => {
                        setShowDetails(false)
                    }}
                >
                    <ProductDetails
                        onDismiss={() => {
                            setShowDetails(false)
                        }}
                        caller="cart"
                        product={product}
                    />
                </Modal>
            </Portal>

            <Card
                style={styles.card}
                onPress={() => {
                    setShowDetails(true)
                }}
            >
                <Card.Content>
                    <View style={styles.topcontainer}>
                        <Text style={styles.productname} variant="labelLarge">
                            {product.Name}
                        </Text>
                        <Divider horizontalInset="true" bold="true" />
                    </View>
                    <View style={styles.bottomcontainer}>
                        <Card.Cover source={{ uri: product.ImageLink }} style={styles.productimage} />
                        <Text style={styles.productprice} variant="headlineMedium">
                            {(product.Pieces * cart.getShopPrice(product, product.ShopID)).toLocaleString()} Ft
                        </Text>
                        <IconButton
                            icon="close"
                            size={30}
                            style={styles.iconbutton}
                            mode="outlined"
                            iconColor={theme.colors.error}
                            borderColor={theme.colors.error}
                            onPress={() => {
                                list.removeProduct(product.Barcode)
                                cart.removeProduct(product.Barcode)
                            }}
                        />
                    </View>
                </Card.Content>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 3,
    },
    topcontainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    bottomcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    productname: {
        textAlign: 'center',
        marginBottom: 5,
    },
    productimage: {
        width: 70,
        height: 70,
        marginRight: 5,
    },
    productprice: {},
    iconbutton: {
        margin: 0,
        padding: 0,
    },
})

export default CartProduct
