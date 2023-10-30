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
