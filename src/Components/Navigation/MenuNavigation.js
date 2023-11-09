import { StyleSheet } from 'react-native'
import { Text, Divider } from 'react-native-paper'

import Drawer from '../UI/Drawer/Drawer'
import DrawerItem from '../UI/Drawer/DrawerItem'

/**
 * Component for the menu navigation drawer.
 * @param {object}      navigation  The object that contains the functions for the navigation
 * @param {boolean}     visible     The variable that determines if the drawer should be visible (passed down to the Drawer component)
 * @param {function}    hide        The function for hiding the drawer (passed down to the Drawer component)
 * @param {string}      position    The string determines where should the drawer appear (passed down to the Drawer component)
 */
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
