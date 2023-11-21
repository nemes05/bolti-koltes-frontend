import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text, IconButton } from 'react-native-paper'

import ApiContext from '../../../Contexts/api/api-context'

const SearchProduct = ({ Barcode, ImageLink, Name, navigation }) => {
    const api = useContext(ApiContext)

    const onAddPress = async () => {
        const details = await api.getProduct(Barcode)
        navigation.navigate('productpage', {
            details,
        })
    }

    return (
        <Card style={styles.card} onPress={onAddPress}>
            <Card.Content style={styles.cardcontent}>
                <Card.Cover source={{ uri: ImageLink }} style={styles.productimage} />
                <Text style={styles.productname} numberOfLines={2} variant="labelLarge">
                    {Name}
                </Text>
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

export default SearchProduct
