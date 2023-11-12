import { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, TextInput, useTheme, Text, Button, Portal } from 'react-native-paper'

import ApiContext from '../../../Contexts/api/api-context'
import ErrorModal from '../../UI/ErrorModal'
import LoadIndicator from '../../UI/LoadIndicator'

/**
 * The screen for user login handling.
 * @param {object} navigation    The navigation object that contains the functions for navigating. (passed down automatically)
 */
const LoginScreen = ({ navigation }) => {
    const api = useContext(ApiContext)
    const parent = navigation.getParent()
    const theme = useTheme()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState({ err: false, msg: '' })
    const [authenticate, setAuthenticate] = useState(false)

    const navigationHandler = () => {
        parent.navigate('main')
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const submit = () => {
        setAuthenticate(true)

        if (!validateEmail(email)) {
            setAuthenticate(false)
            setError({ err: true, msg: 'Nem megfelelő az e-mail cím!' })
            return
        }

        api.login({ email, password })
            .then(() => {
                parent.navigate('main')
            })
            .catch((err) => {
                setError({ err: true, msg: err.message })
                setAuthenticate(false)
            })
    }

    return (
        <>
            <Portal>
                <ErrorModal
                    message={error.msg}
                    buttonText="Vissza"
                    visible={error.err}
                    onDismiss={() => {
                        setError({ err: false, msg: '' })
                    }}
                    onButtonPress={() => {
                        setError({ err: false, msg: '' })
                    }}
                />
            </Portal>

            {authenticate && (
                <View style={styles.actioncontainer}>
                    <LoadIndicator title="Adatok hitelesítése folyamatban..." />
                </View>
            )}

            {!authenticate && (
                <View style={styles.cardcontainer}>
                    <Card style={{ ...styles.card, backgroundColor: theme.colors.secondaryContainer }}>
                        <Card.Content style={styles.cardcontent}>
                            <Text variant="headlineSmall">Bejelentkezés</Text>
                            <TextInput
                                mode="outlined"
                                label="E-mail"
                                autoComplete="email"
                                keyboardType="email-address"
                                onChangeText={(value) => setEmail(value)}
                            />
                            <TextInput
                                mode="outlined"
                                label="Jelszó"
                                secureTextEntry
                                onChangeText={(value) => setPassword(value)}
                            />
                            <Button style={styles.button} mode="contained" onPress={submit}>
                                Bejelentkezek!
                            </Button>
                            <Button onPress={navigationHandler}>Átugrás</Button>
                        </Card.Content>
                    </Card>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    actioncontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    card: {
        width: '90%',
        padding: 10,
    },
    cardcontent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    button: {
        marginTop: 10,
    },
})

export default LoginScreen
