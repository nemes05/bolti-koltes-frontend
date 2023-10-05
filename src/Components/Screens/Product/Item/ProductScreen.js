import { View, Text } from 'react-native'

import TopNavBar from '../../../Navigation/TopNavBar'

const ProductScreen = (props) => {
    const prodDetails = props.route.params.details
    return (
        <>
            <TopNavBar />
            <View
                style={{
                    alignItems: 'center',
                    height: '100%',
                    padding: 20,
                }}
            >
                <Text>{prodDetails.Barcode}</Text>
            </View>
        </>
    )
}

export default ProductScreen
