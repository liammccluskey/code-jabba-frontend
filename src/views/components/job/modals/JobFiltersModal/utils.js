export const deepObjectEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true

    if (typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null) {
        return false
    }

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) return false

    for (let key of keys1) {
        if (!keys2.includes(key)) return false

        const val1 = obj1[key]
        const val2 = obj2[key]

        if (Array.isArray(val1) && Array.isArray(val2)) {
            if (val1.length !== val2.length) return false
            for (let i = 0; i < val1.length; i++) {
                if (!deepObjectEqual(val1[i], val2[i])) return false
            }
        } else if (typeof val1 === 'object' && typeof val2 === 'object') {
            if (!deepObjectEqual(val1, val2)) return false
        } else {
            if (val1 !== val2) return false
        }
    }

    return true
}

const removeMiscFilterKeys = (filter) => {
    const updatedFilter = {...filter}

    const excludedFilterKeys = ['_id', 'title', 'user', 'createdAt', 'updatedAt', '__v', 'asMongoFilter', 'sortBy']
    excludedFilterKeys.forEach(excludedKey => {
        delete updatedFilter[excludedKey]
    })

    return updatedFilter
}

export const getFiltersCount = filters => {
    const strippedCurrentFilter = removeMiscFilterKeys(filters, true)
    return Object.entries(strippedCurrentFilter)
        .filter(([key, value]) => {
            switch(key) {
                case 'datePosted':
                    return value !== 'anytime'
                case 'requiresClearance':
                    return value !== 'any'
                case 'settings':
                case 'locations':
                case 'employmentTypes':
                case 'positions':
                case 'experienceLevels':
                case 'experienceYears':
                case 'includedLanguages':
                case 'excludedLanguages':
                case 'includedSkills':
                case 'excludedSkills':
                case 'sponsorsVisa':
                    return value.length > 0
                case 'salaryMin':
                    return ![0, '0'].includes(value)
                default:
                    return false
            }
        }).length
}

export const getSelectedFilter = (currentFilter, filters) => {
    for (let i = 0; i < filters.length; i++) {
        const filter = filters[i]
        const strippedFilterA = removeMiscFilterKeys(filter)
        const strippedFilterB = removeMiscFilterKeys(currentFilter)

        const salaryMinA = Number(strippedFilterA.salaryMin)
        const salaryMinB = Number(strippedFilterB.salaryMin)

        const minSalariesMatch = salaryMinA == salaryMinB

        delete strippedFilterA.salaryMin
        delete strippedFilterB.salaryMin

        const objectsMatch = deepObjectEqual(strippedFilterA, strippedFilterB)

        if (minSalariesMatch && objectsMatch) return filter
    }

    return undefined
}

export const formatCurrency = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}