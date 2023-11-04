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

const PreferencesProvider = (props) => {
    const [cardSize, setCardSize] = useState('big')
    const log = logger.createLogger(config)

    AppState.addEventListener('change', (state) => {
        if (state === 'background') {
            savePreferencesHandler().catch((err) => {
                log.error(err.message)
            })
        }
    })

    const changeCardSizeHandler = (size) => {
        setCardSize(size)
    }

    const loadPreferencesHandler = async () => {
        const preferences = JSON.parse(await AsyncStorage.getItem('@preferences'))
        const log = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'error.txt')
        console.log(log)
        if (preferences.cardSize) setCardSize(preferences.cardSize)
    }

    const savePreferencesHandler = async () => {
        await AsyncStorage.setItem('@preferences', JSON.stringify({ cardSize }))
    }

    const preferencesContext = {
        chageCardSize: changeCardSizeHandler,
        loadPreferences: loadPreferencesHandler,
        cardSize,
    }
    return <PreferencesContext.Provider value={preferencesContext}>{props.children}</PreferencesContext.Provider>
}
export default PreferencesProvider
