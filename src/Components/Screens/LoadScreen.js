import { getNetworkStateAsync } from 'expo-network'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Portal } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import PreferencesContext from '../../Contexts/preferences/preferences-context'
import ErrorModal from '../UI/ErrorModal'
import LoadIndicator from '../UI/LoadIndicator'

/**
 * The screen that is visible during the initial load.
 * @param {object}  navigation  The navigation object that contains the functions for navigating. (passed down automatically)
 */
const LoadScreen = ({ navigation }) => {
    const api = useContext(ApiContext)
    const preferences = useContext(PreferencesContext)

    const [error, setError] = useState({ err: false, msg: '' })

    const checkNetwork = async () => {
        const connection = await getNetworkStateAsync()
        if (!connection.isConnected) {
            setError({ err: true, msg: 'Kapcsolja be az internetet!' })
        } else {
            loadContent()
                .catch((err) => {
                    setError({ err: true, msg: err.message })
                })
                .then((page) => {
                    navigation.replace(page)
                })
        }
    }

    const getShops = async () => {
        try {
            await api.getShops()
        } catch (err) {
            throw err
        }
    }

    const loadPreferences = async () => {
        try {
            return await preferences.loadPreferences()
        } catch (err) {
            throw err
        }
    }

    const loadUser = async () => {
        try {
            await api.initUser()
        } catch (err) {
            throw err
        }
    }

    const loadContent = async () => {
        try {
            await getShops()
            const firstTime = await loadPreferences()
            if (firstTime) {
                return 'tutorial'
            }
            await loadUser()
            return 'main'
        } catch (err) {
            throw err
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
