import { useContext, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { IconButton } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import TopNavBar from '../Navigation/TopNavBar'
import CategoryCard from '../UI/CategoryCard'
import CartDiscount from '../UI/Discounts/CartDiscount'
import CartDiscountFt from '../UI/Discounts/CartDiscountFt'
import UnitPriceDiscount from '../UI/Discounts/UnitPriceDiscount'
import ErrorModal from '../UI/ErrorModal'

const DiscountScreen = ({ navigation }) => {
    const api = useContext(ApiContext)

    const [discounts, setDiscounts] = useState([])
    const [discountID, setDiscountID] = useState(undefined)
    const [error, setError] = useState({ err: false, msg: '' })

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        try {
            const data = await api.getDiscounts()
            setDiscounts(data)
        } catch (err) {
            setError({ err: true, msg: err.message })
        }
    }

    const discountSelectHandler = (DiscountID) => {
        setDiscountID(DiscountID)
    }

    const backButtonHandler = () => {
        setDiscountID(undefined)
    }

    if (error.err) {
        return (
            <ErrorModal
                message={error.message}
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
        )
    }

    if (discountID !== undefined) {
        const index = discounts.findIndex((item) => item.DiscountID === discountID)
        switch (discountID) {
            case 1: {
                return (
                    <UnitPriceDiscount
                        navigation={navigation}
                        onBackPress={backButtonHandler}
                        discount={discounts[index]}
                    />
                )
            }
            case 2: {
                return (
                    <CartDiscount navigation={navigation} onBackPress={backButtonHandler} discount={discounts[index]} />
                )
            }
            case 3: {
                return (
                    <CartDiscountFt
                        navigation={navigation}
                        onBackPress={backButtonHandler}
                        discount={discounts[index]}
                    />
                )
            }
        }
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

            <FlatList
                data={discounts}
                renderItem={({ item }) => (
                    <CategoryCard title={item.DiscountName} id={item.DiscountID} onSelect={discountSelectHandler} />
                )}
            />
        </>
    )
}

export default DiscountScreen