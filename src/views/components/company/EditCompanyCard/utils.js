export const getFormData = company => ({
    name: company.name,
    headquartersAddress: company.headquartersAddress,
    description: company.description,
    linkedInURL: company.linkedInURL,
    glassDoorURL: company.glassDoorURL,
})

export const getFormDataModified = (formData, company) => ({
    name: formData.name !== company.name,
    headquartersAddress: formData.headquartersAddress !== company.headquartersAddress,
    description: formData.description !== company.description,
    linkedInURL: formData.linkedInURL !== company.linkedInURL,
    glassDoorURL: formData.glassDoorURL !== company.glassDoorURL,
})

export const isValidLinkedInCompanyUrl = url => {
    const regex = /^https?:\/\/(www\.)?linkedin\.com\/company\/[a-zA-Z0-9-_.]+\/?$/
    return regex.test(url)
}

export const isValidGlassdoorCompanyUrl = url => {
    const regex = /^https?:\/\/(www\.)?glassdoor\.com\/Overview\/[a-zA-Z0-9-_.]+(-EI_IE\d+\.0,.*_\.htm)?$/
    return regex.test(url)
}
