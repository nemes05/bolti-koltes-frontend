import { useState } from 'react'

import BottomNavBar from '../Navigation/BottomNavBar'
import TopNavBar from '../Navigation/TopNavBar'
import PriceContainer from '../UI/PriceContainer'

/**
 * The initial screen after load.
 * @param {object}  navigation  The navigation object that contains the functions for navigating. (passed down automatically)
 */
const MainScreen = ({ navigation }) => {
    const [screen, setScreen] = useState('list')

    return (
        <>
            <TopNavBar navigation={navigation} title={<PriceContainer screen={screen} />} />
            <BottomNavBar
                navigate={(screen) => navigation.navigate(screen)}
                onScreenChange={(screen) => {
                    setScreen(screen)
                }}
            />
        </>
    )
}

export default MainScreen
