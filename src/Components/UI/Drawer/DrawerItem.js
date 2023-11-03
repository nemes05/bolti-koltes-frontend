import { Pressable, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

const DrawerItem = ({ title, onPress }) => {
    const theme = useTheme()

    const pressablestyle = (pressed) => {
        return [{ backgroundColor: pressed ? theme.colors.secondaryContainer : undefined, borderRadius: 10 }]
    }

    return (
        <Pressable style={({ pressed }) => pressablestyle(pressed)} onPress={onPress}>
            <Text variant="bodyLarge" style={styles.text}>
                {title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        margin: 10,
    },
})

export default DrawerItem
