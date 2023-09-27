import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AddButton = () => {
    const insets = useSafeAreaInsets()
    return (
        <FAB
            icon="plus"
            style={[styles.fab, { bottom: insets.bottom + 60 }]}
            onPress={() => console.log('Add item')}
        />
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        borderRadius: 50,
    },
})

export default AddButton