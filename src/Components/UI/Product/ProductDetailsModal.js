/**
 * Component for displaying the ProductDetails in other components.
 * @param {boolean}     visible The variable determines if the component should appear.
 * @param {function}    onDismiss The function which gets called when the component is dismissed. (passed down to child)
 * @param {string}      caller The variable tells from where the component was called. Could be 'list' or 'cart' (passed down to child)
 * @param {object}      product The product which should appear in the child. (passed down to child)
 */
import { Modal, Portal } from 'react-native-paper'

import ProductDetails from './ProductDetails'

const ProductDetailsModal = ({ visible, onDismiss, caller, product }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss}>
                <ProductDetails onDismiss={onDismiss} caller={caller} product={product} />
            </Modal>
        </Portal>
    )
}

export default ProductDetailsModal
