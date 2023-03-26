import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'

import {
    getBugReport,
    getLoadingBugReport,
    fetchBugReport,
    deleteBugReports,
    patchBugReports,
    setLoadingBugReport
} from '../../../redux/admin'
import { addModal } from '../../../redux/modal'
import { ModalTypes } from '../../../containers/ModalProvider'
import { getIsMobile } from '../../../redux/theme'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { Loading } from '../../components/common/Loading'
import { OptionsMenu } from '../../components/menus/OptionsMenu'
import { Button } from '../../components/common/Button'
import { PillLabel } from '../../components/common/Label'

export const BugReportComponent = props => {
    const {
        
    } = props
    const {bugReportID} = useParams()
    const navigate = useNavigate()
    const [optionsMenuHidden, setOptionsMenuHidden] = useState(true)
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const titleModified = props.bugReport ? title !== props.bugReport.title : false
    const descriptionModified = props.bugReport ? description !== props.bugReport.description : false

    useEffect(() => {
       fetchCurrentBugReport()
    }, [bugReportID])

    useEffect(() => {
        if (editing && props.bugReport) {
            setTitle(props.bugReport.title)
            setDescription(props.bugReport.description)
        }
    }, [editing])

    // Utils

    const fetchCurrentBugReport = () => {
        props.fetchBugReport(bugReportID)
    }

    const fetchCurrentBugReportAndCloseMenu = () => {
        fetchCurrentBugReport()
        setOptionsMenuHidden(true)
    }

    // Direct

    const onClickEdit = () => {
        setEditing(true)
        setOptionsMenuHidden(true)
    }

    const onClickEditResolved = () => {
        props.patchBugReports([bugReportID], {
            resolved: !props.bugReport.resolved
        }, fetchCurrentBugReportAndCloseMenu, undefined, false)
    }

    const onClickEditHighPriority = () => {
        props.patchBugReports([bugReportID], {
            highPriority: !props.bugReport.highPriority
        }, fetchCurrentBugReportAndCloseMenu, undefined, false)
    }

    const onClickEditArchived = () => {
        props.patchBugReports([bugReportID], {
            archived: !props.bugReport.archived
        }, fetchCurrentBugReportAndCloseMenu, undefined, false)
    }

    const onClickDelete = () => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Delete Bug Report',
            message: 'Are you sure you want to delete this bug report?',
            confirmButtonTitle: 'Delete',
            isDanger: true,
            onConfirm: (onSuccess, onFailure) => props.deleteBugReports(
                [bugReportID],
                () => {
                    navigate('/admin/bugreports')
                    onSuccess()
                },
                onFailure
            )
        })
    }

    const onChangeTitle = e => {
        setTitle(e.target.value)
    }

    const onChangeDescription = e => {
        setDescription(e.target.value)
    }

    const onClickCancelEditing = () => {
        setEditing(false)
    }

    const onClickSubmitEdits = () => {

    }

    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Bug Report' />
            <BodyContainer>
                <Container className={`${props.isMobile && 'mobile'}`}>
                    {!props.loadingBugReport && props.bugReport ?
                        <div className='bug-report-container float-container'>
                            <div className='header'>
                                {editing ?
                                    <div className='header-edit-container'>
                                        <div className='edit-label-container'>
                                            <label>Title</label>
                                            {titleModified ?
                                                <PillLabel
                                                    title='Modified'
                                                    color='yellow'
                                                    className='pill-label'
                                                />
                                                : null
                                            }
                                        </div>
                                        <input value={title} onChange={onChangeTitle} />
                                    </div>
                                    : <h3>{props.bugReport.title}</h3>
                                }
                                <OptionsMenu
                                    menuHidden={optionsMenuHidden}
                                    setMenuHidden={setOptionsMenuHidden}
                                    options={[
                                        {title: 'Edit', icon: 'bi-pencil', onClick: onClickEdit},
                                        ...(props.bugReport.resolved ?
                                            [{title: 'Unresolve', icon: 'bi-door-open', onClick: onClickEditResolved}]
                                            : [{title: 'Resolve', icon: 'bi-door-closed', onClick: onClickEditResolved}]
                                        ),
                                        ...(props.bugReport.highPriority ?
                                            [{title: 'Make Regular Priority', icon: 'bi-patch-exclamation', onClick: onClickEditHighPriority}]
                                            : [{title: 'Make High Priority', icon: 'bi-patch-exclamation', onClick: onClickEditHighPriority}]
                                        ),
                                        ...(props.bugReport.archived ?
                                            [{title: 'De-archive', icon: 'bi-archive', onClick: onClickEditArchived}]
                                            : [{title: 'Archive', icon: 'bi-archive', onClick: onClickEditArchived}]
                                        ),
                                        {title: 'Delete', icon: 'bi-trash', onClick: onClickDelete, isDanger: true}
                                    ]}
                                />
                            </div>
                            {editing ?
                                <div className='edit-container'>
                                    <div className='edit-label-container'>
                                        <label>Description</label>
                                        {descriptionModified ?
                                            <PillLabel
                                                title='Modified'
                                                color='yellow'
                                                className='pill-label'
                                            />
                                            : null
                                        }
                                    </div>
                                    <textarea value={description} onChange={onChangeDescription} />
                                </div> : null
                            }
                            {editing ?
                                <div className='edit-buttons-container'>
                                    <Button
                                        title='Cancel'
                                        type='tint'
                                        priority={2}
                                        onClick={onClickCancelEditing}
                                        style={{marginRight: 15}}
                                    />
                                    <Button
                                        title='Submit'
                                        type='solid'
                                        priority={2}
                                        onClick={onClickSubmitEdits}
                                    />
                                </div> : null
                            }
                        </div>
                        : <Loading />
                    }
                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .bug-report-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 30px;
    }

    &.mobile .bug-report-container {
        padding: 20px;
    }

    & .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 30px;
    }

    & .header-edit-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
    }

    & .edit-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 30px;
    }

    & .edit-label-container {
        display: flex;
        align-items: center;
        margin-bottom: 5px
    }
    & .edit-label-container label {
        margin-bottom: 0px;
    }
    & .edit-label-container .pill-label {
        margin-left: 15px;
    }

    & input {
        width: 50%;
    }
    &.mobile input {
        width: 100%;
    }

    & textarea {
        height: 100px;
        width: 100% !important;
        box-sizing: border-box;
    }

    & .edit-buttons-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`
const mapStateToProps = state => ({
    bugReport: getBugReport(state),
    loadingBugReport: getLoadingBugReport(state),
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBugReport,
    patchBugReports,
    deleteBugReports,
    setLoadingBugReport,
    addModal
}, dispatch)

export const BugReport = connect(mapStateToProps, mapDispatchToProps)(BugReportComponent)