import { useContext, useEffect } from 'react'
import { Text } from 'react-native-paper'

import ListContext from '../../list-cart/list-context'

const LoadScreen = (props) => {
    const list = useContext(ListContext)
    useEffect(() => {
        list.initLoad()
            .then(props.navigation.replace('main'))
            .catch((err) => {
                console.log(err.message)
            })
    }, [])

    return <Text>Loading...</Text>
}

export default LoadScreen
