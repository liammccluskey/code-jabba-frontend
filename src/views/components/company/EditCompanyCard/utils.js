export const getFormData = company => ({
    name: company.name,
    headquartersAddress: company.headquartersAddress || '',
    description: company.description || '',
    linkedInURL: company.linkedInURL || '',
    glassDoorURL: company.glassDoorURL || '',
})

export const getFormDataModified = (formData, company) => {
    const companyAsFormData = getFormData(company)
    return {
        name: formData.name !== companyAsFormData.name,
        headquartersAddress: formData.headquartersAddress !== companyAsFormData.headquartersAddress,
        description: formData.description !== companyAsFormData.description,
        linkedInURL: formData.linkedInURL !== companyAsFormData.linkedInURL,
        glassDoorURL: formData.glassDoorURL !== companyAsFormData.glassDoorURL,
    }
}

export const isValidLinkedInCompanyUrl = url => {
    const regex = /^https?:\/\/(www\.)?linkedin\.com\/company\/[a-zA-Z0-9-_.]+\/?$/
    return regex.test(url)
}

export const isValidGlassdoorCompanyUrl = url => {
    try {
        const parsedUrl = new URL(url)
        return parsedUrl.hostname.toLowerCase().includes('glassdoor.com')
    } catch {
        return false
    }
}
