import {ModalActionTypes as Types} from './types'

const ModalState = {
    stack: [] // [{type, props, id}]
}

export const modalReducer = (state = ModalState, action) => {
    switch (action.type) {
        case Types.ADD_MODAL:
            return {
                ...state,
                stack: [
                    ...state.stack,
                    action.value
                ]
            }
        case Types.REMOVE_MODAL:
            return {
                ...state,
                stack: state.stack.filter(({id}) => id !== action.modalID)
            }
        default:
            return state
    }
}
