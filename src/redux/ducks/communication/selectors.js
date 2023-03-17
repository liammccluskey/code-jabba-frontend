import {createSelector} from '@reduxjs/toolkit'

export const getMessages = state => state.communication.messages
export const getNotifications = state => state.communication.notifications.data
export const getLoadingNotifications = state => state.communication.notifications.loading
export const getLoadingNotificationsFirstPage = state => state.communication.notifications.loadingFirstPage
export const getNotificationsPagesCount = state => state.communication.notifications.pagesCount
export const getCanLoadMoreNotifications = state => state.communication.notifications.canLoadMore
export const getNotificationsTotalCount = state => state.communication.notifications.totalCount