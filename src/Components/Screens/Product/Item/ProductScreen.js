import { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import NumericInput from 'react-native-numeric-input'
import { Button, Card, IconButton, TextInput, Text } from 'react-native-paper'

import ApiContext from '../../../../api/api-context'
import TopNavBar from '../../../Navigation/TopNavBar'

const ProductScreen = (props) => {
    const prodDetails = props.route.params.details
    const [value, setValue] = useState(undefined)
    const [price, setPrice] = useState(0)
    const [pieces, setPieces] = useState(1)
    const api = useContext(ApiContext)

    return (
        <>
            <TopNavBar />

            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.productcardimagebox}>
                        <Card.Cover source={{ uri: prodDetails.ImageLink }} style={styles.productimage} />
                        <Text variant="titleMedium" style={styles.productname}>
                            {prodDetails.Name}
                        </Text>
                    </View>
                    <Card.Actions>
                        <View style={styles.productcardactioncontainer}>
                            <Dropdown
                                data={api.shops}
                                style={styles.dropdown}
                                labelField="ShopName"
                                valueField="ShopID"
                                placeholder="Válasszon boltot"
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                value={value}
                                onChange={(item) => {
                                    setValue(item.ShopID)
                                    setPrice(prodDetails.Price)
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
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Actions>
                    <View style={styles.pricecardinputcontainer}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                mode="outlined"
                                editable={!(value !== undefined && api.shops[value - 1].ShopName !== 'Egyéb')}
                                //disabled={value !== undefined && api.shops[value - 1].ShopName !== 'Egyéb'}
                                style={styles.priceinput}
                                value={price.toString()}
                                onChangeText={(inputPrice) => {
                                    setPrice(inputPrice)
                                }}
                                keyboardType="numeric"
                            />
                            <Text variant="titleMedium" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                Ft/db
                            </Text>
                        </View>
                        <NumericInput
                            onChange={(value) => {
                                setPieces(value)
                            }}
                            value={pieces}
                            minValue={1}
                            maxValue={100}
                            rounded="true"
                        />
                    </View>
                    <View style={styles.pricecardbuttoncontainer}>
                        <View>
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    console.log('Lista')
                                }}
                            >
                                Listára
                            </Button>
                            <Button
                                mode="contained"
                                style={styles.button}
                                onPress={() => {
                                    console.log('Kosár')
                                }}
                            >
                                Kosárba
                            </Button>
                        </View>
                    </View>
                </Card.Actions>
            </Card>

            <View style={styles.newbuttoncontainer}>
                <Button
                    mode="contained"
                    style={styles.newbutton}
                    onPress={() => {
                        const parent = props.navigation.getParent()
                        parent.navigate('scan')
                    }}
                >
                    Új kód beolvasása
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    productcardimagebox: {
        flexDirection: 'row',
    },
    productimage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    productname: {
        flex: 1,
        verticalAlign: 'top',
        textAlign: 'justify',
    },
    productcardactioncontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pricecardinputcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '52%',
    },
    priceinput: {
        margin: 10,
        width: '80%',
        height: 60,
        fontSize: 28,
    },
    pricecardbuttoncontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    newbuttoncontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newbutton: {
        width: '50%',
        justifyContent: 'center',
    },
    button: {
        margin: 10,
    },
    card: {
        margin: 10,
        padding: 5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
        margin: 5,
        width: '100%',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
})

export default ProductScreen
