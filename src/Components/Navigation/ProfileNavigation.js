/**
 * Component that renders the content for the user drawer.
 * @param {object}      navigation  The object that contains the functions for the navigation
 * @param {boolean}     visible     The variable that determines if the drawer should be visible (passed down to the Drawer component)
 * @param {function}    hide        The function for hiding the drawer (passed down to the Drawer component)
 * @param {string}      position    The string determines where should the drawer appear (passed down to the Drawer component)
 */
import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Divider, Text } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import Drawer from '../UI/Drawer/Drawer'
import DrawerItem from '../UI/Drawer/DrawerItem'

const ProfileNavigation = ({ navigation, visible, hide, position }) => {
    const api = useContext(ApiContext)

    const pressableHandler = (screen) => {
        hide()
        navigation.navigate('usernavigation', { screen })
    }

    return (
        <Drawer visible={visible} position={position} hide={hide}>
            <Text variant="headlineSmall">Profil</Text>
            <Divider style={styles.divired} bold />

            {!api.userStatus && (
                <>
                    <DrawerItem
                        title="Bejelentkezés"
                        onPress={() => {
                            pressableHandler('login')
                        }}
                    />

                    <DrawerItem
                        title="Regisztráció"
                        onPress={() => {
                            pressableHandler('register')
                        }}
                    />
                </>
            )}

            {api.userStatus && <DrawerItem title="Kijelentkezés" onPress={api.logout} />}
        </Drawer>
    )
}

const styles = StyleSheet.create({
    divired: {
        marginBottom: 5,
        marginTop: 5,
    },
})

export default ProfileNavigation
