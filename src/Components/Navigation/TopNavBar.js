/**
 * The component which is rendered for most screens. Responsible for displaying data and for navigation.
 * @param {ReactComponent}  title       The parameter will be displayed in the middle of the navigation component
 * @param {object}          navigation  The navigation object that contains the functions for navigating (passed down to children)
 */
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import ProfileNavigation from './ProfileNavigation'

const TopNavBar = ({ title, navigation }) => {
    const [showCard, setShowCard] = useState()

    return (
        <>
            <ProfileNavigation
                position="right"
                navigation={navigation}
                visible={showCard}
                hide={() => {
                    setShowCard(false)
                }}
            />

            <Appbar.Header elevated style={styles.header}>
                <Appbar.Action icon="menu" size={35} />
                <Appbar.Content title={title} style={styles.title} />
                <Appbar.Action
                    icon="account-circle"
                    size={35}
                    onPress={() => {
                        setShowCard(true)
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
