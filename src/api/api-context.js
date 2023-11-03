import React from 'react'

const ApiContext = React.createContext({
    getProduct: (barcode) => {},
    getShops: () => {},
    login: (data) => {},
    logout: () => {},
    register: (data) => {},
    userStatus: Boolean,
    shops: [],
})

export default ApiContext
