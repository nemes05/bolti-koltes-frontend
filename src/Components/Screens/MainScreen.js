import BottomNavBar from '../Navigation/BottomNavBar'
import TopNavBar from '../Navigation/TopNavBar'

const MainScreen = (props) => {
    return (
        <>
            <TopNavBar />
            <BottomNavBar navigateToScanScreen={() => props.navigation.navigate('scan')} />
            {/* <AddButton navigateToScanScreen={() => props.navigation.navigate('scan')} /> */}
        </>
    )
}

export default MainScreen
