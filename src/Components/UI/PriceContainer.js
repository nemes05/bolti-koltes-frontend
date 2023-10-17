import { useContext } from 'react'
import { Text, useTheme } from 'react-native-paper'

import ListContext from '../../list-cart/list-context'

const PriceContainer = () => {
    const list = useContext(ListContext)
    const theme = useTheme()

    return (
        <Text
            style={{ backgroundColor: theme.colors.secondaryContainer, padding: 10, borderRadius: 10 }}
            variant="headlineMedium"
        >
            {list.getContentPrice().toLocaleString()} Ft
        </Text>
    )
}

export default PriceContainer
