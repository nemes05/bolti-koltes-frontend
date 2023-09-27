import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BOTTOM_APPBAR_HEIGHT = 50

const BottomNavBar = () => {
    const bottom = useSafeAreaInsets()

    return (
        <Appbar
            style={[
                styles.bottom,
                {
                    height: BOTTOM_APPBAR_HEIGHT + bottom,
                },
            ]}
            safeAreaInsets={{ bottom }}
        >
            <Appbar.Action icon="format-list-bulleted" onPress={() => {}} />
            <Appbar.Action icon="cart-outline" onPress={() => {}} />
        </Appbar>
    )
}

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-evenly',
    },
})

export default BottomNavBar
