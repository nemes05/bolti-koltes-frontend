import { Card, Text } from 'react-native-paper'

/**
 * The component that renders a card for a category
 * @param {string}      title       The title of the card
 * @param {number}      id          The id of the category
 * @param {function}    onSelect    The function that runs if the category is selected
 * @returns
 */
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
