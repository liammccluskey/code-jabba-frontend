import {createSelector} from '@reduxjs/toolkit'

export const getMessages = state => state.communication.messages

export const getNotifications = state => state.communication.notifications.payload.notifications
export const getLoadingNotifications = state => state.communication.notifications.loading
export const getLoadingNotificationsFirstPage = state => state.communication.notifications.loadingFirstPage
export const getNotificationsPagesCount = state => state.communication.notifications.payload.pagesCount
export const getCanLoadMoreNotifications = state => state.communication.notifications.payload.canLoadMore
export const getNotificationsTotalCount = state => state.communication.notifications.payload.totalCount

export const getChannelNotifications = state => state.communication.channelNotifications.payload.notifications
export const getLoadingChannelNotifications = state => state.communication.channelNotifications.loading
export const getLoadingChannelNotificationsFirstPage = state => state.communication.channelNotifications.loadingFirstPage
export const getChannelNotificationsPagesCount = state => state.communication.channelNotifications.payload.pagesCount
export const getCanLoadMoreChannelNotifications = state => state.communication.channelNotifications.payload.canLoadMore
export const getChannelNotificationsTotalCount = state => state.communication.channelNotifications.payload.totalCount