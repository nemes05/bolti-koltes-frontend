import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CustomIconButton = ({ icon, handlePress }) => {
    const insets = useSafeAreaInsets()

    return (
        <FAB
            icon={icon}
            style={[styles.fab, { bottom: insets.bottom + 40 }]}
            onPress={() => {
                handlePress()
            }}
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

export default CustomIconButton
