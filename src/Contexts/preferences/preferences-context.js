import React from 'react'

const PreferencesContext = React.createContext({
    chageCardSize: (size) => {},
    cardSize: String,
})

export default PreferencesContext
