import React, {useState, useEffect, useMemo} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'

import { getMongoUser } from '../../../redux/user'
import { getIsRecruiterMode } from '../../../redux/user'
import {
    getApplication,
    getLoadingApplication,
    getApplicationNotFound,
    getApplications,
    getLoadingApplications,
    getApplicationsPage,
    getApplicationsPagesCount,
    getApplicationsFilters,

    fetchApplications,
    setApplicationsPage,
    fetchApplication,
    updateApplicationStatus
} from '../../../redux/application'
import { 
    getJob, 
    getLoadingJob, 
    getJobNotFound,

    fetchJob
} from '../../../redux/job'
import { SortFilters } from '../admin/BugReports'
import { PageSizes, getPaginatedDataForCurrentPage } from '../../../networking'
import { ModalTypes } from '../../../containers/ModalProvider'
import { addModal } from '../../../redux/modal'
import { 
    getYOE, 
    getInternshipCount, 
    getExcludedAndIncludedItems 
} from './utils'
import { Questions } from '../../components/job/EditJobCard'
import { getApplicationStatusPillColor } from '../../components/job/ApplicationFeedCard/utils'
import { capitalizeWords } from '../../../utils'
import { addMessage } from '../../../redux/communication'

import { PageContainer } from '../../components/common/PageContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { ErrorElement } from '../ErrorElement'
import { FixedBodyContainer } from '../../components/common/FixedBodyContainer'
import { Paginator } from '../../components/common/Paginator'
import { SearchBar } from '../../components/common/SearchBar'
import { Pill } from '../../components/common/Pill'
import { Loading } from '../../components/common/Loading'
import { ApplicationFeedCard } from '../../components/job/ApplicationFeedCard'
import { Button } from '../../components/common/Button'
import { GeneralCard } from '../../components/profile/GeneralCard'
import { SocialsCard } from '../../components/profile/SocialsCard'
import { EducationCard } from '../../components/profile/EducationCard'
import { WorkExperienceCard } from '../../components/profile/WorkExperienceCard'
import { ProjectCard } from '../../components/profile/ProjectCard'
import { ResumeCard } from '../../components/profile/ResumeCard'
import { QuestionsCard } from '../../components/profile/QuestionsCard'
import { ApplicationSummaryCard } from '../../components/job/ApplicationSummaryCard'
import { PillLabel } from '../../components/common/PillLabel'

