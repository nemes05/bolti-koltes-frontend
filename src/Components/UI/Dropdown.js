/**
 * Reusable dropdown component
 *@param {string}   placeholder     The initial text for the dropdown before an item is selected.
 *@param {Array}    data            An array which contains the elements that the dropdown should show.
 *@param {function} onSelect        A function that gets called if an item has been selected.
 *@param {number}   [defaultValue]  The default value that's selected by index.
 */

import { StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

const Dropdown = ({ placeholder, data, onSelect, defaultValue }) => {
    return (
        <SelectDropdown
            data={data}
            defaultButtonText={placeholder}
            defaultValueByIndex={defaultValue}
            onSelect={(item) => {
                onSelect(item)
            }}
            statusBarTranslucent
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
        />
    )
}

const styles = StyleSheet.create({
    dropdownBtnStyle: {
        height: 50,
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdownBtnTxtStyle: {
        color: '#444',
        textAlign: 'left',
    },
    dropdownDropdownStyle: {
        backgroundColor: '#EFEFEF',
    },
    dropdownRowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5',
    },
    dropdownRowTxtStyle: {
        color: '#444',
        textAlign: 'left',
    },
})

export default Dropdown
