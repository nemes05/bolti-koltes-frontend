import { useState, useRef } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import NumericInput from 'react-native-numeric-input'
import { Button, Card, IconButton, TextInput } from 'react-native-paper'

import TopNavBar from '../../../Navigation/TopNavBar'

const ProductScreen = (props) => {
    const prodDetails = props.route.params.details
    const [value, setValue] = useState(undefined)
    const pieces = useRef(0)

    const data = [{ label: 'Tesco', value: 1 }]

    return (
        <>
            <TopNavBar />

            <Card style={style.card}>
                <Card.Content>
                    <View style={{ flexDirection: 'row' }}>
                        <Card.Cover
                            source={{ uri: prodDetails.ImageLink }}
                            style={{
                                width: 80,
                                height: 80,
                                marginRight: 10,
                            }}
                        />
                        <Text
                            variant="bodyMedium"
                            style={{
                                flex: 1,
                                verticalAlign: 'top',
                                fontSize: 18,
                                textAlign: 'justify',
                            }}
                        >
                            {prodDetails.Name}
                        </Text>
                    </View>
                    <Card.Actions>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Dropdown
                                data={data}
                                style={style.dropdown}
                                labelField="label"
                                valueField="value"
                                placeholder="Válasszon boltot"
                                placeholderStyle={style.placeholderStyle}
                                selectedTextStyle={style.selectedTextStyle}
                                value={value}
                                onChange={(item) => setValue(item.value)}
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

            <Card style={style.card}>
                <Card.Actions style={{ margin: 10 }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '52%',
                        }}
                    >
                        <TextInput
                            mode="outlined"
                            placeholder={prodDetails.Price.toString()}
                            disabled={
                                value !== undefined &&
                                data[value - 1].label !== 'Egyéb'
                            }
                            style={{
                                margin: 10,
                                width: '100%',
                                height: 60,
                                fontSize: 28,
                            }}
                            keyboardType="numeric"
                        />
                        <NumericInput
                            onChange={() => {}}
                            ref={pieces}
                            minValue={1}
                            maxValue={100}
                            rounded="true"
                        />
                    </View>
                    <View
                        style={{
                            flex: 2,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <View>
                            <Button
                                mode="contained"
                                style={{ margin: 10 }}
                                onPress={() => {
                                    console.log('Lista')
                                }}
                            >
                                Listára
                            </Button>
                            <Button
                                mode="contained"
                                style={{ margin: 10 }}
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
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    mode="contained"
                    style={{ width: '50%', justifyContent: 'center' }}
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

const style = StyleSheet.create({
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
