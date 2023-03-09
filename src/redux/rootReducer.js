import {combineReducers} from 'redux'
import {themeReducer} from './ducks/theme'
import {userReducer} from './ducks/user'
import {communicationReducer} from './ducks/communication'

export const rootReducer = combineReducers({
    theme: themeReducer,
    user: userReducer,
    communication: communicationReducer
})