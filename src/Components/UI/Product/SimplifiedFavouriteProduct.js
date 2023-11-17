import { StyleSheet } from 'react-native'
import { Card, Text, IconButton } from 'react-native-paper'

const SimplifiedFavouriteProduct = ({ navigation, product }) => {
    const customButtonHandler = () => {
        navigation.navigate('productnavigation', {
            screen: 'productpage',
            params: { details: product },
        })
    }

    const removeFavouriteHandler = () => {
        console.log('Törlés')
    }

    return (
        <Card style={styles.card}>
            <Card.Content style={styles.cardcontent}>
                <Text style={styles.productname} numberOfLines={2} variant="labelLarge">
                    {product.Name}
                </Text>
                <IconButton
                    icon="trash-can-outline"
                    size={30}
                    style={styles.iconbutton}
                    mode="contained-tonal"
                    onPress={removeFavouriteHandler}
                />
                <IconButton
                    icon="plus"
                    size={30}
                    style={styles.iconbutton}
                    mode="contained-tonal"
                    onPress={customButtonHandler}
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
})

export default SimplifiedFavouriteProduct
