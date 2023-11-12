import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

/**
 * A component for showing loading state
 * @param {string}  title   The text that should appear during the loading.
 */
const LoadIndicator = ({ title }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating size="large" />
            <Text style={styles.loadingtext} variant="labelLarge">
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    loadingtext: {
        textAlign: 'center',
        margin: 20,
    },
})

export default LoadIndicator
