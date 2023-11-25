import { useContext, useState } from 'react'
import { View } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import { Button, Card, Text, TextInput } from 'react-native-paper'

import ListContext from '../../../Contexts/list/list-context'
import Dropdown from '../Dropdown'

const UnitPriceDiscount = () => {
    const list = useContext(ListContext)
    const [quantity, setQuantity] = useState(3)
    const [percent, setPercent] = useState(10)
    const [product, setProduct] = useState(undefined)

    const products = []
    list.list.forEach((item) => {
        if (!item.InCart) products.push(item.Name)
    })

    const setDiscountHandler = () => {
        const index = list.list.findIndex((item) => item.Name === product)
        const Barcode = list.list[index].Barcode

        list.addDiscount(list.list[index], Barcode, {
            DiscountID: 1,
            Quantity: quantity,
            Percent: percent,
            Name: 'Egységár kedvezmény',
        })
    }

    return (
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
                    <NumericInput
                        rounded="true"
                        onChange={(value) => {
                            setQuantity(value)
                        }}
                        value={quantity}
                        minValue={1}
                        maxValue={100}
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
                <View>
                    <Dropdown
                        data={products}
                        onSelect={(item) => {
                            setProduct(item)
                        }}
                    />
                </View>
                <View style={{ width: '60%' }}>
                    <Button mode="contained" onPress={setDiscountHandler}>
                        Hozzáadás
                    </Button>
                </View>
            </Card.Content>
        </Card>
    )
}

export default UnitPriceDiscount
