import { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Divider, IconButton, Text, useTheme } from 'react-native-paper'

import ProductDetailsModal from './ProductDetailsModal'
import CartContext from '../../../Contexts/cart/cart-context'
import ListContext from '../../../Contexts/list/list-context'

/**
 * A component which displays a product on the list
 * @param {Object}  product             The product object wich contains the details.
 * @param {string}  product.ImageLink   A link for an image of the product.
 * @param {string}  product.Name        The name of the product.
 * @param {Array}   product.Price       An array that contains the price of the product for different shops.
 * @param {number}  product.Pieces      The number of the product in the cart.
 * @param {boolean} product.InCart      The variable that shows if the specified product is in the cart.
 * @param {number}  product.ShopID      The ID for the shop from which the product will be bought.
 */
const ListProduct = ({ product }) => {
    const list = useContext(ListContext)
    const cart = useContext(CartContext)
    const theme = useTheme()

    const [showDetails, setShowDetails] = useState(false)

    const customButtonHandler = () => {
        list.updateProduct(product, product.Pieces, product.ShopID, true)
        cart.addProduct({ ...product, InCart: true }, 'list_screen')
    }

    const disabledcard = {
        backgroundColor: theme.colors.secondary,
        margin: 5,
        padding: 3,
    }

    return (
        <>
            <ProductDetailsModal
                caller="list"
                product={product}
                visible={showDetails}
                onDismiss={() => {
                    setShowDetails(false)
                }}
            />

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
                            onPress={customButtonHandler}
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
