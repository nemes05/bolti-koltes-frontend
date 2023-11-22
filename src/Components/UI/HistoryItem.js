import { Card, Text } from 'react-native-paper'

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
