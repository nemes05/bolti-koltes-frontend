import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CustomIconButton = (props) => {
    const insets = useSafeAreaInsets()

    return (
        <FAB
            icon={props.icon}
            style={[styles.fab, { bottom: insets.bottom + 40 }]}
            onPress={() => {
                props.handlePress()
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
