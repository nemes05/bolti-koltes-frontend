import { Card, Text } from 'react-native-paper'

/**
 * The component that renders an item on the HistoryScreen
 * @param {string}      Date        The date of the purchase
 * @param {number}      Price       The complete price of the purchase
 * @param {number}      id          The id of the purchase
 * @param {function}    onSelect    The function that runs on history selection
 */
const HistoryItem = ({ Date, Price, id, onSelect }) => {
    return (
        <Card
            style={{ margin: 5 }}
            onPress={() => {
                onSelect(id)
            }}
        >
            <Card.Content
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Text variant="labelLarge" numberOfLines={1} style={{ flex: 1 }}>
                    Dátum: {Date}
                </Text>
                <Text variant="labelLarge">Összeg: {Price} Ft</Text>
            </Card.Content>
        </Card>
    )
}

export default HistoryItem
