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
import { Languages } from '../../../job/EditJobCard'
import { Confirm } from '../../../modals/Confirm'
import { SearchableSelectableInput } from '../../../common/SearchableSelectableInput'
import { InputWithMessage } from '../../../common/InputWithMessage'


export const EditLanguagesModalComponent = props => {
    const {
        modalID,
    } = props
    const [formData, setFormData] = useState({
        languages: props.mongoUser.languages,
        language: '',
    })
    const [modified, setModified] = useState(false)

    useEffect(() => {
        setModified(formData.languages !== props.mongoUser.languages)
    }, [formData.languages])

    const onClickSave = (onSuccess, onFailure) => {
        const onSaveSuccess = () => {
            props.fetchProfileUser(props.mongoUser._id)
            props.fetchThisMongoUser(undefined, onSuccess, onFailure)
        }
        props.patchUser({languages: formData.languages}, onSaveSuccess, onFailure)
    }

    const onChangeLanguage = e => {
        setFormData(curr => ({
            ...curr,
            language: e.target.value
        }))
    }

    const onClickLanguageOption = option => {
        if (formData.languages.includes(option)) {
            setFormData(curr => ({
                ...curr,
                languages: curr.languages.filter(language => language !== option)
            }))
        } else {
            setFormData(curr => ({
                ...curr,
                languages: [...curr.languages, option]
            }))
        }
    }

    return (
        <Confirm
            title='Edit Languages'
            confirmButtonTitle='Save'
            confirmButtonDisabled={formData.languages.length == 0}
            onConfirm={onClickSave}
            modalID={modalID}
        >
            <Container>
                <InputWithMessage
                    label='Languages'
                    modified={modified}
                    style={{marginBottom: 0}}
                />
                <SearchableSelectableInput
                    options={Languages}
                    selectedOptions={formData.languages}
                    value={formData.language}
                    fieldName='language'
                    onChange={onChangeLanguage}
                    onClickOption={onClickLanguageOption}
                />
            </Container>
        </Confirm>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    height: 200px;
`
const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    patchUser,
    fetchProfileUser,
    fetchThisMongoUser
}, dispatch)

export const EditLanguagesModal = connect(mapStateToProps, mapDispatchToProps)(EditLanguagesModalComponent)