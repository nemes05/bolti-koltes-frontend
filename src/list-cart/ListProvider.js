import { useState } from 'react'

import ListContext from './list-context'

const ListProvider = (props) => {
    const [list, setList] = useState([])

    const addProductHandler = (product) => {
        console.log(product.Name)
        setList((prevList) => [...prevList, product])
    }

    const listContext = {
        addProduct: addProductHandler,
        list,
    }
    return <ListContext.Provider value={listContext}>{props.children}</ListContext.Provider>
}
export default ListProvider
