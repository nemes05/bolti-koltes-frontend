import React from 'react'

const ListContext = React.createContext({
    addProduct: (product) => {},
    removeProduct: (barcode) => {},
    updateProduct: (product, newPieces, newShopID, inCart) => {},
    getListPrice: () => {},
    initList: async () => {},
    getShopPrice: (product, shopID) => {},
    list: [],
})

export default ListContext