export const ReviewApplicationsComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()

    // State

    const {jobID} = useParams()
    const [selectedApplicationID, setSelectedApplicationID] = useState('')
    const [data, setData] = useState({
        appliedPillActive: props.applicationsFilters && props.applicationsFilters.status === 'applied',
        viewedPillActive: props.applicationsFilters && props.applicationsFilters.status === 'viewed',
        rejectedPillActive: props.applicationsFilters && props.applicationsFilters.status === 'rejected',
        acceptedPillActive: props.applicationsFilters && props.applicationsFilters.status === 'accepted',

        searchText: props.applicationsFilters && props.applicationsFilters.candidateName
            ? props.applicationsFilters.candidateName : '',
    })
    const [applicationsSortFilter, setApplicationsSortFilter] = useState(
        props.applicationsFilters ? props.applicationsFilters.sortBy : SortFilters[0].filter
    )
    const filters = useMemo(() => ({
            ...(data.appliedPillActive ? {status: 'applied'} : {}),
            ...(data.viewedPillActive ? {status: 'viewed'} : {}),
            ...(data.rejectedPillActive ? {status: 'rejected'} : {}),
            ...(data.acceptedPillActive ? {status: 'accepted'} : {}),
            sortBy: applicationsSortFilter,
            jobID
    }), [
        data.appliedPillActive, 
        data.viewedPillActive, 
        data.rejectedPillActive, 
        data.acceptedPillActive, 
        applicationsSortFilter
    ])
    const applicationsForCurrentPage = useMemo(() => {
        return props.loadingApplications ? [] :
            getPaginatedDataForCurrentPage(
                props.applications, 
                props.applicationsPage, 
                PageSizes.recruiterApplicationSearch
            )
    }, [props.applications, props.applicationsPage])
    const [didShowCantReviewApplicationsModal, setDidShowCantReviewApplicationsModal] = useState(false)
    const computedApplicantInformation = useMemo(() => {
        
        if (!props.application) {
            return {
                languages: {has: [], missing: []},
                skills: {has: [], missing: []},
                yoe: {years: 0, months: 0},
                internshipCount: 0
            }
        }

        const {candidate} = props.application
        const {job} = props.application

        const languagesInfo = getExcludedAndIncludedItems(candidate.languages, job.languages)
        const skillsInfo = getExcludedAndIncludedItems(candidate.skills, job.skills)

        const info = {
            languages: {has: languagesInfo.included, missing: languagesInfo.excluded},
            skills: {has: skillsInfo.included, missing: skillsInfo.excluded},
            yoe: getYOE(candidate.workExperiences),
            internshipCount: getInternshipCount(candidate.workExperiences)
        }

        return info
    }, [props.application])
    const questionsAndAnswers = useMemo(() => {
        if (!props.application || !props.application.job.questions) return []
        else {
            const jobQuestionIDs = {}
            props.application.job.questions.forEach(qID => jobQuestionIDs[qID] = 1)

            return Questions.filter(q => (q.id in jobQuestionIDs))
                .map(({id, title, inputType, options}) => {
                    const question = props.application.candidate.questions.find(q => q.id === id)
                    return {
                        id,
                        title,
                        answer: question ?
                            inputType === 'select' ?
                                options.find(option => option.id === question.answer).title
                                : question.answer
                            : 'No answer'
                    }
                })
        }
    }, [props.application])

    const applicationPills = [
        {title: 'Applied', id: 'applied', active: data.appliedPillActive},
        {title: 'Viewed', id: 'viewed', active: data.viewedPillActive},
        {title: 'Rejected', id: 'rejected', active: data.rejectedPillActive},
        {title: 'Accepted', id: 'accepted', active: data.acceptedPillActive},
    ]

    useEffect(() => {
        props.fetchJob(jobID)
    }, [jobID])

    useEffect(() => {
        fetchApplicationsFirstPage()
    }, [applicationsSortFilter, filters])

    useEffect(() => {
        selectedApplicationID && props.fetchApplication(selectedApplicationID)
    }, [selectedApplicationID])

    useEffect(() => {
        setSelectedApplicationID(applicationsForCurrentPage.length ? 
            applicationsForCurrentPage[0]._id : ''
        )
    }, [props.applications, props.applicationsPage])

    useEffect(() => {
        if (
            props.application && 
            props.application.job.applicationType !== 'easy-apply'
            && !didShowCantReviewApplicationsModal
        ) {
            props.addModal(ModalTypes.CONFIRM, {
                title: 'Application review',
                message: "Only jobs whose application type is 'Easy apply' are eligible for application review.",
                confirmButtonTitle: 'Okay',
                onConfirm: onSuccess => {
                    navigate(-1)
                    onSuccess()
                },
                onCancel: () => navigate(-1)
            })
            setDidShowCantReviewApplicationsModal(true)
        }
    }, [props.application])

    useEffect(() => {
        if (selectedApplicationID && props.application && props.application.status === 'viewed') {
            props.updateApplicationStatus(selectedApplicationID, 'viewed')
        } 
    }, [selectedApplicationID])

    // Utils

    const getFilters = () => ({
        ...filters,
        ...(data.searchText ? {candidateName: data.searchText} : {})
    })

    const fetchApplicationsFirstPage = () => {
        props.fetchApplications(getFilters(), 1)
    }

    const updatePill = (pillID, pillActive) => {
        const fieldName = pillID + 'PillActive'

        setData(curr => ({
            ...curr,
            [fieldName]: pillActive === undefined ? !curr[fieldName] : pillActive
        }))
    }

    const showUpdateApplicationStatusModal = updatedStatus => {
        if (!props.application) {
            props.addMessage('Please wait for the application to load.')
            return
        } else if (props.application.status === updatedStatus) {
            props.addMessage(`This application has already been marked as ${updatedStatus}.`, true)
            return
        }

        props.addModal(ModalTypes.UPDATE_APPLICATION_STATUS, {
            isAccept: updatedStatus === 'accepted',
            jobTitle: props.application.job.title,
            jobCompanyName: props.application.job.company.name,
            candidateName: props.application.candidate.displayName,
            recruiterName: props.application.job.recruiter.displayName,
            onUpdateStatus: (onSuccess, onFailure) => {
                const onUpdateStatusSuccess = () => {
                    props.fetchApplication(selectedApplicationID)
                    onSuccess()
                }

                props.updateApplicationStatus(selectedApplicationID, updatedStatus, onUpdateStatusSuccess, onFailure)
            }
        })
    }

    // Direct

    const onClickPill = pillID => {
        switch (pillID) {
            case 'applied':
                updatePill(pillID)
                updatePill('viewed', false)
                updatePill('rejected', false)
                updatePill('accepted', false)
                break
            case 'viewed':
                updatePill('applied', false)
                updatePill(pillID)
                updatePill('rejected', false)
                updatePill('accepted', false)
                break
            case 'rejected':
                updatePill('applied', false)
                updatePill('viewed', false)
                updatePill(pillID)
                updatePill('accepted', false)
                break
            case 'accepted':
                updatePill('applied', false)
                updatePill('viewed', false)
                updatePill('rejected', false)
                updatePill(pillID)
                break
        }
    }

    const onClickDecrementApplicationsPage = () => {
        if (props.applicationsPage == 1) return
        else {
            props.setApplicationsPage(props.applicationsPage - 1)
        }
    }

    const onClickIncrementApplicationsPage = () => {
        if (props.applicationsPage == props.applicationsPagesCount || props.applicationsPagesCount == 0) return
        else {
            props.fetchApplications(getFilters(), props.applicationsPage + 1)
        }
    }

    const onSubmitSearch = e => {
        e.preventDefault()
        fetchApplicationsFirstPage()
    }

    const onChangeSearchText = e => {
        setData(curr => ({
            ...curr,
            searchText: e.target.value
        }))
    }

    const onChangeSortFilter = e => {
        setApplicationsSortFilter(e.target.value)
    }

    const onClickApplication = applicationID => {
        setSelectedApplicationID(applicationID)
    }

    const onClickAccept = () => {
        showUpdateApplicationStatusModal('accepted')
    }

    const onClickReject = () => {
        showUpdateApplicationStatusModal('rejected')
    }

    // Render

    return (
        (
            props.jobNotFound ||
            !props.loadingJob &&
                props.job &&
                props.job.recruiter._id !== props.mongoUser._id ||
            !props.loadingJob &&
                props.job &&
                props.job.applicationType !== 'easy-apply'
        ) ?
            <ErrorElement />
        : <PageContainer>
            <MainHeader />
            <Subheader title={`Review applications - ${props.job ? props.job.title : ''}`} />
            <FixedBodyContainer
                className='subheader-without-links'
                style={{paddingTop: 20, paddingBottom: 0}}
            >
                <Root>
                    <div className='search-container'>
                        <div className='search-left-container'>
                            <SearchBar
                                value={data.searchText}
                                placeholder='Search by candidate name'
                                onChange={onChangeSearchText}
                                onSubmit={onSubmitSearch}
                                className='search-bar'
                            />
                            <div className='pills-container'>
                                {applicationPills.map(({title, id, active}) => (
                                    <Pill
                                        title={title}
                                        id={id}
                                        active={active}
                                        onClick={onClickPill}
                                        key={id}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='search-right-container'>
                            <select 
                                value={applicationsSortFilter} 
                                onChange={onChangeSortFilter} 
                                className='solid'
                                style={{marginTop: 0}}
                            >
                                {SortFilters.map(({title, filter}) => (
                                    <option value={filter} key={filter}>{title}</option>
                                ))}
                            </select>
                            {selectedApplicationID ?
                                <div className='action-buttons-container'>
                                    <Button
                                        title='Accept application'
                                        priority={2}
                                        type='success'
                                        onClick={onClickAccept}
                                        style={{marginRight: 10}}
                                    />
                                    <Button
                                        title='Reject application'
                                        priority={2}
                                        type='danger'
                                        onClick={onClickReject}
                                    />
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    {!props.loadingApplications ? 
                        <div className='applications-container'>
                            <div className='applications-list-container'>
                                <div className='applications-items-container float-container'>
                                    {applicationsForCurrentPage.map( application => (
                                        <ApplicationFeedCard
                                            application={application}
                                            candidate={application.candidate}
                                            job={application.job}
                                            onClick={() => onClickApplication(application._id)}
                                            key={application._id}
                                            selected={selectedApplicationID === application._id}
                                        />
                                    ))}
                                </div>
                                <Paginator
                                    page={props.applicationsPage}
                                    pagesCount={props.applicationsPagesCount}
                                    onClickDecrementPage={onClickDecrementApplicationsPage}
                                    onClickIncrementPage={onClickIncrementApplicationsPage}
                                    className='paginator'
                                />
                            </div>
                            {!props.loadingApplication && props.application && selectedApplicationID ? 
                                <div className='application-container'>
                                    <div className='header-container'>
                                        <h3 style={{marginRight: 10}}>Application</h3>
                                        <PillLabel
                                            title={capitalizeWords(props.application.status)}
                                            color={getApplicationStatusPillColor(
                                                props.application.status === 'applied' ?
                                                    'viewed'
                                                    : props.application.status
                                            )}
                                            size='l'
                                        />
                                    </div>
                                    <ApplicationSummaryCard
                                        displayName={props.application.candidate.displayName}
                                        includedLanguages={computedApplicantInformation.languages.has}
                                        excludedLanguages={computedApplicantInformation.languages.missing}
                                        includedSkills={computedApplicantInformation.skills.has}
                                        excludedSkills={computedApplicantInformation.skills.missing}
                                        applicantProfessionalYOE={computedApplicantInformation.yoe}
                                        applicantInternshipCount={computedApplicantInformation.internshipCount}
                                        style={{marginBottom: 30}}
                                    />
                                    <ResumeCard 
                                        isEditable={false}
                                        resumeURL={props.application.candidate.resumeURL}
                                        style={{marginBottom: 30}}
                                    />
                                    <div className='horizontal-section-container'>
                                        <GeneralCard
                                            email={props.application.candidate.email}
                                            phoneNumber={props.application.candidate.phoneNumber}
                                            address={props.application.candidate.address}
                                            birthdayDay={props.application.candidate.birthdayDay}
                                            birthdayMonth={props.application.candidate.birthdayMonth}
                                            birthdayYear={props.application.candidate.birthdayYear}
                                            isEditable={false}
                                            showSensitiveInformation={true}
                                            style={{flex: 1, marginRight: 15}}
                                        />
                                        <SocialsCard
                                            linkedInURL={props.application.candidate.linkedInURL}
                                            githubURL={props.application.candidate.githubURL}
                                            leetcodeURL={props.application.candidate.leetcodeURL}
                                            portfolioURL={props.application.candidate.portfolioURL}
                                            isEditable={false}
                                            style={{flex: 1, marginLeft: 15}}
                                        />
                                    </div>
                                    <EducationCard
                                        educations={props.application.candidate.educations}
                                        isEditable={false}
                                        style={{marginBottom: 30, flex: 1}}
                                    />
                                    <WorkExperienceCard
                                        workExperiences={props.application.candidate.workExperiences}
                                        isEditable={false}
                                        style={{marginBottom: 30}}
                                    />
                                    {props.application.job.questions.length ?
                                        <QuestionsCard
                                            questions={questionsAndAnswers}
                                            isEditable={false}
                                            style={{marginBottom: 30}}
                                        />
                                        : null
                                    }
                                    <ProjectCard
                                        projects={props.application.candidate.projects}
                                        isEditable={false}
                                        style={{marginBottom: 50}}
                                    />
                                </div>
                                : selectedApplicationID ? 
                                    <div className='loading-applications-container'>
                                        <Loading style={{height: 50}} />
                                    </div>
                                : <div className='no-results-container'>
                                    <h3>No results</h3>
                                </div>
                            }
                        </div>
                        : <div className='loading-jobs-container'>
                            <Loading style={{height: 50}} />
                        </div>
                    }
                </Root>
            </FixedBodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    overflow: hidden;

    & .search-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 20px;
        box-sizing: border-box;
    }

    & .search-left-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    & .search-right-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
    }

    & .action-buttons-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 15px;
    }

    & .search-bar {
        width: 310px;
        margin-bottom: 15px;
    }
    &.mobile .search-bar {
        width: 100% !important;
    }

    & .filters-row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .pills-container {
        display: flex;
        align-items: center;
        overflow: scroll;
    }
    & .pills-container::-webkit-scrollbar {
        display: none !important;
    }
    & .pills-container {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
    }
    & .pills-container {
        scroll-behavior: smooth;
    }
    & .pills-container div {
        margin-right: 10px;
    }
    & .pills-container div:last-child {
        margin-right: none;
    }

    & .applications-container {
        width: 100%;
        min-height: calc(100% - 100px);
        max-height: calc(100% - 100px);
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex: 1;
    }

    & .applications-list-container {
        display: flex;
        flex-direction :column;
        justify-content: flex-start;
        align-items: stretch;
        overflow: hidden !important;
        width: 350px;
        min-width: 350px;
        margin-right: 30px;
        margin-bottom: 30px;
        box-sizing: border-box;
    }

    & .applications-items-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex: 1;
        overflow: scroll;
        margin-bottom: 20px;
    }

    & .paginator {
        align-self: center;
    }

    & .loading-applications-container {
        display: flex;
        flex: 1;
        algn-items: center;
        justify-content: space-around;
    }

    & .no-results-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
    }

    & .application-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        min-height: 100%;
        max-height: 100%;
        padding-bottom: 30px;
        box-sizing: border-box;
        padding-bottom: 0px;
        overflow: scroll;
        flex: 1;
    }

    & .horizontal-section-container {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: flex-start;
        margin-bottom: 30px;
    }

    & .header-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 15px;
    }
`
const mapStateToProps = state => ({
    application: getApplication(state),
    loadingApplication: getLoadingApplication(state),
    applicationNotFound: getApplicationNotFound(state),
    applications: getApplications(state),
    loadingApplications: getLoadingApplications(state),
    applicationsPage: getApplicationsPage(state),
    applicationsPagesCount: getApplicationsPagesCount(state),
    isRecruiterMode: getIsRecruiterMode(state),
    mongoUser: getMongoUser(state),
    applicationsFilters: getApplicationsFilters(state),
    job: getJob(state),
    loadingJob: getLoadingJob(state),
    jobNotFound: getJobNotFound(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchApplication,
    fetchApplications,
    setApplicationsPage,
    updateApplicationStatus,
    fetchJob,
    addModal,
    addMessage,
}, dispatch)

export const ReviewApplications = connect(mapStateToProps, mapDispatchToProps)(ReviewApplicationsComponent)