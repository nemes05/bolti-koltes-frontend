import { useContext } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

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
            <View style={styles.listcontainer}>
                <FlatList data={list.list} renderItem={({ item }) => <ListProduct product={item} />} />
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

const styles = StyleSheet.create({
    listcontainer: {
        height: '100%',
        marginTop: 5,
        marginBottom: 5,
    },
})

export default ListScreen
