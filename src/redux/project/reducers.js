import {ProjectActionTypes as Types} from './types'

const ProjectState = {
    project: null,
    loadingProject: false,
    projectNotFound: false,
    isValidAccessCode: false,
    adminProjects: {
        loading: false,
        loadingFirstPage: false,
        payload: {
            adminProjects: [],
            canLoadMore: false,
            pagesCount: 0,
            totalCount: 0,
        }
    },
    accessCodes: {
        loading: false,
        loadingFirstPage: false,
        payload: {
            accessCodes: [],
            canLoadMore: false,
            pagesCount: 0,
            totalCount: 0,
        }
    },
    thisUserProjects: {
        loading: false,
        loadingFirstPage: false,
        payload: {
            thisUserProjects: [],
            canLoadMore: false,
            pagesCount: 0,
            totalCount: 0,
        }
    },
    accessCode: null,
    loadingAccessCode: false,
    accessCodeNotFound: false
}

export const projectReducer = (state = ProjectState, action) => {
    switch (action.type) {
        case Types.SET_PROJECT:
            return {
                ...state,
                project: action.value
            }
        case Types.SET_LOADING_PROJECT:
            return {
                ...state,
                loadingProject: action.value
            }
        case Types.SET_PROJECT_NOT_FOUND:
            return {
                ...state,
                projectNotFound: action.value
            }
        case Types.SET_IS_VALID_ACCESS_CODE:
            return {
                ...state,
                isValidAccessCode: action.value
            }
        case Types.SET_ADMIN_PROJECTS_DATA:
            const adminProjectsData = action.value
            return {
                ...state,
                adminProjects: {
                    ...state.adminProjects,
                    payload: adminProjectsData
                }
            }
        case Types.ADD_ADMIN_PROJECTS_DATA:
            const newAdminProjectsData = action.value
            return {
                ...state,
                adminProjects: {
                    ...state.adminProjects,
                    payload: {
                        ...state.adminProjects.payload,
                        adminProjects: [
                            ...state.adminProjects.payload.adminProjects,
                            ...newAdminProjectsData.adminProjects
                        ]
                    }
                }
            }
        case Types.SET_LOADING_ADMIN_PROJECTS:
            return {
                ...state,
                adminProjects: {
                    ...state.adminProjects,
                    loading: action.value
                }
            }
        case Types.SET_LOADING_ADMIN_PROJECTS_FIRST_PAGE:
            return {
                ...state,
                adminProjects: {
                    ...state.adminProjects,
                    loadingFirstPage: action.value
                }
            }
        case Types.DELETE_ADMIN_PROJECTS:
            const {adminProjectIDsToDelete} = action
            return {
                ...state,
                adminProjects: {
                    ...state.adminProjects,
                    payload: {
                        ...state.adminProjects.payload,
                        adminProjects: state
                            .adminProjects
                            .payload
                            .adminProjects.filter(({_id}) => !adminProjectIDsToDelete.includes(_id))
                    }
                }
            }
        case Types.UPDATE_ADMIN_PROJECTS:
            const {adminProjectIDsToUpdate, updatedAdminProjectFields} = action
            return {
                ...state,
                adminProjects: {
                    ...state.adminProjects,
                    payload: {
                        ...state.adminProjects.payload,
                        adminProjects: state
                            .adminProjects
                            .payload
                            .adminProjects.map(adminProject => adminProjectIDsToUpdate.includes(adminProject._id) ?
                                {...adminProject, ...updatedAdminProjectFields}
                                : adminProject
                            )
                    }
                }
            }
        case Types.SET_ACCESS_CODES_DATA:
            const accessCodesData = action.value
            return {
                ...state,
                accessCodes: {
                    ...state.accessCodes,
                    payload: accessCodesData
                }
            }
        case Types.ADD_ACCESS_CODES_DATA:
            const newAccessCodesData = action.value
            return {
                ...state,
                accessCodes: {
                    ...state.accessCodes,
                    payload: {
                        ...state.accessCodes.payload,
                        accessCodes: [
                            ...state.accessCodes.payload.accessCodes,
                            ...newAccessCodesData.accessCodes
                        ]
                    }
                }
            }
        case Types.SET_LOADING_ACCESS_CODES:
            return {
                ...state,
                accessCodes: {
                    ...state.accessCodes,
                    loading: action.value
                }
            }
        case Types.SET_LOADING_ACCESS_CODES_FIRST_PAGE:
            return {
                ...state,
                accessCodes: {
                    ...state.accessCodes,
                    loadingFirstPage: action.value
                }
            }
        case Types.DELETE_ACCESS_CODES:
            const {accessCodeIDsToDelete} = action
            return {
                ...state,
                accessCodes: {
                    ...state.accessCodes,
                    payload: {
                        ...state.accessCodes.payload,
                        accessCodes: state
                            .accessCodes
                            .payload
                            .accessCodes.filter(({_id}) => !accessCodeIDsToDelete.includes(_id))
                    }
                }
            }
        case Types.UPDATE_ACCESS_CODES:
            const {accessCodeIDsToUpdate, updatedAccessCodeFields} = action
            return {
                ...state,
                accessCodes: {
                    ...state.accessCodes,
                    payload: {
                        ...state.accessCodes.payload,
                        accessCodes: state
                            .accessCodes
                            .payload
                            .accessCodes.map(accessCode => accessCodeIDsToUpdate.includes(accessCode._id) ?
                                {...accessCode, ...updatedAccessCodeFields}
                                : accessCode
                            )
                    }
                }
            }
        case Types.SET_THIS_USER_PROJECTS_DATA:
            const thisUserProjectsData = action.value
            return {
                ...state,
                thisUserProjects: {
                    ...state.thisUserProjects,
                    payload: thisUserProjectsData
                }
            }
        case Types.ADD_THIS_USER_PROJECTS_DATA:
            const newThisUserProjectsData = action.value
            return {
                ...state,
                thisUserProjects: {
                    ...state.thisUserProjects,
                    payload: {
                        ...state.thisUserProjects.payload,
                        thisUserProjects: [
                            ...state.thisUserProjects.payload.thisUserProjects,
                            ...newThisUserProjectsData.thisUserProjects
                        ]
                    }
                }
            }
        case Types.SET_LOADING_THIS_USER_PROJECTS:
            return {
                ...state,
                thisUserProjects: {
                    ...state.thisUserProjects,
                    loading: action.value
                }
            }
        case Types.SET_LOADING_THIS_USER_PROJECTS_FIRST_PAGE:
            return {
                ...state,
                thisUserProjects: {
                    ...state.thisUserProjects,
                    loadingFirstPage: action.value
                }
            }
        case Types.DELETE_THIS_USER_PROJECTS:
            const {thisUserProjectIDsToDelete} = action
            return {
                ...state,
                thisUserProjects: {
                    ...state.thisUserProjects,
                    payload: {
                        ...state.thisUserProjects.payload,
                        thisUserProjects: state
                            .thisUserProjects
                            .payload
                            .thisUserProjects.filter(({_id}) => !thisUserProjectIDsToDelete.includes(_id))
                    }
                }
            }
        case Types.UPDATE_THIS_USER_PROJECTS:
            const {thisUserProjectIDsToUpdate, updatedThisUserProjectFields} = action
            return {
                ...state,
                thisUserProjects: {
                    ...state.thisUserProjects,
                    payload: {
                        ...state.thisUserProjects.payload,
                        thisUserProjects: state
                            .thisUserProjects
                            .payload
                            .thisUserProjects.map(thisUserProject => thisUserProjectIDsToUpdate.includes(thisUserProject._id) ?
                                {...thisUserProject, ...updatedThisUserProjectFields}
                                : thisUserProject
                            )
                    }
                }
            }
        case Types.SET_ACCESS_CODE:
            return {
                ...state,
                accessCode: action.value
            }
        case Types.SET_LOADING_ACCESS_CODE:
            return {
                ...state,
                loadingAccessCode: action.value
            }
        case Types.SET_ACCESS_CODE_NOT_FOUND:
            return {
                ...state,
                accessCodeNotFound: action.value
            }
        default:
            return state
    }
}
