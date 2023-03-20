export const NotificationChannels = {
    // channelID : {title, ?photoURL, ?icon}
    main: {
        id: 'main',
        title: process.env.REACT_APP_SITE_NAME,
        photoURL: 'https://lh3.googleusercontent.com/a/AGNmyxa3SUoNp3u6-ULZieQ8kCwUNcRdZxycQW-9FWq0=s96-c'
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