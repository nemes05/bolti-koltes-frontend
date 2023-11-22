import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ManualInputScreen from './Item/ManualInputScreen'
import ProductScreen from './Item/ProductScreen'

/**
 * The screen that responsible for navigation for product related screens.
 */
const ProductNavigationScreen = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="categoryinput" component={ManualInputScreen} />
            <Stack.Screen name="productpage" component={ProductScreen} />
        </Stack.Navigator>
    )
}

export default ProductNavigationScreen
