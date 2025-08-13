import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { 
    getMongoUser,

    patchUser,
    fetchProfileUser,
} from '../../../../redux/user'
import { addModal } from '../../../../redux/modal'
import { getIsMobile } from '../../../../redux/theme'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { capitalizeWords } from '../../../../utils'
import { EducationLevels } from '../../job/EditJobCard'
import { Months } from '../modals/EditEducationModal'
import { IconButton } from '../../common/IconButton'

export const EducationCardComponent = props => {
    const {
        educations=[],
        isEditable, 

        ...rest
    } = props

    const onClickAdd = () => {
        props.addModal(ModalTypes.EDIT_EDUCATION, {isEditMode: false})
    }

    const onClickEditEducation = educationID => {
        const education = educations.find(education => education.id === educationID)
        props.addModal(ModalTypes.EDIT_EDUCATION, {
            isEditMode: true,
            education,
        })
    }

    const onClickDeleteEducation = educationID => {
        props.addModal(ModalTypes.CONFIRM, {
            title: 'Delete Education',
            message: 'Are you sure you want to delete this education?',
            confirmButtonTitle: 'Delete',
            isDanger: true,
            onConfirm: (onSuccess, onFailure) => {
                const onDeleteSuccess = () => {
                    props.fetchProfileUser(props.mongoUser._id)
                    onSuccess()
                }

                const eds = educations.filter( we => we.id !== educationID )
                props.patchUser({educations: eds}, onDeleteSuccess, onFailure)
            }
        })
    }

    return (
        <Root className={`of-visible-float-container ${props.isMobile && 'mobile'}`} {...rest}>
            <div className='education-main-header'>
                <h3>Education</h3>
                {isEditable ?
                    <IconButton
                        icon='bi-plus'
                        size='m'
                        color='tint'
                        onClick={onClickAdd}
                        style={{marginRight: 10}}
                    />
                    : null
                }
            </div>
            {educations.length == 0 ?
                <div className='no-results-container'>
                    <p>No education to show</p>
                </div>
                : null
            }
            {educations.map( ({school, degree, fieldOfStudy, startMonth, startYear, endMonth, endYear, isCurrent, id}) => (
                <div key={id} className='education-container'>
                    <div className='education-header'>
                        <h4>{school}</h4>
                        {isEditable ?
                            <div className='buttons-container'>
                                <IconButton
                                    icon='bi-pencil'
                                    size='s'
                                    color='tint'
                                    onClick={() => onClickEditEducation(id)}
                                    style={{marginRight: 10}}
                                />
                                <IconButton
                                    icon='bi-trash'
                                    size='s'
                                    color='tint'
                                    onClick={() => onClickDeleteEducation(id)}
                                />
                            </div>
                            : null
                        }
                    </div>
                    <p className='degree-text'>{`${EducationLevels.find( ({id}) => id === degree).title}, ${fieldOfStudy}`}</p>
                    <p className='time-text'>{`${capitalizeWords(Months.find(month => month.id === startMonth).title)} ${startYear} - ${isCurrent ? 'Present' : `${capitalizeWords(Months.find(month => month.id === endMonth).title)} ${endYear}`}`}</p>
                </div>
            ))}
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 30px;

    &.mobile {
        padding: 20px;
    }

    & .no-results-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    & .no-results-container p {
        color: ${p => p.theme.textSecondary};
    }

    & .education-main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .education-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 15px;
        padding-top: 15px;
        border-bottom: 1px solid ${p => p.theme.bc};
    }
    & .education-container:last-child {
        border-bottom: none;
    }

    & .education-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    & .degree-text {
        margin-bottom: 5px;
    }

    & .time-text {
        color: ${p => p.theme.textSecondary};
    }

    & .buttons-container {
        display: inline-flex;
        align-items: center;
        margin-left: 10px;
    }
`

const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addModal,
    patchUser,
    fetchProfileUser
}, dispatch)

export const EducationCard = connect(mapStateToProps, mapDispatchToProps)(EducationCardComponent)