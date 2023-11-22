import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Text, IconButton, Divider } from 'react-native-paper'

import ApiContext from '../../../../Contexts/api/api-context'

const HistoryProduct = ({ Name, Barcode, ImageLink, Price, onError, navigation }) => {
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
            <Card.Content>
                <View style={styles.topcontainer}>
                    <Text style={styles.productname} variant="labelLarge">
                        {Name}
                    </Text>
                    <Divider horizontalInset="true" bold="true" />
                </View>
                <View style={styles.bottomcontainer}>
                    <Card.Cover source={{ uri: ImageLink }} style={styles.productimage} />
                    <Text variant="headlineMedium">{Price} Ft</Text>
                    <IconButton
                        style={styles.iconbutton}
                        icon="plus"
                        size={30}
                        mode="contained-tonal"
                        onPress={onAddPress}
                    />
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    disabledcard: {
        margin: 5,
        padding: 3,
    },
    card: {
        margin: 5,
        padding: 3,
    },
    topcontainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    bottomcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    productname: {
        textAlign: 'center',
        marginBottom: 5,
    },
    productimage: {
        width: 70,
        height: 70,
        marginRight: 5,
    },
    iconbutton: {
        margin: 0,
        padding: 0,
    },
})

export default HistoryProduct
