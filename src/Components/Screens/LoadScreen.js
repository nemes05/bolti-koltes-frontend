import { getNetworkStateAsync } from 'expo-network'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Card, Button, Modal, Portal } from 'react-native-paper'

import ApiContext from '../../api/api-context'
import CartContext from '../../list-cart/cart-context'
import ListContext from '../../list-cart/list-context'
import ErrorModal from '../UI/ErrorModal'
import LoadIndicator from '../UI/LoadIndicator'

const LoadScreen = (props) => {
    const list = useContext(ListContext)
    const cart = useContext(CartContext)
    const api = useContext(ApiContext)

    const [error, setError] = useState(false)

    const checkNetwork = async () => {
        const connection = await getNetworkStateAsync()
        if (!connection.isConnected) {
            setError(true)
        } else {
            loadContent()
        }
    }

    const getShops = async () => {
        await api.getShops()
    }

    const loadContent = () => {
        getShops()
            .then(
                list
                    .initList()
                    .then(
                        cart
                            .initCart()
                            .then(props.navigation.replace('main'))
                            .catch((err) => {
                                console.log(err.message)
                            })
                    )
                    .catch((err) => {
                        console.log(err.message)
                    })
            )
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        checkNetwork()
    }, [])

    return (
        <>
            <Portal>
                <ErrorModal
                    message="Kapcsolja be az internetet!"
                    buttonText="Újratöltés"
                    visible={error}
                    dismisable={false}
                    onDismiss={() => {}}
                    onButtonPress={() => {
                        setError(false)
                    }}
                />
            </Portal>

            {!error && (
                <View style={styles.centercontainer}>
                    <LoadIndicator title="Loading..." />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    centercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default LoadScreen
