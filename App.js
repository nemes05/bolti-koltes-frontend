import { PaperProvider } from 'react-native-paper'

import MainScreen from './src/Screens/MainScreen'
import ScanScreen from './src/Screens/ScanScreen'

export default function App() {
    return (
        <PaperProvider>
            <ScanScreen />
        </PaperProvider>
    )
}
