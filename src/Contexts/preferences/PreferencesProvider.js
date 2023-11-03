import { useState } from 'react'

import PreferencesContext from './preferences-context'

const PreferencesProvider = (props) => {
    const [cardSize, setCardSize] = useState('big')

    const changeCardSizeHandler = (size) => {
        setCardSize(size)
    }

    const preferencesContext = {
        chageCardSize: changeCardSizeHandler,
        cardSize,
    }
    return <PreferencesContext.Provider value={preferencesContext}>{props.children}</PreferencesContext.Provider>
}
export default PreferencesProvider
