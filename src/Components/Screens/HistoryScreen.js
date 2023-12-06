import { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, IconButton, Portal, Button } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import PreferncesContext from '../../Contexts/preferences/preferences-context'
import TopNavBar from '../Navigation/TopNavBar'
import ErrorModal from '../UI/ErrorModal'
import HistoryItem from '../UI/HistoryItem'
import LoadIndicator from '../UI/LoadIndicator'
import HistoryProduct from '../UI/Product/History/HistoryProduct'
import SimplifiedHistoryProduct from '../UI/Product/History/SimplifiedHistoryProduct'

/**
 * The screen renders the users previous purchases
 * @param {object} navigation   The React Navigation object
 */
const HistoryScreen = ({ navigation }) => {
    const api = useContext(ApiContext)
    const preference = useContext(PreferncesContext)
    const [history, setHistory] = useState([])
    const [products, setProducts] = useState([])
    const [error, setError] = useState({ err: false, msg: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (api.userStatus) getPurchasesHandler()
    }, [])

    const getPurchasesHandler = async () => {
        setLoading(true)
        try {
            const data = await api.getHistory()
            setHistory(data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError({ err: true, msg: err.message })
        }
    }

    const historySelectHandler = async (PurchaseID) => {
        setLoading(true)
        try {
            const data = await api.getHistoryItems(PurchaseID)
            setProducts(data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError({ err: true, msg: err.message })
        }
    }

    const onBackHandler = () => {
        setProducts([])
    }

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

    if (loading) {
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
                <View style={{ marginTop: 50 }}>
                    <LoadIndicator title="Adatok betöltése folyamatban..." />
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

            <Portal>
                <ErrorModal
                    message={error.msg}
                    buttonText="Vissza"
                    visible={error.err}
                    dismissable
                    onDismiss={() => {
                        setError({ err: false, msg: '' })
                    }}
                    onButtonPress={() => {
                        setError({ err: false, msg: '' })
                    }}
                />
            </Portal>

            {products.length === 0 && (
                <FlatList
                    data={history}
                    renderItem={({ item }) => (
                        <HistoryItem
                            key={item.PurchaseID}
                            id={item.PurchaseID}
                            Date={item.Date}
                            Price={item.OverallPrice}
                            onSelect={historySelectHandler}
                        />
                    )}
                />
            )}

            {products.length !== 0 && preference.cardSize === 'small' && (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <SimplifiedHistoryProduct
                            Barcode={item.Barcode}
                            Price={item.CurrentPrice}
                            Name={item.Name}
                            onError={(message) => {
                                setError({ err: true, msg: message })
                            }}
                            navigation={navigation}
                        />
                    )}
                />
            )}

            {products.length !== 0 && preference.cardSize === 'big' && (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <HistoryProduct
                            Barcode={item.Barcode}
                            Price={item.CurrentPrice}
                            Name={item.Name}
                            ImageLink={item.ImageLink}
                            onError={(message) => {
                                setError({ err: true, msg: message })
                            }}
                            navigation={navigation}
                        />
                    )}
                />
            )}

            {products.length !== 0 && (
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button mode="contained" style={{ width: '50%', marginBottom: 10 }} onPress={onBackHandler}>
                        Vissza
                    </Button>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    messagecontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
})

export default HistoryScreen
