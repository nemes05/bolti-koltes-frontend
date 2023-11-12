import { BarCodeScanner } from 'expo-barcode-scanner'
import { useState, useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text, Portal, Modal, Card } from 'react-native-paper'

import ApiContext from '../../Contexts/api/api-context'
import LoadIndicator from '../UI/LoadIndicator'

/**
 * The component that is responsible for the Barcode scanning.
 * @param {object}  navigation  The navigation object that contains the functions for navigating. (passed down automatically)
 */
const ScanScreen = ({ navigation }) => {
    const api = useContext(ApiContext)

    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [error, setError] = useState({ hasError: false, msg: '' })

    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status === 'granted')
    }

    useEffect(() => {
        getBarCodeScannerPermissions()
    }, [])

    const handleNavigation = () => {
        navigation.replace('main')
    }

    const dismissError = () => {
        setScanned(false)
        setError({ hasError: false, msg: '' })
    }

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true)
        api.getProduct(data)
            .then((details) => {
                navigation.replace('productnavigation', {
                    screen: 'productpage',
                    params: { details },
                })
            })
            .catch((err) => {
                setError({ hasError: true, msg: err.message })
            })
    }

    if (hasPermission === null) {
        return (
            <View style={styles.centeredcontainer}>
                <LoadIndicator title="Kamera hozzáférés kérése..." />
            </View>
        )
    }

    if (hasPermission === false) {
        return (
            <View style={styles.centeredcontainer}>
                <Text variant="labelMedium" style={styles.text}>
                    Nincs hozzáférés a kamerához
                </Text>
                <Button onPress={getBarCodeScannerPermissions} mode="contained">
                    Engedély adása
                </Button>
            </View>
        )
    }

    if (error.hasError) {
        return (
            <Portal>
                <Modal visible={error.hasError} dismissable={false}>
                    <View style={styles.centerview}>
                        <Card style={styles.modalcard}>
                            <Card.Content>
                                <View style={styles.centerview}>
                                    <Text variant="headlineSmall" style={styles.text}>
                                        {error.msg}
                                    </Text>
                                </View>
                            </Card.Content>
                            <Card.Actions>
                                <View style={styles.centeredcontainer}>
                                    <Button mode="outlined" style={styles.button} onPress={handleNavigation}>
                                        Vissza a főoldalra
                                    </Button>
                                    <Button mode="outlined" style={styles.button} onPress={dismissError}>
                                        Új beolvasás
                                    </Button>
                                </View>
                            </Card.Actions>
                        </Card>
                    </View>
                </Modal>
            </Portal>
        )
    }

    return (
        <>
            {!scanned && (
                <View style={styles.maincontainer}>
                    <View style={styles.barcodebox}>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={styles.barcodescanner}
                        />
                    </View>
                    <Button mode="contained" style={styles.button}>
                        Manuális bevitel
                    </Button>
                    <Button mode="contained" style={styles.button} onPress={handleNavigation}>
                        Mégse{' '}
                    </Button>
                </View>
            )}

            {scanned && (
                <View style={styles.centeredcontainer}>
                    <LoadIndicator title="Adatok lekérése..." />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        margin: 20,
    },
    modalcard: {
        width: '90%',
        padding: 15,
    },
    centerview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxHeight: '60%',
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
        marginBottom: 50,
    },
    barcodescanner: {
        height: 600,
        width: 400,
    },
    button: {
        width: '60%',
        margin: 7,
    },
})

export default ScanScreen
