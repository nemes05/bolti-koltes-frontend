import { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import { Button, Card, IconButton, TextInput, Text, Portal, Snackbar } from 'react-native-paper'

import ApiContext from '../../../../Contexts/api/api-context'
import CartContext from '../../../../Contexts/cart/cart-context'
import ListContext from '../../../../Contexts/list/list-context'
import TopNavBar from '../../../Navigation/TopNavBar'
import Dropdown from '../../../UI/Dropdown'
import ErrorModal from '../../../UI/ErrorModal'

/**
 * The component for showing the product after scanning it.
 * @param {object}  navigation  The navigation object that contains the functions for navigating. (passed down automatically)
 * @param {object}  route       The object that contains the the parameters for the screen. (passed down automatically)
 */
const ProductScreen = ({ navigation, route }) => {
    const api = useContext(ApiContext)
    const list = useContext(ListContext)
    const cart = useContext(CartContext)

    const [value, setValue] = useState(undefined)
    const [price, setPrice] = useState(0)
    const [pieces, setPieces] = useState(1)
    const [error, setError] = useState({ err: false, msg: '' })
    const [showSnackBar, setShowSnackBar] = useState(false)

    const prodDetails = route.params.details
    const parent = navigation.getParent()
    const shopNames = api.shops.map((item) => item.ShopName)

    const addProductHandler = (source) => {
        if (value === undefined) {
            setError({ err: true, msg: 'Válasszon egy boltot!' })
            return
        }

        const shop = prodDetails.Price.filter((data) => data.ShopID === api.shops[value - 1].ShopID)[0]
        prodDetails.Price[prodDetails.Price.indexOf(shop)].Price = price

        const product = {
            ...prodDetails,
            Pieces: pieces,
            ShopID: api.shops[value - 1].ShopID,
        }

        if (source === 'list') {
            list.addProduct({
                ...product,
                InCart: false,
            })
            cart.removeProduct(product.Barcode)
            setShowSnackBar(true)
        } else if (source === 'cart') {
            cart.addProduct(
                {
                    ...product,
                    InCart: true,
                },
                'prod_details'
            )
            list.addProduct({
                ...product,
                InCart: true,
            })
            setShowSnackBar(true)
        }
    }

    const addFavouriteHandler = () => {
        if (!api.userStatus) {
            setError({ err: true, msg: 'Ehhez a funkcióhoz be kell jelentkeznie!' })
            //return
        }

        //api.addFavourite()
    }

    const dropDownSelectHandler = (item) => {
        const shop = api.shops.find((element) => element.ShopName === item)
        setValue(shop.ShopID)
        setPrice(list.getShopPrice(prodDetails, shop.ShopID))
    }

    return (
        <>
            {/* The component which shows the errors */}
            <Portal>
                <ErrorModal
                    message={error.msg}
                    buttonText="Vissza"
                    visible={error.err}
                    dismissable
                    onDismiss={() => {
                        setError({ err: false, msg: '' })
                    }}
                    onButtonPress={() => {
                        setError({ err: false, msg: '' })
                    }}
                />
            </Portal>

            {/* Snacbar shows if the product handling was succesfull */}
            <Snackbar
                style={{ marginBottom: 20 }}
                visible={showSnackBar}
                duration={1000}
                elevation={3}
                icon="check"
                onDismiss={() => {
                    setShowSnackBar(false)
                    parent.navigate('main')
                }}
                onIconPress={() => {
                    setShowSnackBar(false)
                    parent.navigate('main')
                }}
            >
                Sikeresen hozzáadva
            </Snackbar>

            {/* Top navigation bar */}
            <TopNavBar
                navigation={parent}
                title={
                    <IconButton
                        icon="home"
                        size={40}
                        onPress={() => {
                            parent.navigate('main')
                        }}
                    />
                }
            />

            {/* First card displays the product name, provides dropdown for shop selection and favourites button */}
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.rowflexbox}>
                        <Card.Cover source={{ uri: prodDetails.ImageLink }} style={styles.productimage} />
                        <Text variant="titleMedium" style={styles.productname}>
                            {prodDetails.Name}
                        </Text>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <View style={styles.centercontainer}>
                        <Dropdown
                            placeholder="Válasszon egy boltot"
                            data={shopNames}
                            onSelect={(item) => {
                                dropDownSelectHandler(item)
                            }}
                        />
                    </View>
                    <IconButton icon="star-outline" onPress={addFavouriteHandler} />
                </Card.Actions>
            </Card>

            {/* Second card displays the price (editable) and the quantity, buttons for add product to list or cart */}
            <Card style={styles.card}>
                <Card.Actions>
                    <View style={styles.actionscontainer}>
                        <TextInput
                            mode="outlined"
                            editable
                            style={styles.priceinput}
                            value={price.toString()}
                            onChangeText={(inputPrice) => {
                                setPrice(inputPrice)
                            }}
                            keyboardType="numeric"
                        />
                        <Text variant="titleMedium">Ft/db</Text>
                        <NumericInput
                            onChange={(value) => {
                                setPieces(value)
                            }}
                            value={pieces}
                            minValue={1}
                            maxValue={100}
                            containerStyle={{ width: '70%' }}
                            rounded="true"
                        />
                    </View>
                    <View style={styles.actionbuttonscontainer}>
                        <View>
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    addProductHandler('list')
                                }}
                            >
                                Listára
                            </Button>
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    addProductHandler('cart')
                                }}
                            >
                                Kosárba
                            </Button>
                        </View>
                    </View>
                </Card.Actions>
            </Card>

            {/* View that contains buttons for navigation */}
            <View style={styles.navigationcontainer}>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => {
                        parent.replace('scan')
                    }}
                >
                    Új kód beolvasása
                </Button>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => {
                        parent.navigate('main')
                    }}
                >
                    Vissza a főoldalra
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    navigationcontainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: '10%',
    },
    centercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowflexbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionbuttonscontainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    actionscontainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
        width: '56%',
    },
    centerview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    productimage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    productname: {
        flex: 1,
        flexWrap: 'wrap',
    },
    priceinput: {
        width: '70%',
        height: 60,
        fontSize: 30,
    },
    card: {
        margin: 10,
        padding: 5,
    },
    modalcard: {
        width: '90%',
        padding: 15,
    },
    modaltext: {
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin: 10,
    },
})

export default ProductScreen
