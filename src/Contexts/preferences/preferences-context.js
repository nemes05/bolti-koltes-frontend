import React from 'react'

const PreferencesContext = React.createContext({
    chageCardSize: changeCardSizeHandler,
    loadPreferences: loadPreferencesHandler,
    setShop: setShopHandler,
    prevShopID: Number,
    cardSize: String,
})

/**
 * The function changes the preferred card size.
 * @param {string} size The size of the card, could be "small" or "big"
 */
const changeCardSizeHandler = (size) => {}

/**
 * The function loads the saved preferences.
 */
const loadPreferencesHandler = () => {}

/**
 * Sets the previously selected shop when product was placed on the list.
 * @param {Number} ShopID   The ID of the shop which was selected
 */
const setShopHandler = (ShopID) => {}

export default PreferencesContext
