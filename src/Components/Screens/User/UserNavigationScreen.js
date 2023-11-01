import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from './LoginScreen'
import RegistrationScreen from './RegistrationScreen'

const UserNavigationScreen = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegistrationScreen} />
        </Stack.Navigator>
    )
}

export default UserNavigationScreen
