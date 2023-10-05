import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ManualInputScreen from './Item/ManualInputScreen'
import ProductScreen from './Item/ProductScreen'

const ProductNavigationScreen = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="manualbarcodeinput"
                component={ManualInputScreen}
            />
            <Stack.Screen name="productpage" component={ProductScreen} />
        </Stack.Navigator>
    )
}

export default ProductNavigationScreen
