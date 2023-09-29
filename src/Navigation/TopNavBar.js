import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

const TopNavBar = (props) => {
    return (
        <Appbar.Header>
            <Appbar.Action icon="menu" />
            <Appbar.Content title={props.title} style={styles.title} />
            <Appbar.Action icon="account-circle" />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
    },
})

export default TopNavBar
