import { getNetworkStateAsync } from 'expo-network'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Portal } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import CartContext from '../../Contexts/cart/cart-context'
import ListContext from '../../Contexts/list/list-context'
import PreferencesContext from '../../Contexts/preferences/preferences-context'
import ErrorModal from '../UI/ErrorModal'
import LoadIndicator from '../UI/LoadIndicator'

/**
 * The screen that is visible during the initial load.
 * @param {object}  navigation  The navigation object that contains the functions for navigating. (passed down automatically)
 */
const LoadScreen = ({ navigation }) => {
    const list = useContext(ListContext)
    const cart = useContext(CartContext)
    const api = useContext(ApiContext)
    const preferences = useContext(PreferencesContext)

    const [error, setError] = useState({ err: false, msg: '' })

    const checkNetwork = async () => {
        const connection = await getNetworkStateAsync()
        if (!connection.isConnected) {
            setError({ err: true, msg: 'Kapcsolja be az internetet!' })
        } else {
            loadContent().then(() => {
                navigation.navigate('main')
            })
        }
    }

    const loadCart = async () => {
        try {
            await cart.initCart()
        } catch (err) {
            setError({ err: true, msg: err.msg })
        }
    }

    const loadList = async () => {
        try {
            list.initList()
        } catch (err) {
            setError({ err: true, msg: err.msg })
        }
    }

    const getShops = async () => {
        try {
            await api.getShops()
        } catch (err) {
            setError({ err: true, msg: err.msg })
        }
    }

    const loadPreferences = async () => {
        try {
            preferences.loadPreferences()
        } catch (err) {
            setError({ err: true, msg: err.msg })
        }
    }

    const loadContent = async () => {
        try {
            await loadPreferences()
            await getShops()
            await loadList()
            await loadCart()
        } catch (err) {
            setError({ err: true, msg: err.msg })
        }
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

            {!error.err && (
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
