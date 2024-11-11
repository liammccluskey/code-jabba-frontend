import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getModalStack } from '../../redux/modal'
import { Confirm } from '../../views/components/modals/Confirm'
import { CreateNewAdminModal } from '../../views/components/admin/modals/CreateNewAdminModal'
import { CreateBugReportModal } from '../../views/components/admin/modals/CreateBugReportModal'
import { CreateFAQModal } from '../../views/components/admin/modals/CreateFAQModal'
import { EditGeneralModal } from '../../views/components/profile/modals/EditGeneralModal'
import { EditSocialsModal } from '../../views/components/profile/modals/EditSocialsModal'
import { EditResumeModal } from '../../views/components/profile/modals/EditResumeModal'
import { EditLanguagesModal } from '../../views/components/profile/modals/EditLanguagesModal'
import { EditSkillsModal } from '../../views/components/profile/modals/EditSkillsModal'
import { EditEducationModal } from '../../views/components/profile/modals/EditEducationModal'
import { EditWorkExperienceModal } from '../../views/components/profile/modals/EditWorkExperienceModal'
import { EditProjectModal } from '../../views/components/profile/modals/EditProjectModal'
import { EditQuestionsModal } from '../../views/components/profile/modals/EditQuestionsModal'
import { ViewRewardsModal } from '../../views/components/rewards/modals/ViewRewardsModal'
import { ShareReferralModal } from '../../views/components/rewards/modals/ShareReferralModal'

export const ModalTypes = {
    CONFIRM: 'confirm',
    CREATE_NEW_ADMIN: 'create-new-admin',
    CREATE_BUG_REPORT: 'create-bug-report',
    CREATE_FAQ: 'create-faq',
    EDIT_PROFILE: 'edit-profile',
    EDIT_RESUME: 'edit-resume',
    EDIT_GENERAL: 'edit-general',
    EDIT_SOCIALS: 'edit-socials',
    EDIT_LANGUAGES: 'edit-languages',
    EDIT_SKILLS: 'edit-skills',
    EDIT_EDUCATION: 'edit-education',
    EDIT_WORK_EXPERIENCE: 'edit-work-experience',
    EDIT_PROJECT: 'edit-project',
    EDIT_QUESTIONS: 'edit-questions',
    VIEW_REWARD: 'view-reward',
    SHARE_REFERRAL: 'share-referral',
}

export const ModalProviderComponent = props => {
    const {
        children
    } = props

    // Utils

    const renderModal = (modalType, modalProps, modalID) => {
        switch (modalType) {
            case ModalTypes.CONFIRM:
                return <Confirm {...modalProps} key={modalID}/>
            case ModalTypes.CREATE_NEW_ADMIN:
                return <CreateNewAdminModal {...modalProps} key={modalID} />
            case ModalTypes.CREATE_BUG_REPORT:
                return <CreateBugReportModal {...modalProps} key={modalID} />
            case ModalTypes.CREATE_FAQ:
                return <CreateFAQModal {...modalProps} key={modalID} />
            case ModalTypes.EDIT_RESUME:
                return <EditResumeModal {...modalProps} key={modalID} />
            case ModalTypes.EDIT_GENERAL:
                return <EditGeneralModal {...modalProps} key={modalID} />
            case ModalTypes.EDIT_SOCIALS:
                return <EditSocialsModal {...modalProps} key={modalID} />
            case ModalTypes.EDIT_LANGUAGES:
                return <EditLanguagesModal {...modalProps} key={modalID} />
            case ModalTypes.EDIT_SKILLS:
                return <EditSkillsModal {...modalProps} key={modalID} />
            case ModalTypes.EDIT_EDUCATION:
                return <EditEducationModal {...modalProps} key={modalID} />
            case ModalTypes.EDIT_WORK_EXPERIENCE:
                return <EditWorkExperienceModal {...modalProps} key={modalID} />
            case ModalTypes.EDIT_PROJECT:
                return <EditProjectModal {...modalProps} key={modalID} />
            case ModalTypes.EDIT_QUESTIONS:
                return <EditQuestionsModal {...modalProps} key={modalID} />
            case ModalTypes.VIEW_REWARD:
                return <ViewRewardsModal {...modalProps} key={modalID} />
            case ModalTypes.SHARE_REFERRAL:
                return <ShareReferralModal {...modalProps} key={modalID} />
            default:
                return null
        }
    }

    return (
        <Root>
            {children}
            {props.modalStack.map( ({type, props, id}, i) => (
                <div
                    className='fullscreen-blur animation-fade-in'
                    style={{zIndex: 20 + i}}
                    key={`container-${id}`}
                >
                    {renderModal(type, props, id)}
                </div>
            ))}
        </Root>
    )
}

const Root = styled.div`
    .fullscreen-blur {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0px;
        right: 0px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        //backdrop-filter: blur(3px) brightness(50%);
        backdrop-filter: brightness(50%);
    }
`
const mapStateToProps = state => ({
    modalStack: getModalStack(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const ModalProvider = connect(mapStateToProps, mapDispatchToProps)(ModalProviderComponent)