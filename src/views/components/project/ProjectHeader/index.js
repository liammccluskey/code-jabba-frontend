import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {
    getProject,
    getLoadingProject,
 } from '../../../../redux/project'
import { getHasAdminPrivileges } from '../../../../redux/user'
import { ProjectStatuses } from '../../../../redux/project'
import { Subheader } from '../../headers/Subheader'
import { PillLabel } from '../../common/PillLabel'

const pageLinks = hasAdminPriveleges => [
    {
        name: 'Overview',
        url: '',
        id: ''
    },
    {
        name: 'Status',
        url: '/status',
        id: 'status'
    },
    {
        name: 'Revisions',
        url: '/revisions',
        id: 'revisions',
    },
    ...(hasAdminPriveleges ? 
        [
            {
                name: 'Admin',
                url: '/admin',
                id: 'admin',
            }
        ]
        : []
    )
]

export const ProjectHeaderComponent = props => {
    const {
        activeLinkID,
        projectID
    } = props
    
    return (
        <Subheader
            title='Webapp Project'
            path={`/projects/${projectID}`}
            activeLinkID={activeLinkID}
            links={pageLinks(props.hasAdminPriveleges)}
        >
            {!props.loadingProject && props.project && props.project.status === ProjectStatuses.pendingApproval ?
                <PillLabel title={ProjectStatuses.pendingApproval} color='yellow' size='m'  />
                :  !props.loadingProject && props.project &&  props.project.status === ProjectStatuses.inProgress ?
                    <PillLabel title={ProjectStatuses.inProgress} color='blue' size='m' />
                : !props.loadingProject && props.project &&  props.project.status === ProjectStatuses.completed ?
                    <PillLabel title={ProjectStatuses.completed} color='green' size='m' />
                : !props.loadingProject && props.project &&  props.project.status === ProjectStatuses.inReview ?
                    <PillLabel title={ProjectStatuses.inReview} color='blue' size='m' />
                : !props.loadingProject && props.project &&  props.project.status === ProjectStatuses.denied ?
                    <PillLabel title={ProjectStatuses.denied} color='red' size='m' />
                : null
            }
            {!props.loadingProject && props.project && props.project.receivedPayment ?
                <PillLabel title='Paid' color='green' size='m' style={{marginTop: 10}} />
            : !props.loadingProject && props.project ? 
                <PillLabel title='Unpaid' color='red' size='m' style={{marginTop: 10}} />
            : null
            }
        </Subheader>
    )
}

const Root = styled.div`
    
`

const mapStateToProps = state => ({
    project: getProject(state),
    loadingProject: getLoadingProject(state),
    hasAdminPriveleges: getHasAdminPrivileges(state),
})

export const ProjectHeader = connect(mapStateToProps)(ProjectHeaderComponent)