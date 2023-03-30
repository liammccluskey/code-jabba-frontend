import * as SupportActions from './actions'
import {api} from '../../networking'

import { addMessage } from '../communication'

export const fetchSupportFAQs = () => async (dispatch) => {
    dispatch(SupportActions.setLoadingFAQs(true))

    try {
        const res = await api.get('/faq')

        dispatch(SupportActions.setFAQs(res.data))
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(SupportActions.setLoadingFAQs(false))
}

export const fetchSupportFAQ = faqID => async (dispatch) => {
    dispatch(SupportActions.setLoadingFAQ(true))
    dispatch(SupportActions.setFAQNotFound(false))

    try {
        const res = await api.get(`/faq/${faqID}`)

        dispatch(SupportActions.setFAQ(res.data))
    }  catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        dispatch(SupportActions.setFAQNotFound(true))
    }

    dispatch(SupportActions.setLoadingFAQ(false))
}