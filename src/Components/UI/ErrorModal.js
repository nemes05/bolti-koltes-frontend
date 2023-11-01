import { View, StyleSheet } from 'react-native'
import { Card, Text, Button, Modal } from 'react-native-paper'

const ErrorModal = ({ message, buttonText, visible, dismisable, onDismiss, onButtonPress }) => {
    return (
        <Modal
            visible={visible}
            dismissable={dismisable}
            onDismiss={() => {
                onDismiss()
            }}
        >
            <View style={styles.modalcardcontainer}>
                <Card style={styles.modalcard}>
                    <Card.Content>
                        <Text style={styles.cardtext} variant="headlineSmall">
                            {message}
                        </Text>
                    </Card.Content>
                    <Card.Actions>
                        <View style={styles.actioncontainer}>
                            <Button
                                style={styles.modalbutton}
                                mode="outlined"
                                onPress={() => {
                                    onButtonPress()
                                }}
                            >
                                {buttonText}
                            </Button>
                        </View>
                    </Card.Actions>
                </Card>
            </View>
        </Modal>
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
})

export default ErrorModal
