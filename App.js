import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'

import MainScreen from './src/Screens/MainScreen'

export default function App() {
    return (
        <PaperProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <MainScreen />
            </GestureHandlerRootView>
        </PaperProvider>
    )
}
