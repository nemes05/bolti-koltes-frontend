import React from 'react'

const PreferencesContext = React.createContext({
    chageCardSize: (size) => {},
    loadPreferences: () => {},
    cardSize: String,
})

export default PreferencesContext
