import React from 'react'

const ApiContext = React.createContext({
    getProduct: getProductHandler,
    getShops: getShopsHandler,
    getCategories: getCategoriesHandler,
    getProductsInCategory: getProductsInCategoryHandler,
    login: loginHandler,
    logout: logoutHandler,
    getList: getListHandler,
    saveItem: saveItemHandler,
    removeItem: removeItemHandler,
    updateItem: updateItemHandler,
    register: registerHandler,
    getFavourites: getFavouritesHandler,
    addFavourite: addFavouriteHandler,
    removeFavourite: removeFavouriteHandler,
    saveHistory: saveHistoryHandler,
    getHistory: getHistoryHandler,
    getHistoryItems: getHistoryItemsHandler,
    initUser: initUserHandler,
    userStatus: Boolean,
    shops: [],
})

/**
 * The function returns the details for the specified product
 * @param {int} barcode The barcode for the requested product.
 * @return {Promise}    Returns a promise that resolves to the Product object.
 */
const getProductHandler = (barcode) => {}

/**
 * The function sets the shopList that returns from the api.
 */
const getShopsHandler = () => {}

/**
 * The function requests the categories from the specified store.
 * @param {number} ShopID   The ID of the shop from which we want the categories
 * @returns {Promise}   The promise resolves to the array of categories
 */
const getCategoriesHandler = async (ShopID) => {}

/**
 * The function that requests all the pruducts in the specified subcategory
 * @param {number} SubCatID The ID that specifies the subcategory
 * @returns {Promise}   The promise resolves to the array of products
 */
const getProductsInCategoryHandler = async (SubCatID) => {}

/**
 * The function sends a request for login for the specified user.
 * @param {object}  loginData            Object that containes the email and the password.
 * @param {string}  loginData.email      The email of the user.
 * @param {string}  loginData.password   The password of the user.
 */
const loginHandler = (loginData) => {}

/**
 * The function sends a request for logout.
 */
const logoutHandler = () => {}

/**
 * The function sends a request for registration for the specified user.
 * @param {object}  registerData            Object that containes the email, username and password.
 * @param {string}  registerData.email      The email of the user.
 * @param {string}  registerData.username   The username of the user.
 * @param {string}  registerData.password   The password of the user.
 */
const registerHandler = (registerData) => {}

/**
 * The function the gets the users list from the database.
 * @returns {Array} The array of the product objects
 */
const getListHandler = async () => {}

/**
 * Saves an item to the remote storage.
 * @param {object} product  The product which should be added.
 */
const saveItemHandler = async (product) => {}

/**
 * Removes an item from the list in the remote storage.
 * @param {string} barcode
 */
const removeItemHandler = async (barcode) => {}

/**
 * The fuction gets user favourite items.
 * @returns {Promise}   The promise resolves to the list of items
 */
const getFavouritesHandler = () => {}

/**
 * The fuction adds a product to the favourites.
 * @param {string} barcode  The barcode of the product which we want to add to favourites.
 */
const addFavouriteHandler = async (barcode) => {}

/**
 * The function that removes a favourite item.
 * @param {string} barcode  The barcode that specifies the item.
 */
const removeFavouriteHandler = async (barcode) => {}

/**
 * The function that save the cart to history.
 * @param {Array} cart  The cart with the items we want to save to history.
 */
const saveHistoryHandler = async (cart) => {}

const getHistoryHandler = async () => {}

const getHistoryItemsHandler = async (PurchaseID) => {}

/**
 * Updates an item in the remote storage.
 * @param {objetc}  product  The product object with the new values.
 */
const updateItemHandler = async (product) => {}

/**
 * The function that reads the refreshToken from the store and sets it.
 */
const initUserHandler = async () => {}

export default ApiContext
