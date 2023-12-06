import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import { useState } from 'react'
import { AppState } from 'react-native'
import { logger, fileAsyncTransport, consoleTransport } from 'react-native-logs'

import PreferencesContext from './preferences-context'

const config = {
    severity: 'debug',
    transport: [fileAsyncTransport, consoleTransport],
    transportOptions: {
        FS: FileSystem,
        fileName: `error.txt`,
        colors: {
            info: 'blueBright',
            warn: 'yellowBright',
            error: 'redBright',
        },
    },
}

/**
 * Context provider that declares the functions for maneging the cart items.
 * @param {ReactComponent}   children    The parameter for the children of the element.
 */
const PreferencesProvider = ({ children }) => {
    const [cardSize, setCardSize] = useState('big')
    const [shopID, setShopID] = useState(undefined)
    const log = logger.createLogger(config)

    AppState.addEventListener('change', (state) => {
        if (state === 'background') {
            savePreferencesHandler().catch((err) => {
                log.error(err.message)
            })
        }
    })

    /**
     * The function changes the preferred card size.
     * @param {string} size The size of the card, could be "small" or "big"
     */
    const changeCardSizeHandler = (size) => {
        setCardSize(size)
    }

    /**
     * The function loads the saved preferences.
     */
    const loadPreferencesHandler = async () => {
        const preferences = JSON.parse(await AsyncStorage.getItem('@preferences'))
        const firstTimeUser = JSON.parse(await AsyncStorage.getItem('@firstuser'))
        if (preferences && preferences.cardSize) setCardSize(preferences.cardSize)
        if (firstTimeUser === null) {
            AsyncStorage.setItem('@firstuser', 'false')
        }
        return firstTimeUser === null
    }

    /**
     * The function saves the set preferences to Async Storage.
     */
    const savePreferencesHandler = async () => {
        await AsyncStorage.setItem('@preferences', JSON.stringify({ cardSize }))
    }

    /**
     * Sets the previously selected shop when product was placed on the list.
     * @param {Number} ShopID   The ID of the shop which was selected
     */
    const setShopHandler = (ShopID) => {
        setShopID(ShopID)
    }

    const preferencesContext = {
        chageCardSize: changeCardSizeHandler,
        loadPreferences: loadPreferencesHandler,
        setShop: setShopHandler,
        prevShopID: shopID,
        cardSize,
    }
    return <PreferencesContext.Provider value={preferencesContext}>{children}</PreferencesContext.Provider>
}
export default PreferencesProvider
