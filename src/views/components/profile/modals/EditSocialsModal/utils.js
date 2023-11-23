export const getFormDataModifed = (formData, mongoUser) => {
    return {
        linkedInURL: formData.linkedInURL !== mongoUser.linkedInURL,
        githubURL: formData.githubURL !== mongoUser.githubURL,
        leetcodeURL: formData.leetcodeURL !== mongoUser.leetcodeURL,
        portfolioURL: formData.portfolioURL !== mongoUser.portfolioURL,
    }
}