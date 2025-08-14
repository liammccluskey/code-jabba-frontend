export const getApplicationStatusPillColor = applicationStatus => {
    switch (applicationStatus) {
        case 'applied':
            return 'clear'
        case 'viewed':
            return 'blue'
        case 'accepted':
            return 'green'
        case 'rejected':
            return 'red'
        default:
            return 'yellow'
    }
}