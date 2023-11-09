import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import MenuNavigation from './MenuNavigation'
import ProfileNavigation from './ProfileNavigation'

/**
 * The component which is rendered for most screens. Responsible for displaying data and for navigation.
 * @param {ReactComponent}  title       The parameter will be displayed in the middle of the navigation component
 * @param {object}          navigation  The navigation object that contains the functions for navigating (passed down to children)
 */
const TopNavBar = ({ title, navigation }) => {
    const [showUser, setShowUser] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <ProfileNavigation
                position="right"
                navigation={navigation}
                visible={showUser}
                hide={() => {
                    setShowUser(false)
                }}
            />

            <MenuNavigation
                position="left"
                navigation={navigation}
                visible={showMenu}
                hide={() => {
                    setShowMenu(false)
                }}
            />

            <Appbar.Header elevated style={styles.header}>
                <Appbar.Action
                    icon="menu"
                    size={35}
                    onPress={() => {
                        setShowUser(false)
                        setShowMenu(true)
                    }}
                />
                <Appbar.Content title={title} style={styles.title} />
                <Appbar.Action
                    icon="account-circle"
                    size={35}
                    onPress={() => {
                        setShowMenu(false)
                        setShowUser(true)
                    }}
                />
            </Appbar.Header>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
    },
    header: {
        marginBottom: 5,
        marginTop: 5,
    },
})

export default TopNavBar
