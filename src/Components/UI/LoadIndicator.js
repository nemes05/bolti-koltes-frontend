/**
 * A component for showing loading state
 * @param {string}  title   The text that should appear during the loading.
 */
import { StyleSheet } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

const LoadIndicator = ({ title }) => {
    return (
        <>
            <ActivityIndicator animating size="large" />
            <Text style={styles.loadingtext} variant="labelLarge">
                {title}
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    loadingtext: {
        textAlign: 'center',
        flexWrap: 'nowrap',
        margin: 20,
    },
})

export default LoadIndicator
