import React from 'react'

const PreferencesContext = React.createContext({
    chageCardSize: changeCardSizeHandler,
    loadPreferences: loadPreferencesHandler,
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

export default PreferencesContext
