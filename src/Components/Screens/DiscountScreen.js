import { useContext, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { IconButton } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import TopNavBar from '../Navigation/TopNavBar'
import CategoryCard from '../UI/CategoryCard'
import CartDiscount from '../UI/Discounts/CartDiscount'
import UnitPriceDiscount from '../UI/Discounts/UnitPriceDiscount'

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

            {/* <UnitPriceDiscount /> */}
        </>
    )
}

export default DiscountScreen
