import { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text, Button, Divider, TextInput, IconButton, useTheme } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'

import ApiContext from '../../api/api-context'
import ListContext from '../../list-cart/list-context'

const ProductDetails = (props) => {
    const prod = props.product
    const dummyBoolean = true
    const api = useContext(ApiContext)
    const list = useContext(ListContext)
    const shopNames = api.shops.map((item) => item.ShopName)
    const [newPrice, setNewPrice] = useState(
        prod.Price[prod.Price.findIndex((shop) => shop.ShopID === prod.ShopID)].Price
    )
    const [newPiece, setNewPiece] = useState(prod.Pieces)
    const [newShop, setNewShop] = useState(prod.ShopID)
    const [showError, setShowError] = useState(false)
    const theme = useTheme()

    const validInput = (type, number) => {
        if (type === 'price') return parseInt(number, 10) && parseInt(number, 10) >= 0
        if (type === 'piece') return parseInt(number, 10) && parseInt(number, 10) > 0
    }

    const formValidation = () => {
        if (validInput('price', newPrice) && validInput('piece', newPiece)) {
            list.updateProduct(prod, newPrice, newPiece, newShop)
            props.onDismiss()
        } else {
            setShowError(true)
        }
    }

    return (
        <>
            {!showError && (
                <View style={styles.centerview}>
                    <Card style={styles.modalcard}>
                        <Card.Content>
                            <View style={styles.productcardimagebox}>
                                <Card.Cover source={{ uri: prod.ImageLink }} style={styles.productimage} />
                                <Text variant="titleMedium" style={styles.productname}>
                                    {prod.Name}
                                </Text>
                            </View>
                            <Divider />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <TextInput
                                    mode="outlined"
                                    inputMode="numeric"
                                    placeholder={prod.Pieces.toString()}
                                    onChangeText={(piece) => {
                                        setNewPiece(piece)
                                    }}
                                    style={{ width: '50%', marginRight: 10, fontSize: 30 }}
                                />
                                <Text variant="headlineSmall">db</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <TextInput
                                    mode="outlined"
                                    placeholder={prod.Price[
                                        prod.Price.findIndex((shop) => shop.ShopID === prod.ShopID)
                                    ].Price.toString()}
                                    inputMode="numeric"
                                    value={newPrice.toString()}
                                    onChangeText={(price) => {
                                        setNewPrice(price)
                                    }}
                                    style={{ width: '50%', marginRight: 10, fontSize: 30 }}
                                />
                                <Text variant="headlineSmall">Ft/db</Text>
                            </View>
                            <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <SelectDropdown
                                    data={shopNames}
                                    defaultValueByIndex={api.shops.findIndex((shop) => shop.ShopID === prod.ShopID)}
                                    statusBarTranslucent={dummyBoolean}
                                    buttonStyle={styles.dropdownBtnStyle}
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    dropdownStyle={styles.dropdown1DropdownStyle}
                                    rowStyle={styles.dropdown1RowStyle}
                                    rowTextStyle={styles.dropdown1RowTxtStyle}
                                    onSelect={(item) => {
                                        const shop = api.shops.find((element) => element.ShopName === item)
                                        setNewShop(shop.ShopID)
                                        setNewPrice(
                                            prod.Price[
                                                prod.Price.findIndex((element) => element.ShopID === shop.ShopID)
                                            ].Price
                                        )
                                    }}
                                />
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton
                                    icon="close"
                                    size={30}
                                    style={{ margin: 0, padding: 0 }}
                                    mode="outlined"
                                    iconColor={theme.colors.error}
                                    borderColor={theme.colors.error}
                                    onPress={() => {
                                        list.removeProduct(prod.Barcode)
                                        props.onDismiss()
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
                                        props.onDismiss()
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
                            <Text variant="headlineSmall" style={{ textAlign: 'center', margin: 10 }}>
                                Adjon meg helyes adatokat!
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
