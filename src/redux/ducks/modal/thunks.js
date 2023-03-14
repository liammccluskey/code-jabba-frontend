import moment from 'moment'

import * as ModalActions from './actions'
import { getModalStack } from './selectors'

export const addModal = (modalType, modalProps) => (dispatch, getState) => {
    const modalID = moment().format()
    const modal = {
        type: modalType,
        props: {
            ...modalProps,
            modalID
        },
        id: modalID
    }

    const state = getState()
    const modalStack = getModalStack(state)

    const isDuplicate = !!modalStack.find(({id}) => id === modal.id)

    if (!isDuplicate) {
        dispatch(ModalActions.__addModal(modal))
    }
}