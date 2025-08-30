import { ModalActionTypes as Types } from './types'

export const __addModal = modal => ({
    type: Types.ADD_MODAL,
    value: modal
})

export const removeModal = modalID => ({
    type: Types.REMOVE_MODAL,
    modalID: modalID || 'null'
})

export const closeAllModals = () => ({
    type: Types.CLOSE_ALL_MODALS,
})