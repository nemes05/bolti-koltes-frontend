import { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, TextInput, useTheme, Text, Button, Portal } from 'react-native-paper'

import ApiContext from '../../../Contexts/api/api-context'
import ErrorModal from '../../UI/ErrorModal'
import LoadIndicator from '../../UI/LoadIndicator'

/**
 * The screen for user register handling.
 * @param {object} navigation    The navigation object that contains the functions for navigating. (passed down automatically)
 */
const RegistrationScreen = ({ navigation }) => {
    const api = useContext(ApiContext)
    const parent = navigation.getParent()
    const theme = useTheme()

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [passwordAgain, setPasswordAgain] = useState()
    const [error, setError] = useState({ err: false, msg: '' })
    const [submitting, setSubmitting] = useState(false)
    const [registered, setRegistered] = useState(false)

    const navigationHandler = () => {
        parent.navigate('main')
    }

    const validatePassword = (password, passwordAgain) => {
        return password === passwordAgain
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const submit = () => {
        setSubmitting(true)
        if (!validateEmail(email)) {
            setSubmitting(false)
            setError({ err: true, msg: 'Nem megfelelő az e-mail cím!' })
            return
        } else if (!validatePassword(password, passwordAgain)) {
            setSubmitting(false)
            setError({ err: true, msg: 'A két jelszó nem egyezik meg!' })
            return
        }

        api.register({ email, username, password })
            .then(() => {
                setSubmitting(false)
                setRegistered(true)
            })
            .catch((err) => {
                setSubmitting(false)
                setError({ err: true, msg: err.message })
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

            {submitting && (
                <View style={styles.actioncontainer}>
                    <LoadIndicator title="Regisztrációs adatok feldolgozása..." />
                </View>
            )}

            {!submitting && registered && (
                <View style={styles.cardcontainer}>
                    <Card style={{ ...styles.card, backgroundColor: theme.colors.secondaryContainer }}>
                        <Card.Content style={styles.cardcontent}>
                            <Text variant="headlineSmall" style={styles.cardtext}>
                                Sikeres regisztráció!
                            </Text>
                            <Card.Actions>
                                <View style={styles.actioncontainer}>
                                    <Button mode="contained" onPress={navigationHandler}>
                                        Tovább az appra
                                    </Button>
                                </View>
                            </Card.Actions>
                        </Card.Content>
                    </Card>
                </View>
            )}

            {!submitting && !registered && (
                <View style={styles.cardcontainer}>
                    <Card style={{ ...styles.card, backgroundColor: theme.colors.secondaryContainer }}>
                        <Card.Content style={styles.cardcontent}>
                            <Text variant="headlineSmall">Fiók létrehozása</Text>
                            <TextInput
                                mode="outlined"
                                label="E-mail"
                                autoComplete="email"
                                keyboardType="email-address"
                                onChangeText={(value) => setEmail(value)}
                            />
                            <TextInput
                                mode="outlined"
                                label="Felhasználónév"
                                onChangeText={(value) => setUsername(value)}
                            />
                            <TextInput
                                mode="outlined"
                                label="Jelszó"
                                secureTextEntry
                                onChangeText={(value) => setPassword(value)}
                            />
                            <TextInput
                                mode="outlined"
                                label="Jelszó mégegyszer"
                                secureTextEntry
                                onChangeText={(value) => setPasswordAgain(value)}
                            />
                            <Button style={styles.button} mode="contained" onPress={submit}>
                                Regisztrálok!
                            </Button>
                            <Button onPress={navigationHandler}>Ugrás az appba regisztráció nélkül!</Button>
                        </Card.Content>
                    </Card>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    modalcardcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalcard: {
        width: '90%',
        padding: 15,
    },
    cardtext: {
        textAlign: 'center',
        margin: 10,
    },
    actioncontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalbutton: {
        margin: 10,
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

export default RegistrationScreen
