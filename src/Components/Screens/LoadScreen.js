import { useContext, useEffect } from 'react'

import ApiContext from '../../api/api-context'
import ListContext from '../../list-cart/list-context'
import LoadIndicator from '../UI/LoadIndicator'

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

    return <LoadIndicator title="Loading..." />
}

export default LoadScreen
