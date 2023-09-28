import { BarCodeScanner } from 'expo-barcode-scanner'
import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }
        getBarCodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        console.log(
            `Bar code with type ${type} and data ${data} has been scanned!`
        )
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
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button
                    icon="camera"
                    mode="contained"
                    onPress={() => setScanned(false)}
                >
                    Scan again
                </Button>
            )}
        </>
    )
}

export default ScanScreen
