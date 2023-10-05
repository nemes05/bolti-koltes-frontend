import React from 'react'

const ApiContext = React.createContext({
    getProduct: (barcode) => {},
})

export default ApiContext
