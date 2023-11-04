import { StyleSheet } from 'react-native'
import { Text, Divider } from 'react-native-paper'

import Drawer from '../UI/Drawer/Drawer'
import DrawerItem from '../UI/Drawer/DrawerItem'

const MenuNavigation = ({ navigation, visible, hide, position }) => {
    return (
        <Drawer visible={visible} hide={hide} position={position}>
            <Text variant="headlineSmall">Menü</Text>
            <Divider style={styles.divired} bold />
            <DrawerItem
                title="Beállítások"
                icon="cog"
                onPress={() => {
                    hide()
                    navigation.navigate('settings')
                }}
            />
        </Drawer>
    )
}

const styles = StyleSheet.create({
    divired: {
        marginBottom: 5,
        marginTop: 5,
    },
})

export default MenuNavigation
