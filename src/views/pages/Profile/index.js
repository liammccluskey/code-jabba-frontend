import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { 
    useNavigate,
    useParams
} from 'react-router-dom'

import { 
    getMongoUser,
    getProfileUser,
    getLoadingProfileUser,
    getProfileUserNotFound,

    fetchProfileUser,
    patchUser,
    fetchThisMongoUser
} from '../../../redux/user'
import { getIsMobile } from '../../../redux/theme'
import { addModal } from '../../../redux/modal'
import { ModalTypes } from '../../../containers/ModalProvider'
import { Questions } from '../../components/job/EditJobCard'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { ErrorElement } from '../ErrorElement'
import { Loading } from '../../components/common/Loading'
import { ItemsCard } from '../../components/profile/ItemsCard'
import { GeneralCard } from '../../components/profile/GeneralCard'
import { SocialsCard } from '../../components/profile/SocialsCard'
import { EducationCard } from '../../components/profile/EducationCard'
import { WorkExperienceCard } from '../../components/profile/WorkExperienceCard'
import { ProjectCard } from '../../components/profile/ProjectCard'
import { ResumeCard } from '../../components/profile/ResumeCard'
import { PillOptions } from '../../components/common/PillOptions'
import { QuestionsCard } from '../../components/profile/QuestionsCard'
import { Button } from '../../components/common/Button'

const UserOptions = [
    {title: 'Recruiter', id: 'recruiter'},
    {title: 'Candidate', id: 'candidate'},
]

