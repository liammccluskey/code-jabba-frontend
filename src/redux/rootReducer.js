import {combineReducers} from 'redux'
import {themeReducer} from './ducks/theme'
import {userReducer} from './ducks/user'
import {communicationReducer} from './ducks/communication'
import { modalReducer } from './ducks/modal/reducers'

export const rootReducer = combineReducers({
    theme: themeReducer,
    user: userReducer,
    communication: communicationReducer,
    modal: modalReducer
})