import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { addMessage } from '../../../../../redux/communication'

import { Confirm } from '../../../modals/Confirm'
import { InputWithMessage } from '../../../common/InputWithMessage'

export const SaveFilterModalComponent = props => {
    const {
        modalID,

        onSave, // (onSuccess, onFailure, title) => void
    } = props

    // State

    const [filterTitle, setfilterTitle] = useState('')
    const [hasError, setHasError] = useState(false)

    // Utils

    // Direct

    const onClickSave = (onSuccess, onFailure) => {
        if (filterTitle.length == 0) {
            setHasError(true)
            props.addMessage('The name of the filter cannot be blank.', true)
            onFailure()
            return
        }

        onSave(onSuccess, onFailure, filterTitle)
    }

    const onChangeText = e => {
        setfilterTitle(e.target.value)
        setHasError(false)
    }


    return (
        <Confirm
            title='Save filter'
            confirmButtonTitle='Save'
            confirmButtonDisabled={false}
            onConfirm={onClickSave}
            modalID={modalID}
        >
            <InputWithMessage
                inputType='text'
                label='Filter title'
                placeholder='Remote software engineer'
                fieldName='linkedInURL'
                text={filterTitle}
                onChangeText={onChangeText}
                hasError={hasError}
            />
        </Confirm>
    )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
    addMessage
}, dispatch)

export const SaveFilterModal = connect(mapStateToProps, mapDispatchToProps)(SaveFilterModalComponent)