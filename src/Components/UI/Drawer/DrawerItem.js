import { Pressable, StyleSheet, View } from 'react-native'
import { useTheme, Text, IconButton } from 'react-native-paper'

/**
 * The component which can be used in the custom Drawer.
 * @param {string}      title   The name of the item.
 * @param {function}    onPress The function that gets called if the item has been pressed.
 * @param {string}      icon    The name of the icon which we want to display before the title. (optional)
 */
const DrawerItem = ({ title, onPress, icon }) => {
    const theme = useTheme()

    const pressablestyle = (pressed) => {
        return [{ backgroundColor: pressed ? theme.colors.secondaryContainer : undefined, borderRadius: 10 }]
    }

    return (
        <>
            <Pressable style={({ pressed }) => pressablestyle(pressed)} onPress={onPress}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {icon && <IconButton icon={icon} />}
                    <Text variant="titleMedium" style={styles.text}>
                        {title}
                    </Text>
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        margin: 10,
    },
})

export default DrawerItem
