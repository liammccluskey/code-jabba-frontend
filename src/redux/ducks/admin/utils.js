export const getAdminRequestConfig = mongoUser => {
    const {adminKey, superAdminKey} = mongoUser

    return {
        headers: {
            admin_key: adminKey,
            super_admin_key: superAdminKey
        }
    }
}