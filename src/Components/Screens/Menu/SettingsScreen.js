import { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Divider, IconButton, RadioButton, Text } from 'react-native-paper'

import PreferencesContext from '../../../Contexts/preferences/preferences-context'
import TopNavBar from '../../Navigation/TopNavBar'

/**
 * The screen where the user can change their settings.
 * @param {object}  navigation  The navigation object that contains the functions for navigating. (passed down automatically)
 */
const SettingsScreen = ({ navigation }) => {
    const preferences = useContext(PreferencesContext)
    const parentNavigation = navigation.getParent()

    return (
        <>
            <TopNavBar
                navigation={parentNavigation}
                title={
                    <IconButton
                        icon="home"
                        size={40}
                        onPress={() => {
                            parentNavigation.navigate('main')
                        }}
                    />
                }
            />

            <Card style={styles.card} mode="elevated">
                <Card.Content>
                    <Text variant="headlineMedium" style={{ textAlign: 'center' }}>
                        Beállítások
                    </Text>
                </Card.Content>
            </Card>

            <Card style={styles.card} mode="elevated">
                <Card.Content style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Text variant="titleLarge">Lista elemek</Text>
                    <Divider bold />
                    <RadioButton.Group
                        value={preferences.cardSize}
                        onValueChange={(value) => {
                            preferences.chageCardSize(value)
                        }}
                    >
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="small" />
                            <Text variant="titleMedium">Kis kártyák</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="big" />
                            <Text variant="titleMedium">Nagy kártyák</Text>
                        </View>
                    </RadioButton.Group>
                </Card.Content>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 3,
    },
})

export default SettingsScreen
