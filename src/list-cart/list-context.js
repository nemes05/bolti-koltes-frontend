import React from 'react'

const ListContext = React.createContext({
    addProduct: (product) => {},
    getContentPrice: () => {},
    initLoad: async () => {},
    list: [],
})

export default ListContext
