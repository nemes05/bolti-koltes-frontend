import React from 'react'

const ListContext = React.createContext({
    addProduct: (product) => {},
    list: [],
})

export default ListContext
