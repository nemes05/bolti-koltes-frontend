import React from 'react'

const ApiContext = React.createContext({
    getProduct: getProductHandler,
    getShops: getShopsHandler,
    login: loginHandler,
    logout: logoutHandler,
    register: registerHandler,
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

export default ApiContext
