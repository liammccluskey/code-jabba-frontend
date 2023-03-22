export const NotificationChannels = {
    // channelID : {title, ?photoURL, ?icon}
    general: {
        id: 'general',
        title: process.env.REACT_APP_SITE_NAME,
        photoURL: '/images/logo.png'
    },
    announcements: {
        id: 'announcements',
        title: 'Announcements',
        icon: 'bi-megaphone'
    },
    social: {
        id: 'social',
        title: 'Social',
        icon: 'bi-people'
    }
}