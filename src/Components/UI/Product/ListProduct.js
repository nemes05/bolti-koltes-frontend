import { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Divider, IconButton, Modal, Portal, Text } from 'react-native-paper'

import ProductDetails from './ProductDetails'
import ListContext from '../../../list-cart/list-context'

const ListProduct = ({ product }) => {
    const [showDetails, setShowDetails] = useState(false)

    const list = useContext(ListContext)

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
                    <Text variant="labelLarge" style={{ textAlign: 'center', marginBottom: 5 }}>
                        {product.Name}
                    </Text>
                    <Divider horizontalInset="true" bold="true" />
                    <View style={styles.cardbottom}>
                        <Card.Cover source={{ uri: product.ImageLink }} style={styles.productimage} />
                        <Text variant="headlineMedium">
                            {(product.Pieces * list.getShopPrice(product, product.ShopID)).toLocaleString()} Ft
                        </Text>
                        <IconButton onPress={() => {}} icon="cart-plus" size={30} mode="contained-tonal" />
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
