import { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Divider, IconButton, Modal, Portal, Text } from 'react-native-paper'

import ProductDetails from './ProductDetails'
import CartContext from '../../../list-cart/cart-context'
import ListContext from '../../../list-cart/list-context'

const ListProduct = ({ product }) => {
    const list = useContext(ListContext)
    const cart = useContext(CartContext)

    const [showDetails, setShowDetails] = useState(false)

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
                style={product.InCart ? styles.disabledcard : styles.card}
                disabled={product.InCart}
                onPress={() => {
                    setShowDetails(true)
                }}
            >
                <Card.Content>
                    <Text variant="labelLarge" style={{ textAlign: 'center', marginBottom: 5 }}>
                        {product.Name}
                    </Text>
                    <Divider horizontalInset="true" bold="true" />
                    <View style={styles.cardbottom}>
                        <Card.Cover source={{ uri: product.ImageLink }} style={styles.productimage} />
                        <Text variant="headlineMedium">
                            {(product.Pieces * list.getShopPrice(product, product.ShopID)).toLocaleString()} Ft
                        </Text>
                        <IconButton
                            onPress={() => {
                                list.updateProduct(product, product.Pieces, product.ShopID, true)
                                cart.addProduct({ ...product, InCart: true })
                            }}
                            disabled={product.InCart}
                            icon="cart-plus"
                            size={30}
                            mode="contained-tonal"
                        />
                    </View>
                </Card.Content>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    disabledcard: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        margin: 5,
        padding: 3,
    },
    card: {
        margin: 5,
        padding: 3,
    },
    cardbottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    productimage: {
        width: 70,
        height: 70,
    },
})

export default ListProduct
