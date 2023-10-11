import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'

import ListContext from './list-context'

const ListProvider = (props) => {
    const [list, setList] = useState([])

    const addProductHandler = (product) => {
        const newProd = list.find((listProduct) => listProduct.Barcode === product.Barcode)
        if (newProd !== undefined) {
            const newList = list.filter((element) => element.Barcode !== product.Barcode)
            const updatedProduct = { ...newProd, Price: product.Price, Pieces: product.Pieces + newProd.Pieces }
            setList([...newList, updatedProduct])
            updateItemHandler(updatedProduct)
        } else {
            setList((prevList) => [...prevList, product])
            saveItemHandler(product)
        }
    }

    const getContentPriceHandler = () => {
        let price = 0
        list.forEach((element) => (price += element.Price * element.Pieces))
        return price
    }

    const loadListHandler = async () => {
        //Reads localstorage
        const keys = await AsyncStorage.getAllKeys()
        const list = await AsyncStorage.multiGet(keys)
        const localList = []
        list.forEach((element) => {
            localList.push(JSON.parse(element[1]))
        })
        setList(localList)
    }

    const saveItemHandler = async (product) => {
        await AsyncStorage.setItem(product.Barcode, JSON.stringify(product))
    }

    const removeItemHandler = async (product) => {
        await AsyncStorage.removeItem(product.Barcode)
    }

    const updateItemHandler = async (product) => {
        await AsyncStorage.mergeItem(product.Barcode, JSON.stringify(product))
    }

    const listContext = {
        addProduct: addProductHandler,
        getContentPrice: getContentPriceHandler,
        initLoad: loadListHandler,
        list,
    }
    return <ListContext.Provider value={listContext}>{props.children}</ListContext.Provider>
}
export default ListProvider
