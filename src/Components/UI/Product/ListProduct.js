import { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Divider, IconButton, Modal, Portal, Text, useTheme } from 'react-native-paper'

import ProductDetails from './ProductDetails'
import CartContext from '../../../list-cart/cart-context'
import ListContext from '../../../list-cart/list-context'

const ListProduct = ({ product }) => {
    const list = useContext(ListContext)
    const cart = useContext(CartContext)
    const theme = useTheme()

    const [showDetails, setShowDetails] = useState(false)

    const customButtonHandler = () => {
        list.updateProduct(product, product.Pieces, product.ShopID, true)
        cart.addProduct({ ...product, InCart: true })
    }

    const disabledcard = {
        backgroundColor: theme.colors.secondary,
        margin: 5,
        padding: 3,
    }

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
                        caller="list"
                        product={product}
                    />
                </Modal>
            </Portal>

            <Card
                style={product.InCart ? disabledcard : styles.card}
                disabled={product.InCart}
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
                        <Text variant="headlineMedium">
                            {(product.Pieces * cart.getShopPrice(product, product.ShopID)).toLocaleString()} Ft
                        </Text>
                        <IconButton
                            style={styles.iconbutton}
                            disabled={product.InCart}
                            icon="cart-plus"
                            size={30}
                            mode="contained-tonal"
                            onPress={() => {
                                customButtonHandler()
                            }}
                        />
                    </View>
                </Card.Content>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    disabledcard: {
        margin: 5,
        padding: 3,
    },
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
    iconbutton: {
        margin: 0,
        padding: 0,
    },
})

export default ListProduct
