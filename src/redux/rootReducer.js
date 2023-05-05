import {combineReducers} from 'redux'
import {themeReducer} from './theme'
import {userReducer} from './user'
import {communicationReducer} from './communication'
import { modalReducer } from './modal/reducers'
import { adminReducer } from './admin/reducers'
import { supportReducer } from './support/reducers'

import { projectReducer } from './project/reducers'

export const rootReducer = combineReducers({
    theme: themeReducer,
    user: userReducer,
    communication: communicationReducer,
    modal: modalReducer,
    admin: adminReducer,
    support: supportReducer,

    project: projectReducer,
})