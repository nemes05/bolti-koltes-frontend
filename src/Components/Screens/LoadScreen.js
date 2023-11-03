import { getNetworkStateAsync } from 'expo-network'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Portal } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import CartContext from '../../Contexts/cart/cart-context'
import ListContext from '../../Contexts/list/list-context'
import ErrorModal from '../UI/ErrorModal'
import LoadIndicator from '../UI/LoadIndicator'

const LoadScreen = (props) => {
    const list = useContext(ListContext)
    const cart = useContext(CartContext)
    const api = useContext(ApiContext)

    const [error, setError] = useState({ err: false, msg: '' })

    const checkNetwork = async () => {
        const connection = await getNetworkStateAsync()
        if (!connection.isConnected) {
            setError({ err: true, msg: 'Kapcsolja be az internetet!' })
        } else {
            loadContent()
        }
    }

    const loadCart = () => {
        cart.initCart().catch((err) => {
            setError({ err: true, msg: err.msg })
        })
    }

    const loadList = () => {
        list.initList().catch((err) => {
            setError({ err: true, msg: err.msg })
        })
    }

    const getShops = () => {
        api.getShops().catch((err) => {
            setError({ err: true, msg: err.msg })
        })
    }

    const loadContent = async () => {
        await getShops()
        await loadList()
        await loadCart()
        props.navigation.navigate('main')
    }

    useEffect(() => {
        checkNetwork()
    }, [])

    return (
        <>
            <Portal>
                <ErrorModal
                    message={error.msg}
                    buttonText="Újratöltés"
                    visible={error.err}
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
