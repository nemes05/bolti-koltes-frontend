/**
 *Reusable drawer component for accessing side menu.
 *@param {string}           position    String value that can be 'left' or 'right', determines which side should the drawer appear
 *@param {boolean}          visible     Determines if the drawer should be visible (no default value)
 *@param {function}         hide        A function that could be called to hide the drawer
 *@param {ReactComponent}   children    The parameter for the children of the drawer
 */

import { TouchableOpacity, StyleSheet } from 'react-native'
import { Portal, Modal, Card, Text, IconButton, useTheme } from 'react-native-paper'

const Drawer = ({ position, visible, hide, children }) => {
    const theme = useTheme()

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => {
                    hide()
                }}
            >
                <TouchableOpacity
                    style={{ ...styles.container, alignItems: position === 'right' ? 'flex-end' : 'flex-start' }}
                    onPress={() => {
                        hide()
                    }}
                >
                    <Card style={styles.card} onPress={() => {}}>
                        <Card.Content style={styles.cardcontent}>{children}</Card.Content>
                        <Card.Actions style={{ height: '10%', backgroundColor: theme.colors.secondaryContainer }}>
                            <TouchableOpacity
                                onPress={() => {
                                    hide()
                                }}
                                style={styles.touchable}
                            >
                                {position === 'left' && (
                                    <>
                                        <Text variant="headlineSmall">Vissza</Text>
                                        <IconButton icon="chevron-right" size={30} />
                                    </>
                                )}
                                {position === 'right' && (
                                    <>
                                        <IconButton icon="chevron-left" size={30} />
                                        <Text variant="headlineSmall">Vissza</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    card: {
        height: '100%',
        width: '70%',
        borderRadius: 0,
    },
    cardcontent: {
        width: '100%',
        height: '90%',
    },
    touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
    },
})

export default Drawer
