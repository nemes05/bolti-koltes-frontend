import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DiscountScreen from './DiscountScreen'
import FavouritesScreen from './FavouritesScreen'
import HistoryScreen from './HistoryScreen'
import SettingsScreen from './SettingsScreen'

const MenuNavigationScreen = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="favourite" component={FavouritesScreen} />
            <Stack.Screen name="discount" component={DiscountScreen} />
            <Stack.Screen name="history" component={HistoryScreen} />
            <Stack.Screen name="settings" component={SettingsScreen} />
        </Stack.Navigator>
    )
}

export default MenuNavigationScreen
