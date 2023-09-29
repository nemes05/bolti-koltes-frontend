import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AddButton = (props) => {
    const insets = useSafeAreaInsets()
    return (
        <FAB
            icon="plus"
            style={[styles.fab, { bottom: insets.bottom + 100 }]}
            onPress={() => props.navigateToScanScreen()}
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
