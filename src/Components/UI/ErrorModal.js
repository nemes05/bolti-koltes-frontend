import { View, StyleSheet } from 'react-native'
import { Card, Text, Button, Modal } from 'react-native-paper'

/**
 * Reusable component for showing errors for the user
 * @param {string}      message         The message that should appear in the modal.
 * @param {string}      buttonText      The string that contains what should appear on the button.
 * @param {boolean}     visible         The variable tells if the modal should be visible.
 * @param {boolean}     [dismisable]    The variable declares if the modal can be dismissed.
 * @param {function}    onDismiss       The function that should run when the modal is dismissed.
 * @param {function}    onButtonPress   The function that gets called when the button is pressed in the modal.
 */
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
