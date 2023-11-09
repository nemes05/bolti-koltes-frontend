import { useContext } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import ListContext from '../../Contexts/list/list-context'
import PreferencesContext from '../../Contexts/preferences/preferences-context'
import CustomIconButton from '../UI/CustomIconButton'
import ListProduct from '../UI/Product/ListProduct'
import SimplifiedListProduct from '../UI/Product/SimplifiedListProduct'

/**
 * The screen that renders the list items.
 * @param {function}    listSwipeHandler    The function that gets called if a swipe is detected on the screen.
 * @param {function}    handleAddButton     The function that gets called if the plus button is pressed on the screen.
 */
const ListScreen = ({ listSwipeHandler, handleAddButton }) => {
    const panGesture = Gesture.Pan()
        .activeOffsetX(-80)
        .onEnd(() => {
            listSwipeHandler('list')
        })

    const list = useContext(ListContext)
    const preferences = useContext(PreferencesContext)

    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.listcontainer}>
                {preferences.cardSize === 'small' && (
                    <FlatList data={list.list} renderItem={({ item }) => <SimplifiedListProduct product={item} />} />
                )}
                {preferences.cardSize === 'big' && (
                    <FlatList data={list.list} renderItem={({ item }) => <ListProduct product={item} />} />
                )}
                <CustomIconButton
                    icon="plus"
                    handlePress={() => {
                        handleAddButton()
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
