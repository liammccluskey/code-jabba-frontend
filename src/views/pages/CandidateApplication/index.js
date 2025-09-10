import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { getIsMobile } from '../../../redux/theme'
import {
    getApplication,
    getLoadingApplication,
    getApplicationNotFound,

    fetchApplication
} from '../../../redux/application'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { JobCard } from '../../components/job/JobCard'
import { ErrorElement } from '../ErrorElement'
import { Loading } from '../../components/common/Loading'

export const CandidateApplicationComponent = props => {
    const {
        
    } = props
    const {applicationID} = useParams()

    useEffect(() => {
        fetchApplication()
    }, [applicationID])

    // Utils

    const fetchApplication = () => {
        props.fetchApplication(applicationID)
    }

    return (props.applicationNotFound ?
        <ErrorElement />
        : <PageContainer>
            <MainHeader />
            <Subheader title='Application' />
            <BodyContainer>
                {!props.loadingApplication && props.application ?
                    <Root className={`${props.isMobile && 'mobile'}`}>
                        <JobCard
                            job={props.application.job}
                            hideable={true}
                            style={{marginBottom: 40}}
                            onJobUpdate={fetchApplication}
                            candidateDidApply={true}
                        />
                        <div className='float-container activity-container'>
                            <div className='section-header'>
                                <h3 className='title'>Activity</h3>
                            </div>
                            {props.application.createdAt ?
                                <div className='activity-row'>
                                    <i className='bi-check-circle-fill check-icon' />
                                    <p className='status-text'>Applied</p>
                                    <p className='time-text'>{moment(props.application.createdAt).fromNow()}</p>
                                </div>
                                : null
                            }
                            {props.application.viewedAt ?
                                <div className='activity-row'>
                                    <i className='bi-check-circle-fill check-icon' />
                                    <p className='status-text'>Viewed</p>
                                    <p className='time-text'>{moment(props.application.viewedAt).fromNow()}</p>
                                </div>
                                : null
                            }
                            {props.application.rejectedAt ?
                                <div className='activity-row'>
                                    <i className='bi-check-circle-fill check-icon' />
                                    <p className='status-text'>Rejected</p>
                                    <p className='time-text'>{moment(props.application.rejectedAt).fromNow()}</p>
                                </div>
                                : null
                            }
                            {props.application.acceptedAt ?
                                <div className='activity-row'>
                                    <i className='bi-check-circle-fill check-icon' />
                                    <p className='status-text'>Accepted</p>
                                    <p className='time-text'>{moment(props.application.acceptedAt).fromNow()}</p>
                                </div>
                                : null
                            }
                        </div>
                    </Root>
                    : <Loading />
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .activity-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 30px;
    }
    &.mobile .activity-container {
        padding: 20px;
    }

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        margin-bottom: 20px;
    }

    & .activity-row {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    & .activity-row .status-text {
        margin-right: 10px;
    }
    & .activity-row .time-text {
        color: ${p => p.theme.textSecondary};
    }

    & .check-icon {
        color: ${p => p.theme.tint};
        margin-right: 10px;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    application: getApplication(state),
    loadingApplication: getLoadingApplication(state),
    applicationNotFound: getApplicationNotFound(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchApplication,
}, dispatch)

export const CandidateApplication = connect(mapStateToProps, mapDispatchToProps)(CandidateApplicationComponent)