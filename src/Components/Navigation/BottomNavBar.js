import * as React from 'react'
import { BottomNavigation } from 'react-native-paper'

import CartScreen from '../Screens/CartScreen'
import ListScreen from '../Screens/ListScreen'

const BottomNavBar = () => {
    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        {
            key: 'list',
            title: 'Lists',
            focusedIcon: 'format-list-bulleted',
            unfocusedIcon: 'format-list-bulleted',
        },
        {
            key: 'cart',
            title: 'Cart',
            focusedIcon: 'cart-outline',
            unfocusedIcon: 'cart-outline',
        },
    ])

    const renderScene = BottomNavigation.SceneMap({
        list: ListScreen,
        cart: CartScreen,
    })

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

export default BottomNavBar
