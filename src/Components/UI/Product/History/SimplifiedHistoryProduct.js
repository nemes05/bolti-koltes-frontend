import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'

import ApiContext from '../../../../Contexts/api/api-context'

const SimplifiedHistoryProduct = ({ Name, Barcode, Price, onError, navigation }) => {
    const api = useContext(ApiContext)

    const onAddPress = () => {
        api.getProduct(Barcode)
            .then((details) => {
                navigation.navigate('productnavigation', {
                    screen: 'productpage',
                    params: { details },
                })
            })
            .catch((err) => {
                onError({ hasError: true, msg: err.message })
            })
    }

    return (
        <Card style={styles.card} onPress={onAddPress}>
            <Card.Content style={styles.cardcontent}>
                <Text style={styles.productname} numberOfLines={2} variant="labelLarge">
                    {Name}
                </Text>
                <Text variant="labelLarge">{Price} Ft</Text>
                <IconButton
                    icon="plus"
                    size={30}
                    style={styles.iconbutton}
                    mode="contained-tonal"
                    onPress={onAddPress}
                />
            </Card.Content>
        </Card>
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
    productimage: {
        width: 70,
        height: 70,
        marginRight: 5,
    },
})

export default SimplifiedHistoryProduct
