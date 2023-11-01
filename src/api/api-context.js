import React from 'react'

const ApiContext = React.createContext({
    getProduct: (barcode) => {},
    getShops: () => {},
    login: (data) => {},
    register: (data) => {},
    shops: [],
})

export default ApiContext
