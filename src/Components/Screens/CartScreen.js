import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

const CartScreen = (props) => {
    const panGesture = Gesture.Pan()
        .activeOffsetX(150)
        .onEnd(() => {
            props.cartSwipeHandler('cart')
        })

    return (
        <GestureDetector gesture={panGesture}>
            <View
                style={{
                    alignItems: 'center',
                    height: '100%',
                    padding: 20,
                }}
            >
                <Text>Cart</Text>
            </View>
        </GestureDetector>
    )
}

export default CartScreen
