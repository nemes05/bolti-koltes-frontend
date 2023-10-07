import React from 'react'

import ApiContext from './api-context'

const ApiProvider = (props) => {
    let shopList = []

    const getProductHandler = async (barcode) => {
        try {
            const res = await fetch(`http://192.168.0.107:3000/${barcode}`, {
                method: 'GET',
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
            const res = await fetch('http://192.168.0.107:3000/getShops')
            if (!res.ok) {
                throw new Error('Valami hiba történt!')
            }

            if (res.status === 200) {
                shopList = await res.json()
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
