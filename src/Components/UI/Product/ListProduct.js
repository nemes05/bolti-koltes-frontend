import { useState } from 'react'
import { View } from 'react-native'
import { Card, Divider, IconButton, Modal, Portal, Text } from 'react-native-paper'

import ProductDetails from './ProductDetails'

const ListProduct = ({ product }) => {
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
                        product={product}
                    />
                </Modal>
            </Portal>

            <Card
                style={{ margin: 5, padding: 3 }}
                onPress={() => {
                    setShowDetails(true)
                }}
            >
                <Card.Content>
                    <View style={{ marginBottom: 5 }}>
                        <Text variant="labelLarge" style={{ textAlign: 'center' }}>
                            {product.Name}
                        </Text>
                    </View>
                    <Divider horizontalInset="true" bold="true" />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                    >
                        <Card.Cover source={{ uri: product.ImageLink }} style={{ width: 70, height: 70 }} />
                        <Text variant="headlineMedium">
                            {(
                                product.Pieces *
                                product.Price[product.Price.findIndex((shop) => shop.ShopID === product.ShopID)].Price
                            ).toLocaleString()}{' '}
                            Ft
                        </Text>
                        <IconButton onPress={() => {}} icon="cart-plus" size={30} mode="contained-tonal" />
                    </View>
                </Card.Content>
            </Card>
        </>
    )
}

// const styles = StyleSheet.create({
//     productimage: {
//         width: 70,
//         height: 70,
//         marginRight: 10,
//     },
// })

export default ListProduct
