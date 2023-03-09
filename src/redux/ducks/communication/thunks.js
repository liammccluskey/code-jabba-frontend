import moment from 'moment'

import * as CommunicationActions from './actions'
import { getMessages } from './selectors'

export const addMessage = (title, isError=false) => (dispatch, getState) => {
    const message = {
        title,
        isError,
        id: moment().format()
    }
    const messages = getMessages(getState())

    const isDuplicate = messages.find(({id}) => id === message.id)

    if (!isDuplicate) {
        const newMessages = [...messages, message]
        dispatch(CommunicationActions.setMessages(newMessages))
        setTimeout(() => {
            dispatch(CommunicationActions.deleteMessage(message.id))
        }, 6*1000);
    }
}

