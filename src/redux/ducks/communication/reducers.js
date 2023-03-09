import {CommunicationActionTypes as Types} from './types'

const CommunicationState = {
    messages: [], // [{title, isError, id}]
}

export const communicationReducer = (state = CommunicationState, action) => {
    switch (action.type) {
        case Types.DELETE_MESSAGE:
            const messageID = action.value
            return {
                ...state,
                messages: state.messages.filter(({id}) => id !== messageID)
            }
        case Types.SET_MESSAGES:
            const messages = action.value
            return {
                ...state,
                messages
            }
        default:
            return state
    }
}
