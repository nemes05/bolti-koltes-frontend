import { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const TutorialScreen = ({ navigation }) => {
    const [imageIndex, setImageIndex] = useState(0)
    const images = [
        require('../../../assets/main.jpg'),
        require('../../../assets/scan.jpg'),
        require('../../../assets/details.jpg'),
        require('../../../assets/changes.jpg'),
    ]

    const navigtionHandler = () => {
        navigation.navigate('usernavigation', { screen: 'register' })
    }

    const nextHandle = async () => {
        setImageIndex((prev) => prev + 1)
    }

    const previousHandle = async () => {
        setImageIndex((prev) => prev - 1)
    }

    return (
        <View style={styles.maincontainer}>
            <View style={styles.imagecontainer}>
                <Image resizeMode="center" resizeMethod="auto" style={styles.image} source={images[imageIndex]} />
            </View>
            <View style={styles.buttoncontainer}>
                <View>
                    {imageIndex !== 0 && (
                        <Button mode="contained" style={{ width: 120 }} onPress={previousHandle}>
                            Előző
                        </Button>
                    )}
                </View>
                <View>
                    {imageIndex !== 3 && (
                        <Button mode="contained" style={{ width: 120 }} onPress={nextHandle}>
                            Következő
                        </Button>
                    )}
                </View>
            </View>
            <View style={styles.buttoncontainer}>
                <View>{imageIndex === 3 && <Button onPress={navigtionHandler}>Regisztráció</Button>}</View>
                <View>
                    <Button onPress={navigtionHandler}>Átugrom</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: 30,
    },
    imagecontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: '70%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    buttoncontainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },
    skipbutton: {
        alignSelf: 'flex-end',
        marginRight: 20,
    },
})

export default TutorialScreen
