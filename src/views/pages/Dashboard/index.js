import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { getPaginatedDataForCurrentPage, PageSizes } from '../../../networking'
import { ModalTypes } from '../../../containers/ModalProvider'
import { addModal } from '../../../redux/modal'
import {
    getAdminProjects,
    getLoadingAdminProjects,
    getAdminProjectsPagesCount,

    getAccessCodes,
    getLoadingAccessCodes,
    getAccessCodesPagesCount,

    getThisUserProjects,
    getLoadingThisUserProjects,
    getThisUserProjectsPagesCount,

    fetchThisUserProjects,
    fetchAdminUserProjects,
    fetchAccessCodes
} from '../../../redux/project'
import { SortFilters } from '../admin/BugReports'
import { getIsSemiMobile } from '../../../redux/theme'
import { getHasAdminPrivileges } from '../../../redux/user'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { SearchableTable } from '../../components/common/SearchableTable'
import { Button } from '../../components/common/Button'

const AdminProjectsSortFilters = SortFilters
const ThisUserProjectsSortFilters = SortFilters
const AccessCodesSortFilters = SortFilters

export const DashboardComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    // Admin Projects State
    const [adminProjectsPage, setAdminProjectsPage] = useState(0)
    const [adminProjectsSearchText, setAdminProjectsSearchText] = useState('')
    const [adminProjectsSortFilter, setAdminProjectsSortFilter] = useState(AdminProjectsSortFilters[0].filter)
    const [clearAdminProjectsSelectedRows, setClearAdminProjectsSelectedRows] = useState(false)
    // Access Codes State
    const [accessCodesPage, setAccessCodesPage] = useState(0)
    const [accessCodesSearchText, setAccessCodesSearchText] = useState('')
    const [accessCodesSortFilter, setAccessCodesSortFilter] = useState(AccessCodesSortFilters[0].filter)
    const [clearAccessCodesSelectedRows, setClearAccessCodesSelectedRows] = useState(false)
    // This User Projects State
    const [thisUserProjectsPage, setThisUserProjectsPage] = useState(0)
    const [thisUserProjectsSearchText, setThisUserProjectsSearchText] = useState('')
    const [thisUserProjectsSortFilter, setThisUserProjectsSortFilter] = useState(ThisUserProjectsSortFilters[0].filter)
    const [clearThisUserProjectsSelectedRows, setClearThisUserProjectsSelectedRows] = useState(false)

    // Admin Projects Table Data
    const adminProjectsPills = [

    ]
    const adminProjectsForCurrentPage = getPaginatedDataForCurrentPage(
        props.adminProjects,
        adminProjectsPage,
        PageSizes.adminProjects
    )
    const adminProjectsTableHeaders = ['Name', 'Status', 'Payment Status', 'Date Created']
    const adminProjectsTableRows = adminProjectsForCurrentPage.map(({projectName, status, receivedPayment, createdAt, _id}) => ({
        id: _id,
        cells: [
            projectName,
            status,
            receivedPayment ? 'Paid' : 'Unpaid',
            moment(createdAt).format('LL')
        ]
    }))

    // Access Codes Table Data
    const accessCodesPills = [

    ]
    const accessCodesForCurrentPage = getPaginatedDataForCurrentPage(
        props.accessCodes,
        accessCodesPage,
        PageSizes.accessCodes
    )
    const accessCodesTableHeaders = ['Title', 'Status']
    const accessCodesTableRows = accessCodesForCurrentPage.map(({title, claimed, _id}) => ({
        id: _id,
        cells: [
            title,
            claimed ? 'Claimed' : 'Unclaimed'
        ]
    }))

    // This User Projects Table Data
    const thisUserProjectsPills = [

    ]
    const thisUserProjectsForCurrentPage = getPaginatedDataForCurrentPage(
        props.thisUserProjects,
        thisUserProjectsPage,
        PageSizes.thisUserProjects
    )
    const thisUserProjectsTableHeaders = ['Name', 'Status', 'Payment Status', 'Date Created']
    const thisUserProjectsTableRows = thisUserProjectsForCurrentPage.map(({projectName, status, receivedPayment, createdAt, _id}) => ({
        id: _id,
        cells: [
            projectName,
            status,
            receivedPayment ? 'Paid' : 'Unpaid',
            moment(createdAt).format('LL')
        ]
    }))

    useEffect(() => {
        fetchAccessCodesFirstPage()
        // !isadminuser ?
            // fetch projects for user
            // fetch admin projects
        if (props.hasAdminPrivileges) {
            fetchAdminProjectsFirstPage()
        } else {
            fetchThisUserProjectsFirstPage()
        }
    }, [])

    useEffect(() => {
        fetchAdminProjectsFirstPage()
    }, [adminProjectsSortFilter])

    useEffect(() => {
        fetchAccessCodesFirstPage()
    }, [accessCodesSortFilter])

    useEffect(() => {
        fetchThisUserProjectsFirstPage()
    }, [thisUserProjectsSortFilter])

    // Utils

    // Admin Projects Utils
    const getAdminProjectsFilters = () => {
        return {
            sortby: adminProjectsSortFilter
        }
    }

    const fetchAdminProjectsFirstPage = () => {
        props.fetchAdminUserProjects(getAdminProjectsFilters(), adminProjectsSearchText, 1)
        setAdminProjectsPage(1)
    }

    // Access Codes Utils
    const getAccessCodesFilters = () => {
        return {
            sortby: accessCodesSortFilter
        }
    }

    const fetchAccessCodesFirstPage = () => {
        props.fetchAccessCodes(getAccessCodesFilters(), accessCodesSearchText, 1)
        setAccessCodesPage(1)
    }

    // This User Projects Utils
    const getThisUserProjectsFilters = () => {
        return {
            sortby: thisUserProjectsSortFilter
        }
    }

    const fetchThisUserProjectsFirstPage = () => {
        props.fetchThisUserProjects(getThisUserProjectsFilters(), thisUserProjectsSearchText, 1)
        setThisUserProjectsPage(1)
    }

    // Direct

    // Admin Projects Table Functions
    const onChangeAdminProjectsSearchText = e => {
        setAdminProjectsSearchText(e.target.value)
    }

    const onSubmitAdminProjectsSearch = e => {
        e.preventDefault()
        fetchAdminProjectsFirstPage()
    }

    const onChangeAdminProjectsSortFilter = e => {
        setAdminProjectsSortFilter(e.target.value)
    }

    const onClickAdminProjectRow = rowID => {
        navigate(`/projects/${rowID}`)
    }

    const onClickDecrementAdminProjectsPage = () => {
        if (adminProjectsPage == 1) return
        else {
            setAdminProjectsPage(curr => curr - 1)
        }
    }

    const onClickIncrementAdminProjectsPage = () => {
        if (adminProjectsPage == props.adminProjectsPagesCount || props.adminProjectsPagesCount == 0) return
        else {
            props.fetchAdminUserProjects(getAdminProjectsFilters(), adminProjectsSearchText, adminProjectsPage + 1)
            setAdminProjectsPage(curr => curr + 1)
        }
    }

    // Access Codes Table Functions
    const onChangeAccessCodesSearchText = e => {
        setAccessCodesSearchText(e.target.value)
    }

    const onSubmitAccessCodesSearch = e => {
        e.preventDefault()
        fetchAccessCodesFirstPage()
    }

    const onChangeAccessCodesSortFilter = e => {
        setAccessCodesSortFilter(e.target.value)
    }

    const onClickAccessCodeRow = rowID => {
        navigate(`/projects/${rowID}`)
    }

    const onClickDecrementAccessCodesPage = () => {
        if (accessCodesPage == 1) return
        else {
            setAccessCodesPage(curr => curr - 1)
        }
    }

    const onClickIncrementAccessCodesPage = () => {
        if (accessCodesPage == props.accessCodesPagesCount || props.accessCodesPagesCount == 0) return
        else {
            props.fetchAdminUserProjects(getAccessCodesFilters(), accessCodesSearchText, accessCodesPage + 1)
            setAccessCodesPage(curr => curr + 1)
        }
    }

    // Admin Projects Table Functions
    const onChangeThisUserProjectsSearchText = e => {
        setThisUserProjectsSearchText(e.target.value)
    }

    const onSubmitThisUserProjectsSearch = e => {
        e.preventDefault()
        fetchThisUserProjectsFirstPage()
    }

    const onChangeThisUserProjectsSortFilter = e => {
        setThisUserProjectsSortFilter(e.target.value)
    }

    const onClickThisUserProjectRow = rowID => {
        navigate(`/projects/${rowID}`)
    }

    const onClickDecrementThisUserProjectsPage = () => {
        if (thisUserProjectsPage == 1) return
        else {
            setThisUserProjectsPage(curr => curr - 1)
        }
    }

    const onClickIncrementThisUserProjectsPage = () => {
        if (thisUserProjectsPage == props.thisUserProjectsPagesCount || props.thisUserProjectsPagesCount == 0) return
        else {
            props.fetchAdminUserProjects(getThisUserProjectsFilters(), thisUserProjectsSearchText, thisUserProjectsPage + 1)
            setThisUserProjectsPage(curr => curr + 1)
        }
    }

    // Common Functions
    const onClickPill = pillID => {
        switch(pillID) {
            default:
                break
        }
    }

    const onClickCreateAccessCode = () => {
        props.addModal(ModalTypes.CREATE_ACCESS_CODE)
    }

    const onClickCreateWebapp = () => {
        navigate('/create')
    }

    return (
        <PageContainer>
            <MainHeader hasSubheaderBelow={false}/>
            <BodyContainer>
                {props.hasAdminPrivileges ?
                    <Container className={`${props.isSemiMobile && 'semi-mobile'}`}>
                        <div className='admin-tables-container'>
                            <div
                                className='table-container'
                                style={{marginBottom: 40}}
                            >
                                <div className='section-header'>
                                    <h3>Webapp Requests</h3>
                                </div>
                                <SearchableTable
                                    loading={props.loadingAdminProjects}
                                    searchText={adminProjectsSearchText}
                                    pills={adminProjectsPills}
                                    sortFilters={AdminProjectsSortFilters}
                                    sortFilter={adminProjectsSortFilter}
                                    tableHeaders={adminProjectsTableHeaders}
                                    tableRows={adminProjectsTableRows}
                                    tableSelectActions={[
                                    //    {title: 'Delete', action: onClickDelete, isDanger: true}
                                    ]}
                                    clearSelectedRows={clearAdminProjectsSelectedRows}
                                    page={adminProjectsPage}
                                    pagesCount={props.adminProjectsPagesCount}
                                    onChangeSearchText={onChangeAdminProjectsSearchText}
                                    onSubmitSearch={onSubmitAdminProjectsSearch}
                                    onClickPill={onClickPill}
                                    onChangeSortFilter={onChangeAdminProjectsSortFilter}
                                    onClickTableRow={onClickThisUserProjectRow}
                                    onClickDecrementPage={onClickDecrementAdminProjectsPage}
                                    onClickIncrementPage={onClickIncrementAdminProjectsPage}
                                />
                            </div>
                            <div className='table-container'>
                                <div className='section-header'>
                                    <h3>Access Codes</h3>
                                    <Button
                                        title='Create an Access Code'
                                        icon='bi-plus'
                                        priority={3}
                                        type='clear'
                                        onClick={onClickCreateAccessCode}
                                    />
                                </div>
                                <SearchableTable
                                    loading={props.loadingAccessCodes}
                                    searchText={accessCodesSearchText}
                                    pills={accessCodesPills}
                                    sortFilters={AccessCodesSortFilters}
                                    sortFilter={accessCodesSortFilter}
                                    tableHeaders={accessCodesTableHeaders}
                                    tableRows={accessCodesTableRows}
                                    tableSelectActions={[
                                    //    {title: 'Delete', action: onClickDelete, isDanger: true}
                                    ]}
                                    clearSelectedRows={clearAccessCodesSelectedRows}
                                    page={accessCodesPage}
                                    pagesCount={props.accessCodesPagesCount}
                                    onChangeSearchText={onChangeAccessCodesSearchText}
                                    onSubmitSearch={onSubmitAccessCodesSearch}
                                    onClickPill={onClickPill}
                                    onChangeSortFilter={onChangeAccessCodesSortFilter}
                                    onClickTableRow={onClickAccessCodeRow}
                                    onClickDecrementPage={onClickDecrementAccessCodesPage}
                                    onClickIncrementPage={onClickIncrementAccessCodesPage}
                                />
                            </div>
                        </div>
                    </Container>
                    : <Container>
                        <div className='table-container'>
                            <div className='section-header'>
                                <h3>Your Webapps</h3>
                                <Button
                                    title='Create a Webapp'
                                    icon='bi-plus'
                                    priority={3}
                                    type='clear'
                                    onClick={onClickCreateWebapp}
                                />
                            </div>
                            <SearchableTable
                                loading={props.loadingThisUserProjects}
                                searchText={thisUserProjectsSearchText}
                                pills={thisUserProjectsPills}
                                sortFilters={ThisUserProjectsSortFilters}
                                sortFilter={thisUserProjectsSortFilter}
                                tableHeaders={thisUserProjectsTableHeaders}
                                tableRows={thisUserProjectsTableRows}
                                tableSelectActions={[
                                //    {title: 'Delete', action: onClickDelete, isDanger: true}
                                ]}
                                clearSelectedRows={clearThisUserProjectsSelectedRows}
                                page={thisUserProjectsPage}
                                pagesCount={props.thisUserProjectsPagesCount}
                                onChangeSearchText={onChangeThisUserProjectsSearchText}
                                onSubmitSearch={onSubmitThisUserProjectsSearch}
                                onClickPill={onClickPill}
                                onChangeSortFilter={onChangeThisUserProjectsSortFilter}
                                onClickTableRow={onClickAdminProjectRow}
                                onClickDecrementPage={onClickDecrementThisUserProjectsPage}
                                onClickIncrementPage={onClickIncrementThisUserProjectsPage}
                            />
                        </div>
                    </Container>
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 200px;

    & .admin-tables-container {
        display: grid;
        grid-template-columns: 1fr;
    }
    &.semi-mobile .admin-tables-container {
        grid-template-columns: 1fr;
    }

    & .table-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        height: 30px;
        box-sizing: border-box;
    }
`

const mapStateToProps = state => ({
    hasAdminPrivileges: getHasAdminPrivileges(state),
    isSemiMobile: getIsSemiMobile(state),

    adminProjects: getAdminProjects(state),
    loadingAdminProjects: getLoadingAdminProjects(state),
    adminProjectsPagesCount: getAdminProjectsPagesCount(state),

    accessCodes: getAccessCodes(state),
    loadingAccessCodes: getLoadingAccessCodes(state),
    accessCodesPagesCount: getAccessCodesPagesCount(state),

    thisUserProjects: getThisUserProjects(state),
    loadingThisUserProjects: getLoadingThisUserProjects(state),
    thisUserProjectsPagesCount: getThisUserProjectsPagesCount(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAdminUserProjects,
    fetchThisUserProjects,
    fetchAccessCodes,
    addModal
}, dispatch)

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

// import React from 'react'
// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom'

// import { PageContainer } from '../../components/common/PageContainer'
// import { BodyContainer } from '../../components/common/BodyContainer'
// import { MainHeader } from '../../components/headers/MainHeader'
// import { Button } from '../../components/common/Button'

// import {signOutUser} from '../../../redux/user'
// import { Subheader } from '../../components/headers/Subheader'
// import { Tooltip } from '../../components/common/Tooltip'

// export const DashboardComponent = props => {
//     const {
        
//     } = props
//     const navigate = useNavigate()

//     const onClickLogOut = () => {
//         props.signOutUser(() => {
//             navigate('/')
//         })
//     }

//     return (
//         <PageContainer>
//             <MainHeader hasSubheaderBelow={false}/>
//             <BodyContainer>
//             </BodyContainer>
//         </PageContainer>
//     )
// }

// const mapStateToProps = state => ({
    
// })

// const mapDispatchToProps = dispatch => bindActionCreators({
//     signOutUser
// }, dispatch)

// export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)