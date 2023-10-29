import { useState } from 'react'

import BottomNavBar from '../Navigation/BottomNavBar'
import TopNavBar from '../Navigation/TopNavBar'
import PriceContainer from '../UI/PriceContainer'

const MainScreen = (props) => {
    const [screen, setScreen] = useState('list')

    return (
        <>
            <TopNavBar title={<PriceContainer screen={screen} />} />
            <BottomNavBar
                navigateToScanScreen={() => props.navigation.navigate('scan')}
                onScreenChange={(screen) => {
                    setScreen(screen)
                }}
            />
        </>
    )
}

export default MainScreen
