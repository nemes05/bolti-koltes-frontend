import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'

import LoadScreen from './src/Components/Screens/LoadScreen'
import MainScreen from './src/Components/Screens/MainScreen'
import ProductNavigationScreen from './src/Components/Screens/Product/ProductNavigationScreen'
import ScanScreen from './src/Components/Screens/ScanScreen'
import UserNavigationScreen from './src/Components/Screens/User/UserNavigationScreen'
import ApiProvider from './src/api/ApiProvider'
import CartProvider from './src/list-cart/CartProvider'
import ListProvider from './src/list-cart/ListProvider'

export default function App() {
    const Stack = createNativeStackNavigator()

    return (
        <ApiProvider>
            <ListProvider>
                <CartProvider>
                    <NavigationContainer>
                        <PaperProvider>
                            <GestureHandlerRootView style={{ flex: 1 }}>
                                <Stack.Navigator screenOptions={{ headerShown: false }}>
                                    <Stack.Screen name="load" component={LoadScreen} />
                                    <Stack.Screen name="main" component={MainScreen} />
                                    <Stack.Screen name="scan" component={ScanScreen} />
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
        </ApiProvider>
    )
}
