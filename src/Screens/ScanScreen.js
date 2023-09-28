import { BarCodeScanner } from 'expo-barcode-scanner'
import { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

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
                    height: 100,
                    padding: 20,
                }}
            >
                <Text>No access for camera</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
        </View>
        // {scanned && <Button onPress={() => setScanned(false)} />}
    )
}

export default ScanScreen
