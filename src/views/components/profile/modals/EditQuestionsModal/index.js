import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { 
    getMongoUser,

    fetchProfileUser,
    patchUser,
    fetchThisMongoUser
} from '../../../../../redux/user'
import { addMessage } from '../../../../../redux/communication'
import { Questions } from '../../../job/EditJobCard'
import { Confirm } from '../../../modals/Confirm'
import { InputWithMessage } from '../../../common/InputWithMessage'

export const EditQuestionsModalComponent = props => {
    const {
        modalID,
    } = props
    const [questions, setQuestions] = useState(Questions.map( ({id, title, options=null, inputType}) => {
        const question = props.mongoUser.questions.find( q => q.id === id )
        return {
            id,
            answer: question ?
                question.answer
                : inputType === 'select' ?
                    options[0].id
                    : ''
        }
    }))
    const [errors, setErrors] = useState(Object.fromEntries(
        Questions.filter(({inputType}) => inputType !== 'select')
        .map(({id}) => [id, false])
    ))

    useEffect(() => {
        console.log(JSON.stringify(
            {questions}
        , null, 4))
    }, [questions])

    // Utils

    const updateError = (fieldName, hasError) => {
        setErrors(curr => ({
            ...curr,
            [fieldName]: hasError
        }))
    }

    const validateForm = () => {
        let hasError = false
        const keys = Object.keys(errors)

        keys.forEach( key => {
            const question = questions.find(q => q.id === key)
   
            if (!question.answer) {
                updateError(key, true)
                hasError = true
            }
        })

        return hasError
    }

    // Direct

    const onClickSave = (onSuccess, onFailure) => {
        if (validateForm()) {
            props.addMessage('You are missing one or more required fields.', true)
            onFailure()
            return
        }

        const onSaveSuccess = () => {
            props.fetchProfileUser(props.mongoUser._id)
            props.fetchThisMongoUser(undefined, onSuccess, onFailure)
        }

        props.patchUser({questions}, onSaveSuccess, onFailure)
    }

    const onChangeField = e => {
        const {name, value} = e.target

        setQuestions(curr => curr.map( ({id, answer}) => id === name ?
            {id, answer: value}
            : {id, answer}
        ))
    }

    return (
        <Confirm
            title='Edit Questions'
            confirmButtonTitle='Save'
            confirmButtonDisabled={false}
            onConfirm={onClickSave}
            modalID={modalID}
            style={{overflow: 'scroll'}}
        >
            <Container>
                {Questions.map(({id, title, inputType, options=null}) => {
                    const question = questions.find(q => q.id === id)
                    const {answer} = question

                    return inputType === 'select' ?
                        <InputWithMessage
                            label={title}
                            inputType='select'
                            fieldName={id}
                            selectValue={answer}
                            selectValues={options}
                            onChangeSelectValue={onChangeField}
                            wrapLabel={true}
                        />
                    : inputType === 'text' || inputType === 'textarea' ?
                        <InputWithMessage
                            label={title}
                            inputType={inputType}
                            fieldName={id}
                            text={answer}
                            onChangeText={onChangeField}
                            hasError={errors[id]}
                            wrapLabel={true}
                        />
                    : null
                })}
            </Container>
        </Confirm>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .question-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
`
const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProfileUser,
    patchUser,
    addMessage,
    fetchThisMongoUser
}, dispatch)

export const EditQuestionsModal = connect(mapStateToProps, mapDispatchToProps)(EditQuestionsModalComponent)