import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Text, TextInput, IconButton } from 'react-native-paper'

import CartContext from '../../../Contexts/cart/cart-context'
import TopNavBar from '../../Navigation/TopNavBar'

const CartDiscount = ({ navigation, onBackPress, discount }) => {
    const cart = useContext(CartContext)
    const [price, setPrice] = useState(10000)
    const [discountValue, setDiscountValue] = useState(1000)

    const setDiscountHandler = () => {
        cart.addDiscount({
            DiscountID: discount.DiscountID,
            DiscountName: discount.DiscountName,
            Price: price,
            DiscountValue: discountValue,
            ImageLink: discount.ImageLink,
        })

        navigation.navigate('main')
    }

    return (
        <>
            <TopNavBar
                navigation={navigation}
                title={
                    <IconButton
                        icon="home"
                        size={40}
                        onPress={() => {
                            navigation.navigate('main')
                        }}
                    />
                }
            />

            <View style={styles.cardcontainer}>
                <Card>
                    <Card.Content>
                        <View style={styles.cardcontentcontainer}>
                            <View style={styles.inputcontainer}>
                                <TextInput
                                    style={{ height: 45 }}
                                    mode="outlined"
                                    value={price.toString()}
                                    keyboardType="numeric"
                                    onChangeText={(number) => {
                                        setPrice(number)
                                    }}
                                />
                                <Text variant="labelLarge"> Ft felett </Text>
                                <TextInput
                                    style={{ height: 45 }}
                                    mode="outlined"
                                    value={discountValue.toString()}
                                    keyboardType="numeric"
                                    onChangeText={(number) => {
                                        setDiscountValue(+number)
                                    }}
                                />
                                <Text variant="labelLarge"> Ft kedvezmény.</Text>
                            </View>
                            <View style={{ width: '60%' }}>
                                <Button mode="contained" onPress={setDiscountHandler}>
                                    Hozzáadás
                                </Button>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                <Button mode="contained" onPress={onBackPress}>
                    Vissza
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cardcontainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80%',
        margin: 10,
    },
    cardcontentcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    inputcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default CartDiscount
