import React from 'react'

const CartContext = React.createContext({
    addProduct: addProductHandler,
    removeProduct: removeProductHandler,
    updateProduct: updateProductHandler,
    addDiscount: addDiscountHandler,
    removeDiscount: removeDiscountHandler,
    getCartPrice: getCartPriceHandler,
    getShopPrice: getShopPriceHandler,
    getProductPrice: getProductPriceHandler,
    emptyCart: emptyCartHandler,
    initCart: initCartHandler,
    cart: [],
})

/**
 * The function for adding products to the cart, also can handle updating.
 * (This function should be called if we don't know if the product is already in the cart.)
 * @param {object}  product A product object that should be added to the cart.
 * @param {string}  caller  The name of the screen that called the function.
 */
const addProductHandler = (product, caller) => {}

/**
 * The function for removing products from the cart.
 * @param {string}  barcode  The barcode of the product.
 */
const removeProductHandler = (barcode) => {}

/**
 * The function for updating products in the cart.
 * @param {object}  product     The barcode of the product.
 * @param {number}  newPieces   The new quantity of the product
 * @param {number}  newShopID   The ShopID of the shop from which we want to buy the product.
 * @param {boolean} InCart      The variable determines if the product should be in the cart or not.
 */
const updateProductHandler = (product, newPieces, newShopID, inCart) => {}

/**
 * The function adds the specified discount to the cart
 * @param {object} discount         The discount that should be added
 * @param {number} DiscountID       The id of the discount
 * @param {string} DiscountName     The name of the discount
 * @param {number} Price            The minimum price of the purchase (for the discount to activate)
 * @param {string} ImageLink        Link for the image to show for the user
 * @param {string} DiscountValue    The value of the discount (in FT)
 * @param {string} Percent          The value of the discount (in %)
 */
const addDiscountHandler = (discount) => {}

/**
 * The function that removes the specified discount
 * @param {object} discount         The discount that should be added
 * @param {number} DiscountID       The id of the discount
 * @param {string} DiscountName     The name of the discount
 * @param {number} Price            The minimum price of the purchase (for the discount to activate)
 * @param {string} ImageLink        Link for the image to show for the user
 * @param {string} DiscountValue    The value of the discount (in FT)
 * @param {string} Percent          The value of the discount (in %)
 */
const removeDiscountHandler = (discount) => {}

/**
 * The function returns the value of the cart.
 * @returns {number}    The value of the cart with all the products.
 */
const getCartPriceHandler = () => {}

/**
 * The function returns the price of the product in the specified shop.
 * @param {object} product  The product which we want to know the price.
 * @param {number} shopID   The ID of the shop from which we want to know the price.
 * @returns {number}        The price of the product.
 */
const getShopPriceHandler = (product, shopID) => {}

/**
 * The function thet returns the price of a product with the discounts already calculated
 * @param {object} product  The object that contains the product
 * @param {number} shopID   The id of the shop from where we want to get the price
 * @returns {number}    The calculated price
 */
const getProductPriceHandler = (product, shopID) => {}

/**
 * The function that removes all the products from the cart.
 */
const emptyCartHandler = async () => {}

/**
 * The function reads the cart items from Async Storage.
 * (Should be called when the app starts)
 */
const initCartHandler = async () => {}

export default CartContext
