import AddButton from '../Navigation/AddButton'
import BottomNavBar from '../Navigation/BottomNavBar'
import TopNavBar from '../Navigation/TopNavBar'

const MainScreen = (props) => {
    return (
        <>
            <TopNavBar />
            <BottomNavBar />
            <AddButton
                navigateToScanScreen={() => props.navigation.navigate('scan')}
            />
        </>
    )
}

export default MainScreen
