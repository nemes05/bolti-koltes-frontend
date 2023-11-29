/**
 * General description of the code:
 * The app uses React Native Paper with custom styling for the UI design, there are additional components in the UI folder, that can be reused.
 * For navigation it uses React Navigation, there are nested Screens inside the navigation folder, the folder structure follows the logic of the navigation. (The default header is not used)
 * For gesture handling there's the React Native Gesture Handler library.
 * The data is stored in different contexts and there's a separate context for the API.
 * The code structure follows the basic priciples of React Native.
 */

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'

import DiscountScreen from './src/Components/Screens/DiscountScreen'
import FavouritesScreen from './src/Components/Screens/FavouritesScreen'
import HistoryScreen from './src/Components/Screens/HistoryScreen'
import LoadScreen from './src/Components/Screens/LoadScreen'
import MainScreen from './src/Components/Screens/MainScreen'
import ProductNavigationScreen from './src/Components/Screens/Product/ProductNavigationScreen'
import ScanScreen from './src/Components/Screens/ScanScreen'
import SettingsScreen from './src/Components/Screens/SettingsScreen'
import TutorialScreen from './src/Components/Screens/TutorialScreen'
import UserNavigationScreen from './src/Components/Screens/User/UserNavigationScreen'
import ApiProvider from './src/Contexts/api/ApiProvider'
import CartProvider from './src/Contexts/cart/CartProvider'
import ListProvider from './src/Contexts/list/ListProvider'
import PreferencesProvider from './src/Contexts/preferences/PreferencesProvider'

export default function App() {
    const Stack = createNativeStackNavigator()

    return (
        <ApiProvider>
            <PreferencesProvider>
                <ListProvider>
                    <CartProvider>
                        <NavigationContainer>
                            <PaperProvider>
                                <GestureHandlerRootView style={{ flex: 1 }}>
                                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                                        <Stack.Screen name="load" component={LoadScreen} />
                                        <Stack.Screen name="tutorial" component={TutorialScreen} />
                                        <Stack.Screen name="main" component={MainScreen} />
                                        <Stack.Screen name="scan" component={ScanScreen} />
                                        <Stack.Screen name="settings" component={SettingsScreen} />
                                        <Stack.Screen name="discount" component={DiscountScreen} />
                                        <Stack.Screen name="favourites" component={FavouritesScreen} />
                                        <Stack.Screen name="history" component={HistoryScreen} />
                                        <Stack.Screen
                                            name="productnavigation"
                                            component={ProductNavigationScreen}
                                            initialParams={{ key: 'Stack' }}
                                        />
                                        <Stack.Screen name="usernavigation" component={UserNavigationScreen} />
                                    </Stack.Navigator>
                                </GestureHandlerRootView>
                            </PaperProvider>
                        </NavigationContainer>
                    </CartProvider>
                </ListProvider>
            </PreferencesProvider>
        </ApiProvider>
    )
}
