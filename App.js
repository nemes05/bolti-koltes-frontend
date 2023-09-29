import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'

import MainScreen from './src/Screens/MainScreen'
import ScanScreen from './src/Screens/ScanScreen'

export default function App() {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <PaperProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="main" component={MainScreen} />
                        <Stack.Screen name="scan" component={ScanScreen} />
                    </Stack.Navigator>
                </GestureHandlerRootView>
            </PaperProvider>
        </NavigationContainer>
    )
}
