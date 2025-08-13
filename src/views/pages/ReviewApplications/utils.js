import moment from 'moment'

const getMonthsBetween = (startMonth, startYear, endMonth, endYear) => {
    const startDate = moment(`${startYear}-${startMonth}`, 'YYYY-M')
    const endDate = moment(`${endYear}-${endMonth}`, 'YYYY-M')

    return endDate.diff(startDate, 'months')
}

export const getYOE = workExperiences => {
    let moe = 0

    workExperiences.forEach(({type, startMonth, startYear, endMonth, endYear}) => {
        if (type === 'full-time' || type === 'contract') {
            moe += getMonthsBetween(startMonth, startYear, endMonth, endYear)
        }
    })

    const yoe = moe / 12

    return Math.round(yoe * 10) / 10
}

export const getInternshipCount = workExperiences => {
    let count = 0

    workExperiences.forEach(({type}) => {
        if (type === 'internship') {
            count ++
        }
    })

    return count
}

// (hasItems: [string], allItems: [string]) => {included: [string], exlcuded: [string]}
export const getExcludedAndIncludedItems = (hasItems, allItems) => {
    const included = []
    const excluded = []

    const hasItemsDict = {}
    hasItems.forEach(item => {
        hasItemsDict[item] = 1
    })

    allItems.forEach( item => {
        if (item in hasItemsDict) included.push(item)
        else excluded.push(item)
    })

    included.sort((a, b) => a.localeCompare(b))
    excluded.sort((a, b) => a.localeCompare(b))

    return {included, excluded}
}