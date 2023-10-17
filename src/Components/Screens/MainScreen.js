import BottomNavBar from '../Navigation/BottomNavBar'
import TopNavBar from '../Navigation/TopNavBar'
import PriceContainer from '../UI/PriceContainer'

const MainScreen = (props) => {
    return (
        <>
            <TopNavBar title={<PriceContainer />} />
            <BottomNavBar navigateToScanScreen={() => props.navigation.navigate('scan')} />
        </>
    )
}

export default MainScreen
