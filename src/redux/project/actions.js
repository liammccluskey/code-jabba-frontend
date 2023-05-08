import { ProjectActionTypes as Types } from "./types"

// Project Actions
export const setProject = project => ({
    type: Types.SET_PROJECT,
    value: project
})

export const setLoadingProject = loading => ({
    type: Types.SET_LOADING_PROJECT,
    value: loading
})

export const setProjectNotFound = notFound => ({
    type: Types.SET_PROJECT_NOT_FOUND,
    value: notFound
})

// Access Code Actions
export const setIsValidAccessCode = isValid => ({
    type: Types.SET_IS_VALID_ACCESS_CODE,
    value: isValid
})

// Admin Projects Actions
export const setAdminProjectsData = adminProjects => ({
    type: Types.SET_ADMIN_PROJECTS_DATA,
    value: adminProjects
})

export const addAdminProjectsData = adminProjects => ({
    type: Types.ADD_ADMIN_PROJECTS_DATA,
    value: adminProjects
})

export const setLoadingAdminProjects = loading => ({
    type: Types.SET_LOADING_ADMIN_PROJECTS,
    value: loading
})

export const setLoadingAdminProjectsFirstPage = loading => ({
    type: Types.SET_LOADING_ADMIN_PROJECTS_FIRST_PAGE,
    value: loading
})

export const __deleteAdminProjects = adminProjectIDs => ({
    type: Types.DELETE_ADMIN_PROJECTS,
    adminProjectIDsToDelete: adminProjectIDs
})

export const updateAdminProjects = (adminProjectIDs, updatedFields) => ({
    type: Types.UPDATE_ADMIN_PROJECTS,
    adminProjectIDsToUpdate: adminProjectIDs,
    updatedFields
})

// Access Codes Actions
export const setAccessCodesData = accessCodes => ({
    type: Types.SET_ACCESS_CODES_DATA,
    value: accessCodes
})

export const addAccessCodesData = accessCodes => ({
    type: Types.ADD_ACCESS_CODES_DATA,
    value: accessCodes
})

export const setLoadingAccessCodes = loading => ({
    type: Types.SET_LOADING_ACCESS_CODES,
    value: loading
})

export const setLoadingAccessCodesFirstPage = loading => ({
    type: Types.SET_LOADING_ACCESS_CODES_FIRST_PAGE,
    value: loading
})

export const __deleteAccessCodes = accessCodeIDs => ({
    type: Types.DELETE_ACCESS_CODES,
    accessCodeIDsToDelete: accessCodeIDs
})

export const updateAccessCodes = (accessCodeIDs, updatedFields) => ({
    type: Types.UPDATE_ACCESS_CODES,
    accessCodeIDsToUpdate: accessCodeIDs,
    updatedFields
})

// This User Projects Actions
export const setThisUserProjectsData = thisUserProjects => ({
    type: Types.SET_THIS_USER_PROJECTS_DATA,
    value: thisUserProjects
})

export const addThisUserProjectsData = thisUserProjects => ({
    type: Types.ADD_THIS_USER_PROJECTS_DATA,
    value: thisUserProjects
})

export const setLoadingThisUserProjects = loading => ({
    type: Types.SET_LOADING_THIS_USER_PROJECTS,
    value: loading
})

export const setLoadingThisUserProjectsFirstPage = loading => ({
    type: Types.SET_LOADING_THIS_USER_PROJECTS_FIRST_PAGE,
    value: loading
})

export const __deleteThisUserProjects = thisUserProjectIDs => ({
    type: Types.DELETE_THIS_USER_PROJECTS,
    thisUserProjectIDsToDelete: thisUserProjectIDs
})

export const updateThisUserProjects = (thisUserProjectIDs, updatedFields) => ({
    type: Types.UPDATE_THIS_USER_PROJECTS,
    thisUserProjectIDsToUpdate: thisUserProjectIDs,
    updatedFields
})

// Access Code Actions

export const setAccessCode = accessCode => ({
    type: Types.SET_ACCESS_CODE,
    value: accessCode
})

export const setLoadingAccessCode = loading => ({
    type: Types.SET_LOADING_ACCESS_CODE,
    value: loading
})

export const setAccessCodeNotFound = notFound => ({
    type: Types.SET_ACCESS_CODE_NOT_FOUND,
    value: notFound
})
