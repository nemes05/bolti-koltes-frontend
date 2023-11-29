import { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Card, IconButton, Text, useTheme } from 'react-native-paper'

import ProductDetailsModal from './ProductDetailsModal'
import CartContext from '../../../Contexts/cart/cart-context'
import ListContext from '../../../Contexts/list/list-context'

/**
 * A component which displays a product on the list. Same as ListProduct but with simplified view.
 * @param {Object}  product             The product object wich contains the details.
 * @param {string}  product.ImageLink   A link for an image of the product.
 * @param {string}  product.Name        The name of the product.
 * @param {Array}   product.Price       An array that contains the price of the product for different shops.
 * @param {number}  product.Pieces      The number of the product in the cart.
 * @param {boolean} product.InCart      The variable that shows if the specified product is in the cart.
 * @param {number}  product.ShopID      The ID for the shop from which the product will be bought.
 */
const SimplifiedListProduct = ({ product }) => {
    const list = useContext(ListContext)
    const cart = useContext(CartContext)
    const theme = useTheme()

    const [showDetails, setShowDetails] = useState(false)

    const customButtonHandler = () => {
        list.updateProduct(product, product.Pieces, product.ShopID, true)
        cart.addProduct({ ...product, InCart: true }, 'list_screen')
    }

    const getProductPrice = () => {
        return list.getProductPrice(product, product.ShopID).toLocaleString()
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
                <Card.Content style={styles.cardcontent}>
                    <Text style={styles.productname} numberOfLines={2} variant="labelLarge">
                        {product.Name}
                    </Text>
                    <Text variant="headlineMedium">{getProductPrice()} Ft</Text>
                    <IconButton
                        disabled={product.InCart}
                        icon="cart-arrow-up"
                        size={30}
                        style={styles.iconbutton}
                        mode="contained-tonal"
                        onPress={customButtonHandler}
                    />
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
    cardcontent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 20,
    },
    iconbutton: {
        margin: 0,
        padding: 0,
    },
    productname: {
        flex: 1,
        flexWrap: 'wrap',
    },
})

export default SimplifiedListProduct
