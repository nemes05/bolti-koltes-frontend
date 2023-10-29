import { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text, Button, Divider, TextInput, IconButton, useTheme } from 'react-native-paper'

import ApiContext from '../../../api/api-context'
import CartContext from '../../../list-cart/cart-context'
import ListContext from '../../../list-cart/list-context'
import Dropdown from '../Dropdown'

const ProductDetails = ({ onDismiss, product, caller }) => {
    const api = useContext(ApiContext)
    const list = useContext(ListContext)
    const cart = useContext(CartContext)
    const theme = useTheme()

    const [newPrice, setNewPrice] = useState(list.getShopPrice(product, product.ShopID))
    const [newPiece, setNewPiece] = useState(product.Pieces)
    const [newShop, setNewShop] = useState(product.ShopID)
    const [showError, setShowError] = useState(false)

    const shopNames = api.shops.map((item) => item.ShopName)

    const validInput = (type, number) => {
        if (type === 'price') return parseInt(number, 10) && parseInt(number, 10) >= 0
        if (type === 'piece') return parseInt(number, 10) && parseInt(number, 10) > 0
    }

    const formValidation = () => {
        if (validInput('price', newPrice) && validInput('piece', newPiece)) {
            const shop = product.Price.filter((data) => data.ShopID === newShop)[0]
            product.Price[product.Price.indexOf(shop)].Price = newPrice
            if (caller === 'list') {
                list.updateProduct(product, newPiece, newShop, product.InCart)
            } else if (caller === 'cart') {
                list.updateProduct(product, newPiece, newShop, product.InCart)
                cart.updateProduct(product, newPiece, newShop, product.InCart)
            }
            onDismiss()
        } else {
            setShowError(true)
        }
    }

    const customButtonHandler = () => {
        if (caller === 'cart') {
            list.updateProduct(product, product.Pieces, product.ShopID, false)
            cart.removeProduct(product.Barcode)
        } else if (caller === 'list') {
            list.removeProduct(product.Barcode)
        }
        onDismiss()
    }

    return (
        <>
            {!showError && (
                <View style={styles.centerview}>
                    <Card style={styles.modalcard}>
                        <Card.Content>
                            <View style={styles.productcardimagebox}>
                                <Card.Cover source={{ uri: product.ImageLink }} style={styles.productimage} />
                                <Text variant="titleMedium" style={styles.productname}>
                                    {product.Name}
                                </Text>
                            </View>
                            <Divider />
                            <View style={styles.inputcontainer}>
                                <TextInput
                                    mode="outlined"
                                    inputMode="numeric"
                                    value={newPiece.toString()}
                                    onChangeText={(piece) => {
                                        setNewPiece(piece)
                                    }}
                                    style={styles.textinput}
                                />
                                <Text variant="headlineSmall">db</Text>
                            </View>
                            <View style={styles.inputcontainer}>
                                <TextInput
                                    mode="outlined"
                                    inputMode="numeric"
                                    value={newPrice.toString()}
                                    onChangeText={(price) => {
                                        setNewPrice(price)
                                    }}
                                    style={styles.textinput}
                                />
                                <Text variant="headlineSmall">Ft/db</Text>
                            </View>
                            <View style={styles.dropdowncontainer}>
                                <Dropdown
                                    data={shopNames}
                                    defaultValue={api.shops.findIndex((shop) => shop.ShopID === product.ShopID)}
                                    onSelect={(item) => {
                                        const shop = api.shops.find((element) => element.ShopName === item)
                                        setNewShop(shop.ShopID)
                                        setNewPrice(list.getShopPrice(product, shop.ShopID))
                                    }}
                                />
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <View style={styles.cardactionscontainer}>
                                <IconButton
                                    icon={caller === 'cart' ? 'cart-arrow-up' : 'close'}
                                    size={30}
                                    style={styles.iconbutton}
                                    mode="outlined"
                                    iconColor={theme.colors.error}
                                    borderColor={theme.colors.error}
                                    onPress={() => {
                                        customButtonHandler()
                                    }}
                                />
                                <Button
                                    mode="outlined"
                                    onPress={() => {
                                        formValidation()
                                    }}
                                >
                                    Mentés
                                </Button>
                                <Button
                                    mode="outlined"
                                    onPress={() => {
                                        onDismiss()
                                    }}
                                >
                                    Vissza
                                </Button>
                            </View>
                        </Card.Actions>
                    </Card>
                </View>
            )}

            {showError && (
                <View style={styles.centerview}>
                    <Card style={styles.modalcard}>
                        <Card.Content>
                            <Text variant="headlineSmall" style={styles.errortext}>
                                Adjon meg helyes adatokat!
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <View style={styles.cetercontainer}>
                                <Button
                                    mode="outlined"
                                    onPress={() => {
                                        setShowError(false)
                                    }}
                                >
                                    Vissza
                                </Button>
                            </View>
                        </Card.Actions>
                    </Card>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    productimage: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    cetercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalcard: {
        width: '90%',
        padding: 15,
    },
    productcardimagebox: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    productname: {
        flex: 1,
        verticalAlign: 'top',
        textAlign: 'justify',
    },
    inputcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    textinput: {
        width: '50%',
        marginRight: 10,
        fontSize: 30,
    },
    cardactionscontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdowncontainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconbutton: {
        margin: 0,
        padding: 0,
    },
    errortext: {
        textAlign: 'center',
        margin: 10,
    },
    dropdownBtnStyle: {
        height: 50,
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {
        color: '#444',
        textAlign: 'left',
    },
    dropdown1DropdownStyle: {
        backgroundColor: '#EFEFEF',
    },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
    },
    dropdown1RowTxtStyle: {
        color: '#444',
        textAlign: 'left',
    },
})

export default ProductDetails
