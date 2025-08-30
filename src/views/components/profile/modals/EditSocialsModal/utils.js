export const getFormDataModifed = (formData, mongoUser) => {
    return {
        linkedInURL: formData.linkedInURL !== mongoUser.linkedInURL,
        githubURL: formData.githubURL !== mongoUser.githubURL,
        leetcodeURL: formData.leetcodeURL !== mongoUser.leetcodeURL,
        portfolioURL: formData.portfolioURL !== mongoUser.portfolioURL,
    }
}

export const isValidLinkedInURL = url => {
    try {
        const parsed = new URL(url)

        return parsed.hostname === 'www.linkedin.com' || parsed.hostname === 'linkedin.com'
    } catch {
        return false
    }
}

export const isValidGitHubURL = url => {
    try {
        const parsed = new URL(url)
        return parsed.hostname === 'github.com' || parsed.hostname === 'www.github.com'
    } catch {
        return false
    }
}

export const isValidLeetCodeURL = url => {
    try {
        const parsed = new URL(url)
        return parsed.hostname === 'leetcode.com' || parsed.hostname === 'www.leetcode.com'
    } catch {
        return false
    }
}


