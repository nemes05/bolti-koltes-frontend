import { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Divider, Text, IconButton, Portal } from 'react-native-paper'

import ApiContext from '../../../Contexts/api/api-context'
import ErrorModal from '../ErrorModal'

/**
 * The component that renders a product in the FavouriteScreen
 * @param {object}      navigation  The React Navigation object
 * @param {object}      product     The object that contains the detailes of a product
 * @param {function}    refresh     The function that can be called to refresh
 */
const FavouriteProduct = ({ navigation, product, refresh }) => {
    const [error, setError] = useState({ err: false, msg: '' })
    const api = useContext(ApiContext)

    const customButtonHandler = () => {
        navigation.navigate('productnavigation', {
            screen: 'productpage',
            params: { details: product },
        })
    }

    const removeFavouriteHandler = async () => {
        try {
            await api.removeFavourite(product.Barcode)
            refresh()
        } catch (err) {
            setError({ err: true, msg: err.message })
        }
    }

    return (
        <>
            <Portal>
                <ErrorModal
                    message={error.msg}
                    buttonText="Vissza"
                    visible={error.err}
                    dismissable
                    onDismiss={() => {
                        setError({ err: false, msg: '' })
                    }}
                    onButtonPress={() => {
                        setError({ err: false, msg: '' })
                    }}
                />
            </Portal>

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
        </>
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
