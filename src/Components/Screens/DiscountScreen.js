import { IconButton } from 'react-native-paper'

import TopNavBar from '../Navigation/TopNavBar'
import UnitPriceDiscount from '../UI/Discounts/UnitPriceDiscount'

const DiscountScreen = ({ navigation }) => {
    return (
        <>
            <TopNavBar
                navigation={navigation}
                title={
                    <IconButton
                        icon="home"
                        size={40}
                        onPress={() => {
                            navigation.navigate('main')
                        }}
                    />
                }
            />
            <UnitPriceDiscount />
        </>
    )
}

export default DiscountScreen
