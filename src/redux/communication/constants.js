export const NotificationChannels = {
    // channelID : {title, ?photoURL, ?icon}
    general: {
        id: 'general',
        title: process.env.REACT_APP_SITE_NAME,
        photoURL: '/images/logo.png'
    },
    social: {
        id: 'social',
        title: 'Social',
        icon: 'bi-people'
    },
    jobUpdates: {
        id: 'jobUpdates',
        title: 'Job updates',
        icon: 'bi-briefcase',
    }
}