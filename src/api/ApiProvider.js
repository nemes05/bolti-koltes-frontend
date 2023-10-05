import React from 'react'

import ApiContext from './api-context'

const ApiProvider = (props) => {
    const getProductHandler = async (barcode) => {
        try {
            const res = await fetch(`http://192.168.0.102:3000/${barcode}`)
            if (!res.ok) {
                throw new Error('Something went wrong')
            }
            if (res.status === 200) {
                return res.json()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const apiContext = {
        getProduct: getProductHandler,
    }

    return (
        <ApiContext.Provider value={apiContext}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiProvider
