import { PaperProvider } from 'react-native-paper'

import MainScreen from './src/Components/Screens/MainScreen'

export default function App() {
    return (
        <PaperProvider>
            <MainScreen />
        </PaperProvider>
    )
}
