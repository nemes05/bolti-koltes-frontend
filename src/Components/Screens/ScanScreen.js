import { BarCodeScanner } from 'expo-barcode-scanner'
import { useState, useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text, Portal, Modal, Card, ActivityIndicator } from 'react-native-paper'

import ApiContext from '../../api/api-context'
import TopNavBar from '../Navigation/TopNavBar'

const ScanScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [error, setError] = useState({ hasError: false, msg: '' })
    const api = useContext(ApiContext)

    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status === 'granted')
    }

    useEffect(() => {
        getBarCodeScannerPermissions()

        api.getShops().catch(() => {
            setError({ hasError: true, msg: 'Boltok inicializálása sikertelen' })
        })
    }, [])

    const handleNavigation = () => {
        props.navigation.replace('main')
    }

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true)
        api.getProduct(data)
            .then((details) => {
                props.navigation.replace('productnavigation', {
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
                <ActivityIndicator animating size="large" />
                <Text variant="labelMedium" style={styles.loadingtext}>
                    Kamera hozzáférés kérése...
                </Text>
            </View>
        )
    }

    if (hasPermission === false) {
        return (
            <View style={styles.centeredcontainer}>
                <ActivityIndicator animating size="large" />
                <Text variant="labelMedium" style={styles.loadingtext}>
                    Nincs hozzáférés a kamerához
                </Text>
                <Button
                    onPress={() => {
                        getBarCodeScannerPermissions()
                    }}
                >
                    Engedély adása
                </Button>
            </View>
        )
    }

    return (
        <>
            <Portal>
                <Modal visible={error.hasError} dismissable={false}>
                    <View style={styles.centerview}>
                        <Card style={styles.modalcard}>
                            <Card.Content>
                                <View style={styles.centerview}>
                                    <Text variant="headlineSmall" style={styles.modaltext}>
                                        {error.msg}
                                    </Text>
                                </View>
                            </Card.Content>
                            <Card.Actions>
                                <View style={styles.centeredcontainer}>
                                    <Button mode="outlined" style={styles.button} onPress={handleNavigation}>
                                        Vissza a főoldalra
                                    </Button>
                                    <Button
                                        mode="outlined"
                                        style={styles.button}
                                        onPress={() => {
                                            setScanned(false)
                                            setError({ hasError: false, msg: '' })
                                        }}
                                    >
                                        Új beolvasás
                                    </Button>
                                </View>
                            </Card.Actions>
                        </Card>
                    </View>
                </Modal>
            </Portal>

            {!scanned && (
                <>
                    <TopNavBar />
                    <View style={styles.container}>
                        <View style={styles.barcodebox}>
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={styles.barcodescanner}
                            />
                        </View>
                    </View>
                    <View style={styles.centerview}>
                        <Button mode="contained" style={styles.button}>
                            Manuális bevitel
                        </Button>
                        <Button mode="contained" style={styles.button} onPress={handleNavigation}>
                            Mégse{' '}
                        </Button>
                    </View>
                </>
            )}

            {scanned && (
                <View style={styles.centeredcontainer}>
                    <ActivityIndicator size="large" />
                    <Text variant="labelMedium" style={styles.loadingtext}>
                        Adatok lekérése...
                    </Text>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    centeredcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingtext: {
        margin: 20,
    },
    modalcard: {
        width: '90%',
        padding: 15,
    },
    modaltext: {
        textAlign: 'center',
        margin: 10,
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
        marginBottom: 20,
    },
    barcodescanner: {
        height: 600,
        width: 400,
    },
    button: {
        width: '75%',
        margin: 7,
    },
})

export default ScanScreen
