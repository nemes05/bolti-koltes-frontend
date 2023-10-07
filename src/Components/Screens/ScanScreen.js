import { BarCodeScanner } from 'expo-barcode-scanner'
import { useState, useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text, Portal, Modal, Card } from 'react-native-paper'

import ApiContext from '../../api/api-context'
import TopNavBar from '../Navigation/TopNavBar'

const ScanScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [error, setError] = useState({ hasError: false, msg: '' })
    const api = useContext(ApiContext)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }
        getBarCodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
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
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                    padding: 20,
                }}
            >
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }
    if (hasPermission === false) {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                    padding: 20,
                }}
            >
                <Text>No access for camera</Text>
            </View>
        )
    }

    return (
        <>
            <Portal>
                <Modal visible={error.hasError}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Card style={{ width: '75%' }}>
                            <Card.Content>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        variant="headlineSmall"
                                        style={{
                                            textAlign: 'center',
                                            margin: 10,
                                            padding: 10,
                                        }}
                                    >
                                        {error.msg}
                                    </Text>
                                </View>
                            </Card.Content>
                            <Card.Actions>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button
                                        mode="outlined"
                                        onPress={() => {
                                            props.navigation.replace('main')
                                        }}
                                    >
                                        Vissza a főoldalra
                                    </Button>
                                </View>
                            </Card.Actions>
                        </Card>
                    </View>
                </Modal>
            </Portal>
            <TopNavBar />
            <View style={styles.container}>
                <View style={styles.barcodebox}>
                    <BarCodeScanner
                        onBarCodeScanned={
                            scanned ? undefined : handleBarCodeScanned
                        }
                        style={{ height: 600, width: 400 }}
                    />
                </View>
                {scanned && (
                    <Button
                        mode="contained"
                        onPress={() => setScanned(false)}
                        style={{ width: 200 }}
                        uppercase
                    >
                        Scan again
                    </Button>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
})

export default ScanScreen