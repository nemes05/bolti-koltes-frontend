import React from 'react'

const ApiContext = React.createContext({
    getProduct: (barcode) => {},
    getShops: () => {},
    shops: [],
})

export default ApiContext
