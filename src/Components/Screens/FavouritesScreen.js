import { useContext, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import PreferencesContext from '../../Contexts/preferences/preferences-context'
import TopNavBar from '../Navigation/TopNavBar'
import FavouriteProduct from '../UI/Product/FavouriteProduct'
import SimplifiedFavouriteProduct from '../UI/Product/SimplifiedFavouriteProduct'

const FavouritesScreen = ({ navigation }) => {
    const preferences = useContext(PreferencesContext)
    const api = useContext(ApiContext)
    const [favourites, setFavourites] = useState([])

    const getFavourites = async () => {
        const favourites = await api.getFavourites()
        setFavourites(favourites)
    }

    useEffect(() => {
        getFavourites()
    }, [])

    useEffect(() => {
        console.log(favourites)
    }, [favourites])

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
            <View style={styles.cartcontainer}>
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
    cartcontainer: {
        height: '100%',
        marginTop: 5,
        marginBottom: 5,
    },
    cardcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        padding: 5,
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
    actionscontainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        width: '70%',
        margin: 5,
    },
})

export default FavouritesScreen
