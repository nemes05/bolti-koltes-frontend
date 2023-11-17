import { View, StyleSheet } from 'react-native'
import { Card, Divider, Text, IconButton } from 'react-native-paper'

const FavouriteProduct = ({ navigation, product }) => {
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
            <Card.Content>
                <View style={styles.topcontainer}>
                    <Text style={styles.productname} variant="labelLarge">
                        {product.Name}
                    </Text>
                    <Divider horizontalInset="true" bold="true" />
                </View>
                <View style={styles.bottomcontainer}>
                    <IconButton
                        icon="trash-can-outline"
                        size={30}
                        style={styles.iconbutton}
                        mode="contained-tonal"
                        onPress={removeFavouriteHandler}
                    />
                    <Card.Cover source={{ uri: product.ImageLink }} style={styles.productimage} />
                    <IconButton
                        icon="plus"
                        size={30}
                        style={styles.iconbutton}
                        mode="contained-tonal"
                        onPress={customButtonHandler}
                    />
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
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

export default FavouriteProduct
