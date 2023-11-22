import { Card, Text } from 'react-native-paper'

const CategoryCard = ({ title, id, onSelect }) => {
    return (
        <Card
            style={{ margin: 5 }}
            onPress={() => {
                onSelect(id)
            }}
        >
            <Card.Content>
                <Text variant="labelLarge">{title}</Text>
            </Card.Content>
        </Card>
    )
}

export default CategoryCard
