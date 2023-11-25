import React from 'react'

const ListContext = React.createContext({
    addProduct: addProductHandler,
    removeProduct: removeProductHandler,
    updateProduct: updateProductHandler,
    addDiscount: addDiscountHandler,
    getListPrice: getListPriceHandler,
    getShopPrice: getShopPriceHandler,
    initList: initListHandler,
    list: [],
})

/**
 * The function that adds the product to the cart.
 * @param {object} product  The project with the detailes which should be added
 */
const addProductHandler = (product) => {}

/**
 * The function that removes the specified product.
 * @param {string} barcode  The barcode of the product that should be removed.
 */
const removeProductHandler = (barcode) => {}

/**
 * The function updates the product with the specified detiles.
 * @param {object} product      The product which should be updated.
 * @param {number} newPieces    The new quantity of the product.
 * @param {number} newShopID    The ShopID from which the product will be bought.
 * @param {boolean} inCart      The variable indicates if the product is in the cart or not.
 */
const updateProductHandler = (product, newPieces, newShopID, inCart) => {}

/**
 * The function updates the product with the given discount
 * @param {string} barcode  The barcode of the product which should be updated
 * @param {object} discount The discount object with the details of the discount
 */
const addDiscountHandler = (barcode) => {}

/**
 * The function calculates the value of the list
 * @returns {number}    The value of the list with all the items.
 */
const getListPriceHandler = () => {}

/**
 * The function returns the price of the product in the specified shop.
 * @param {object} product
 * @param {number} shopID
 * @returns {number}    The price of the product in the specified shop.
 */
const getShopPriceHandler = (product, shopID) => {}

/**
 * The function loads the list.
 * (Should be called when app starts)
 */
const initListHandler = async () => {}

export default ListContext
