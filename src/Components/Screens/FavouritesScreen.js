import { useContext, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import PreferencesContext from '../../Contexts/preferences/preferences-context'
import TopNavBar from '../Navigation/TopNavBar'
import FavouriteProduct from '../UI/Product/FavouriteProduct'
import SimplifiedFavouriteProduct from '../UI/Product/SimplifiedFavouriteProduct'

/**
 * The screen that lists the favourite products (if user is logged in)
 * @param {object} navigation   The React Navigation object
 */
const FavouritesScreen = ({ navigation }) => {
    const preferences = useContext(PreferencesContext)
    const api = useContext(ApiContext)
    const [favourites, setFavourites] = useState([])

    const getFavourites = async () => {
        const favourites = await api.getFavourites()
        setFavourites(favourites)
    }

    useEffect(() => {
        if (api.userStatus) getFavourites()
    }, [])

    if (!api.userStatus) {
        return (
            <>
                <TopNavBar
                    navigation={navigation}
                    title={
                        <IconButton
                            icon="home"
                            size={40}
                            onPress={() => {
                                navigation.navigate('main')
                            }}
                        />
                    }
                />

                <View style={styles.messagecontainer}>
                    <Text variant="labelLarge">Jelentkezzen be ehhez a funkcióhoz!</Text>
                </View>
            </>
        )
    }

    return (
        <>
            <TopNavBar
                navigation={navigation}
                title={
                    <IconButton
                        icon="home"
                        size={40}
                        onPress={() => {
                            navigation.navigate('main')
                        }}
                    />
                }
            />
            <View style={styles.listcontainer}>
                {preferences.cardSize === 'small' && (
                    <FlatList
                        data={favourites}
                        renderItem={({ item }) => (
                            <SimplifiedFavouriteProduct
                                navigation={navigation}
                                product={item}
                                refresh={getFavourites}
                            />
                        )}
                    />
                )}
                {preferences.cardSize === 'big' && (
                    <FlatList
                        data={favourites}
                        renderItem={({ item }) => (
                            <FavouriteProduct navigation={navigation} product={item} refresh={getFavourites} />
                        )}
                    />
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    listcontainer: {
        height: '100%',
        marginTop: 5,
        marginBottom: 5,
    },
    card: {
        width: '90%',
        padding: 5,
        display: 'flex',
        alignItems: 'center',
    },
    messagecontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
})

export default FavouritesScreen
