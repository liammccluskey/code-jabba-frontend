export const removeMiscFilterKeys = filter => {
    const updatedFilter = {...filter}

    const excludedFilterKeys = ['_id', 'title', 'user', 'createdAt', 'updatedAt', '__v', 'asMongoFilter', 'sortBy']
    excludedFilterKeys.forEach(excludedKey => {
        delete updatedFilter[excludedKey]
    })

    return updatedFilter
}