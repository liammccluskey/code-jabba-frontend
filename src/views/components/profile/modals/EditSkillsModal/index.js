import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { 
    getMongoUser,

    patchUser,
    fetchProfileUser,
    fetchThisMongoUser
} from '../../../../../redux/user'
import { Skills } from '../../../job/EditJobCard'
import { Confirm } from '../../../modals/Confirm'
import { SearchableSelectableInput } from '../../../common/SearchableSelectableInput'
import { InputWithMessage } from '../../../common/InputWithMessage'


export const EditSkillsModalComponent = props => {
    const {
        modalID,
    } = props
    const [formData, setFormData] = useState({
        skills: props.mongoUser.skills,
        skill: '',
    })
    const [modified, setModified] = useState(false)

    useEffect(() => {
        setModified(formData.skills !== props.mongoUser.skills)
    }, [formData.skills])

    const onClickSave = (onSuccess, onFailure) => {
        const onSaveSuccess = () => {
            props.fetchProfileUser(props.mongoUser._id)
            props.fetchThisMongoUser(undefined, onSuccess, onFailure)
        }

        props.patchUser({skills: formData.skills}, onSaveSuccess, onFailure)
    }

    const onChangeSkill = e => {
        setFormData(curr => ({
            ...curr,
            skill: e.target.value
        }))
    }

    const onClickSkillOption = option => {
        if (formData.skills.includes(option)) {
            setFormData(curr => ({
                ...curr,
                skills: curr.skills.filter(skill => skill !== option)
            }))
        } else {
            setFormData(curr => ({
                ...curr,
                skills: [...curr.skills, option]
            }))
        }
    }

    return (
        <Confirm
            title='Edit Skills'
            confirmButtonTitle='Save'
            confirmButtonDisabled={formData.skills.length == 0}
            onConfirm={onClickSave}
            modalID={modalID}
        >
            <Container>
                <InputWithMessage
                    label='Skills'
                    modified={modified}
                    style={{marginBottom: 0}}
                />
                <SearchableSelectableInput
                    options={Skills}
                    selectedOptions={formData.skills}
                    value={formData.skill}
                    fieldName='skill'
                    onChange={onChangeSkill}
                    onClickOption={onClickSkillOption}
                />
            </Container>
        </Confirm>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    height: auto;
`
const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    patchUser,
    fetchProfileUser,
    fetchThisMongoUser
}, dispatch)

export const EditSkillsModal = connect(mapStateToProps, mapDispatchToProps)(EditSkillsModalComponent)