import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

const TopNavBar = ({ title }) => {
    return (
        <Appbar.Header elevated style={styles.header}>
            <Appbar.Action icon="menu" size={35} />
            <Appbar.Content title={title} style={styles.title} />
            <Appbar.Action icon="account-circle" size={35} />
        </Appbar.Header>
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
