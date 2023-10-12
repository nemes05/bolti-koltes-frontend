import { useContext, useEffect } from 'react'
import { Text } from 'react-native-paper'

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

    return <Text>Loading...</Text>
}

export default LoadScreen
