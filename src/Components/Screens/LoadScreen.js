import { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Text, ActivityIndicator } from 'react-native-paper'

import ApiContext from '../../api/api-context'
import ListContext from '../../list-cart/list-context'

const LoadScreen = (props) => {
    const list = useContext(ListContext)
    const api = useContext(ApiContext)

    useEffect(() => {
        const getShops = async () => {
            await api.getShops()
        }

        getShops().then(
            list
                .initLoad()
                .then(props.navigation.replace('main'))
                .catch((err) => {
                    console.log(err.message)
                })
        )
    }, [])

    return (
        <>
            <ActivityIndicator animating size="large" />
            <Text style={styles.loadingtext} variant="labelLarge">
                Loading...
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    loadingtext: {
        textAlign: 'center',
        margin: 20,
    },
})

export default LoadScreen
