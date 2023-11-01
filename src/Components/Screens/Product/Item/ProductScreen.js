import { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import { Button, Card, IconButton, TextInput, Text, Portal, Modal, Snackbar } from 'react-native-paper'

import ApiContext from '../../../../api/api-context'
import CartContext from '../../../../list-cart/cart-context'
import ListContext from '../../../../list-cart/list-context'
import TopNavBar from '../../../Navigation/TopNavBar'
import Dropdown from '../../../UI/Dropdown'

const ProductScreen = ({ navigation, route }) => {
    const api = useContext(ApiContext)
    const list = useContext(ListContext)
    const cart = useContext(CartContext)

    const [value, setValue] = useState(undefined)
    const [price, setPrice] = useState(0)
    const [pieces, setPieces] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)

    const prodDetails = route.params.details
    const parent = navigation.getParent()
    const shopNames = api.shops.map((item) => item.ShopName)

    const addProductHandler = (source) => {
        if (value === undefined) {
            setShowModal(true)
            return
        }

        const shop = prodDetails.Price.filter((data) => data.ShopID === api.shops[value - 1].ShopID)[0]
        prodDetails.Price[prodDetails.Price.indexOf(shop)].Price = price

        if (source === 'list') {
            list.addProduct({
                ...prodDetails,
                Pieces: pieces,
                ShopID: api.shops[value - 1].ShopID,
            })
            setShowSnackBar(true)
        } else if (source === 'cart') {
            cart.addProduct({
                ...prodDetails,
                Pieces: pieces,
                ShopID: api.shops[value - 1].ShopID,
            })
            setShowSnackBar(true)
        }
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
                <Modal
                    style={styles.centerview}
                    visible={showModal}
                    onDismiss={() => {
                        setShowModal(false)
                    }}
                >
                    <Card style={styles.modalcard}>
                        <Card.Content>
                            <View style={styles.centerview}>
                                <Text variant="headlineSmall">Válasszon egy boltot!</Text>
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <View style={styles.centercontainer}>
                                <Button
                                    style={styles.button}
                                    mode="outlined"
                                    onPress={() => {
                                        setShowModal(false)
                                    }}
                                >
                                    Vissza
                                </Button>
                            </View>
                        </Card.Actions>
                    </Card>
                </Modal>
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
                    <IconButton
                        icon="star-outline"
                        onPress={() => {
                            console.log('Kedvencekhez')
                        }}
                    />
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
