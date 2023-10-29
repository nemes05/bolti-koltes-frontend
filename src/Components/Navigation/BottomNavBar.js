import { useEffect, useState } from 'react'
import { BottomNavigation } from 'react-native-paper'

import CartScreen from '../Screens/CartScreen'
import ListScreen from '../Screens/ListScreen'

const BottomNavBar = ({ navigateToScanScreen, onScreenChange }) => {
    const [index, setIndex] = useState(0)

    const swipeHandler = (screen) => {
        if (screen === 'cart') {
            setIndex(0)
        } else if (screen === 'list') {
            setIndex(1)
        }
    }

    useEffect(() => {
        if (index === 0) {
            onScreenChange('list')
        } else {
            onScreenChange('cart')
        }
    }, [index])

    const [routes] = useState([
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

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'list':
                return (
                    <ListScreen
                        listSwipeHandler={(screen) => {
                            swipeHandler(screen)
                        }}
                        handleAddButton={() => {
                            navigateToScanScreen()
                        }}
                        jumpTo={jumpTo}
                    />
                )
            case 'cart':
                return (
                    <CartScreen
                        cartSwipeHandler={(screen) => {
                            swipeHandler(screen)
                        }}
                        jumpTo={jumpTo}
                    />
                )
        }
    }

    return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />
}

export default BottomNavBar
