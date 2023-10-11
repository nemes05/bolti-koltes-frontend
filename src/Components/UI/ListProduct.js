import { StyleSheet, View } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'

const ListProduct = (props) => {
    const prod = props.product
    return (
        <Card style={{ margin: 5, padding: 3 }}>
            <Card.Content style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Card.Cover source={{ uri: prod.ImageLink }} style={styles.productimage} />
                    <View style={{ justifyContent: 'center', width: '65%' }}>
                        <Text numberOfLines={1}>{prod.Name}</Text>
                        <Text variant="labelLarge" style={{ textAlign: 'center' }}>
                            {prod.Price}
                        </Text>
                    </View>
                </View>
                <Card.Actions>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton icon="cart-plus" style={{ marginRight: 20, borderWidth: 1 }} />
                    </View>
                </Card.Actions>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    productimage: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
})

export default ListProduct
