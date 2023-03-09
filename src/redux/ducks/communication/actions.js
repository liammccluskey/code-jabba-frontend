import { CommunicationActionTypes as Types } from "./types"

export const deleteMessage = messageID => ({
    type: Types.DELETE_MESSAGE,
    value: messageID
})

export const setMessages = messages => ({
    type: Types.SET_MESSAGES,
    value: messages
})