export const ProfileComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const {userID} = useParams()

    const isThisUser = !props.loadingProfileUser && props.profileUser ?
        props.mongoUser._id === props.profileUser._id
        : false

    const questions = !props.loadingProfileUser && props.profileUser ? Questions.map(({id, title, inputType, options}) => {
        const question = props.profileUser.questions.find(q => q.id === id)
        return {
            id,
            title,
            answer: question ?
                inputType === 'select' ?
                    options.find(option => option.id === question.answer).title
                    : question.answer
                : 'No answer'
        }
    }) : []

    useEffect(() => {
        props.fetchProfileUser(userID)
    }, [userID])

    const onClickEditProfile = () => {
        navigate('/settings')
    }

    const onClickEditResume = () => {
        props.addModal(ModalTypes.EDIT_RESUME)
    }

    const onClickEditGeneral = () => {
        props.addModal(ModalTypes.EDIT_GENERAL)
    }

    const onClickEditSocials = () => {
        props.addModal(ModalTypes.EDIT_SOCIALS)
    }

    const onClickEditLanguages = () => {
        props.addModal(ModalTypes.EDIT_LANGUAGES)
    }

    const onClickEditSkills = () => {
        props.addModal(ModalTypes.EDIT_SKILLS)
    }

    const onClickPill = pillID => {
        const onPatchSuccess = () => {
            props.fetchProfileUser(props.mongoUser._id)
            props.fetchThisMongoUser(undefined, undefined, undefined, true)
        }

        switch (pillID) {
            case 'candidate':
                props.patchUser({isRecruiter: false}, onPatchSuccess)
                break
            case 'recruiter':
                props.patchUser({isRecruiter: true}, onPatchSuccess)
                break
        }
    }

    return (props.profileUserNotFound ?
        <ErrorElement />
        : <PageContainer>
            <MainHeader />
            {!props.loadingProfileUser && props.profileUser ? 
                <Subheader
                    title={props.profileUser.displayName} 
                    imageURL={props.profileUser.photoURL}
                    showUserIcon={true}
                    headerChildren={isThisUser ?
                        <PillOptions
                            options={UserOptions}
                            activeOptionID={props.profileUser.isRecruiter ? 'recruiter' : 'candidate'}
                            onClickOption={onClickPill}
                            style={{marginTop: 5}}
                        />
                        : <Subtitle>{props.profileUser.isRecruiter ? 'Recruiter' : 'Candidate'}</Subtitle>
                    }
                >
                    <Button
                        title='Edit profile'
                        priority={3}
                        type='clear'
                        onClick={onClickEditProfile}
                    />
                </Subheader>
                : null
            }
            <BodyContainer>
                {!props.loadingProfileUser && props.profileUser ?
                    props.profileUser.isRecruiter ?
                        <Recruiter className={`${props.isMobile && 'mobile'}`}>
                            <div className='right-section'>
                                <SocialsCard
                                    linkedInURL={props.profileUser.linkedInURL}
                                    isEditable={isThisUser}
                                    showCandidateProfiles={false}
                                    onClickEdit={onClickEditSocials}
                                    style={{marginBottom: 30}}
                                />
                            </div>
                            <EducationCard
                                educations={props.profileUser.educations}
                                isEditable={isThisUser}
                                style={{marginBottom: 30}}
                            />
                        </Recruiter>
                        : <Candidate className={`${props.isMobile && 'mobile'}`}>
                            <div className='right-section'>
                                <ResumeCard 
                                    isEditable={isThisUser}
                                    resumeURL={props.profileUser.resumeURL}
                                    onClickEdit={onClickEditResume}
                                    style={{marginBottom: 30}}
                                />
                                <GeneralCard
                                    email={props.profileUser.email}
                                    phoneNumber={props.profileUser.phoneNumber}
                                    address={props.profileUser.address}
                                    birthdayDay={props.profileUser.birthdayDay}
                                    birthdayMonth={props.profileUser.birthdayMonth}
                                    birthdayYear={props.profileUser.birthdayYear}
                                    isEditable={isThisUser}
                                    showSensitiveInformation={isThisUser}
                                    onClickEdit={onClickEditGeneral}
                                    style={{marginBottom: 30}}
                                />
                                <SocialsCard
                                    linkedInURL={props.profileUser.linkedInURL}
                                    githubURL={props.profileUser.githubURL}
                                    leetcodeURL={props.profileUser.leetcodeURL}
                                    portfolioURL={props.profileUser.portfolioURL}
                                    isEditable={isThisUser}
                                    onClickEdit={onClickEditSocials}
                                    style={{marginBottom: 30}}
                                />
                                <ItemsCard
                                    title='Languages'
                                    includedItems={props.profileUser.languages}
                                    isEditable={isThisUser}
                                    onClickEdit={onClickEditLanguages}
                                    style={{marginBottom: 30}}
                                />
                                <ItemsCard
                                    title='Skills'
                                    includedItems={props.profileUser.skills}
                                    isEditable={isThisUser}
                                    onClickEdit={onClickEditSkills}
                                    style={{marginBottom: 30}}
                                />
                            </div>
                            <div className='left-section'>
                                <EducationCard
                                    educations={props.profileUser.educations}
                                    isEditable={isThisUser}
                                    style={{marginBottom: 30}}
                                />
                                <WorkExperienceCard
                                    workExperiences={props.profileUser.workExperiences}
                                    isEditable={isThisUser}
                                    style={{marginBottom: 30}}
                                />
                                <ProjectCard
                                    projects={props.profileUser.projects}
                                    isEditable={isThisUser}
                                    style={{marginBottom: 30}}
                                />
                                {isThisUser ?
                                    <QuestionsCard
                                        questions={questions}
                                        isEditable={isThisUser}
                                    />
                                    : null
                                }
                            </div>
                        </Candidate>
                    : <Loading />
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Candidate = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;

    &.mobile {
        grid-template-columns: 1fr;
    }

    & .right-section {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-right: 30px;
    }
    &.mobile .right-section {
        margin-right: 0px;
    }
    
    & .left-section {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    & .recruits-section {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
`

const Recruiter = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;

    &.mobile {
        grid-template-columns: 1fr;
    }

    & .right-section {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-right: 30px;
    }
    &.mobile .right-section {
        margin-right: 0px;
    }
    
    & .left-section {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    & .section-title {
        margin-bottom: 20px;
    }
`

const Subtitle = styled.p`
    color: ${p => p.theme.textSecondary} !important;
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    mongoUser: getMongoUser(state),
    profileUser: getProfileUser(state),
    loadingProfileUser: getLoadingProfileUser(state),
    profileUserNotFound: getProfileUserNotFound(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProfileUser,
    fetchThisMongoUser,
    patchUser,
    addModal
}, dispatch)

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)