import { useContext, useState } from 'react'
import { View } from 'react-native'
import { Button, Card, Text, TextInput, IconButton } from 'react-native-paper'

import CartContext from '../../../Contexts/cart/cart-context'
import TopNavBar from '../../Navigation/TopNavBar'

const CartDiscount = ({ navigation, onBackPress, discount }) => {
    const cart = useContext(CartContext)
    const [price, setPrice] = useState(10000)
    const [percent, setPercent] = useState(10)

    const setDiscountHandler = () => {
        cart.addDiscount({
            DiscountID: discount.DiscountID,
            DiscountName: discount.DiscountName,
            Price: price,
            Percent: percent,
        })
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

            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '80%',
                    margin: 10,
                }}
            >
                <Card>
                    <Card.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TextInput
                                style={{ height: 45 }}
                                mode="outlined"
                                value={price.toString()}
                                keyboardType="numeric"
                                onChangeText={(number) => {
                                    setPrice(number)
                                }}
                            />
                            <Text variant="labelLarge"> db felett </Text>
                            <TextInput
                                style={{ height: 45 }}
                                mode="outlined"
                                value={percent.toString()}
                                keyboardType="numeric"
                                onChangeText={(number) => {
                                    if (number >= 0 && number <= 100) setPercent(+number)
                                }}
                            />
                            <Text variant="labelLarge"> %-al olcsóbb.</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Button mode="contained" onPress={setDiscountHandler}>
                                Hozzáadás
                            </Button>
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

export default CartDiscount
