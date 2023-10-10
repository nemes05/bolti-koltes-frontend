import React, { useState } from 'react'

import ApiContext from './api-context'

const ApiProvider = (props) => {
    const [shopList, setShopList] = useState([])

    const getProductHandler = async (barcode) => {
        try {
            const res = await fetch(`http://192.168.136.79:3000/${barcode}`, {
                method: 'GET',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
            })
            if (!res.ok) {
                if (res.status === 400) {
                    throw new Error('Nem találtuk a terméket!')
                } else {
                    throw new Error('Valami hiba történt!')
                }
            }

            if (res.status === 200) {
                return res.json()
            }
        } catch (err) {
            throw err
        }
    }

    const getShopsHandler = async () => {
        try {
            const res = await fetch('http://192.168.136.79:3000/shops', {
                method: 'GET',
                cache: 'no-store',
                headers: { 'Content-Type': 'application/json' },
            })
            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }

            if (res.status === 200 || res.status === 304) {
                const resList = await res.json()
                setShopList(resList)
            }
        } catch (err) {
            throw err
        }
    }

    const apiContext = {
        getProduct: getProductHandler,
        getShops: getShopsHandler,
        shops: shopList,
    }

    return <ApiContext.Provider value={apiContext}>{props.children}</ApiContext.Provider>
}

export default ApiProvider
