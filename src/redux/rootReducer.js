import {combineReducers} from 'redux'

import {themeReducer} from './theme'
import {userReducer} from './user'
import {communicationReducer} from './communication'
import { modalReducer } from './modal'
import { adminReducer } from './admin'
import { supportReducer } from './support'
import { companyReducer } from './company'
import { jobReducer } from './job'
import { dashboardReducer } from './dashboard'
import { applicationReducer } from './application'
import { rewardsReducer } from './rewards/reducers'

export const rootReducer = combineReducers({
    theme: themeReducer,
    user: userReducer,
    communication: communicationReducer,
    modal: modalReducer,
    admin: adminReducer,
    support: supportReducer,
    company: companyReducer,
    job: jobReducer,
    dashboard: dashboardReducer,
    application: applicationReducer,
    rewards: rewardsReducer,
})