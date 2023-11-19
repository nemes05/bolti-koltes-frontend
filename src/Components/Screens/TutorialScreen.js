import { View, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import main from '../../../assets/main.jpg'

const TutorialScreen = ({ navigation }) => {
    const navigtionHandler = () => {
        navigation.navigate('usernavigation', { screen: 'register' })
    }

    const nextHandle = async () => {}

    return (
        <View style={styles.maincontainer}>
            <View style={styles.imagecontainer}>
                <Image resizeMode="center" resizeMethod="auto" style={styles.image} source={main} />
            </View>
            <View style={styles.buttoncontainer}>
                <Button mode="contained" style={{ width: 120 }}>
                    Előző
                </Button>
                <Button mode="contained" style={{ width: 120 }} onPress={nextHandle}>
                    Következő
                </Button>
            </View>
            <Button style={styles.skipbutton} onPress={navigtionHandler}>
                Átugrom
            </Button>
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
