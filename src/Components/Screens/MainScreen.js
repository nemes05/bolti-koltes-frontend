import { useState } from 'react'

import BottomNavBar from '../Navigation/BottomNavBar'
import TopNavBar from '../Navigation/TopNavBar'
import PriceContainer from '../UI/PriceContainer'

const MainScreen = (props) => {
    const [screen, setScreen] = useState('list')

    return (
        <>
            <TopNavBar navigation={props.navigation} title={<PriceContainer screen={screen} />} />
            <BottomNavBar
                navigate={(screen) => props.navigation.navigate(screen)}
                onScreenChange={(screen) => {
                    setScreen(screen)
                }}
            />
        </>
    )
}

export default MainScreen
