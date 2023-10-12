import React from 'react'

const ListContext = React.createContext({
    addProduct: (product) => {},
    removeProduct: (barcode) => {},
    updateProduct: (product, newPrice, newPieces, newShopID) => {},
    getContentPrice: () => {},
    initLoad: async () => {},
    list: [],
})

export default ListContext
