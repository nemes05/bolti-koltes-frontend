import { Pressable, StyleSheet, View } from 'react-native'
import { useTheme, Text, IconButton } from 'react-native-paper'

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
