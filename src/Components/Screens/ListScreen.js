import { useContext } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'

import ListContext from '../../list-cart/list-context'
import IconButton from '../Navigation/IconButton'
import ListProduct from '../UI/ListProduct'

const ListScreen = (props) => {
    const panGesture = Gesture.Pan()
        .activeOffsetX(-150)
        .onEnd(() => {
            props.listSwipeHandler('list')
        })
    const list = useContext(ListContext)

    return (
        <GestureDetector gesture={panGesture}>
            <View
                style={{
                    alignItems: 'center',
                    height: '100%',
                    padding: 20,
                }}
            >
                <View>
                    {list.list.length !== 0 &&
                        list.list.map((product) => <ListProduct key={product.Barcode} product={product} />)}
                </View>
                {list.list.length === 0 && <Text> Nincs termék a listán</Text>}
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
