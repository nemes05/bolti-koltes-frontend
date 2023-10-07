import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

import IconButton from '../Navigation/IconButton'

const ListScreen = (props) => {
    const panGesture = Gesture.Pan()
        .activeOffsetX(-150)
        .onEnd(() => {
            props.listSwipeHandler('list')
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
                <Text>Lista</Text>
                <IconButton
                    icon="plus"
                    handlePress={() => {
                        props.handleAddButton()
                    }}
                />
            </View>
        </GestureDetector>
    )
}

export default ListScreen
