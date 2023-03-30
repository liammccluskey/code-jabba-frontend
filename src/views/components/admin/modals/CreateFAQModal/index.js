import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { postFAQ } from '../../../../../redux/admin'
import { FAQSections } from '../../../../pages/admin/FAQ'
import { Confirm } from '../../../modals/Confirm'

export const CreateFAQModalComponent = props => {
    const {
        modalID, // Automatically added
    } = props
    const [sectionID, setSectionID] = useState(FAQSections[0].id)
    const [title, setTitle] = useState('')
    const [answer, setAnswer] = useState('')

    const onChangeSectionID = e => {
        setSectionID(e.target.value)
    }

    const onChangeTitle = e => {
        setTitle(e.target.value)
    }

    const onChangeAnswer = e => {
        setAnswer(e.target.value)
    }

    const onSubmit = (onSuccess, onFailure) => {
       props.postFAQ({title, section: sectionID, answer}, onSuccess, onFailure)
    }

    return (
        <Confirm
            title='Create an FAQ'
            message='Create a new frequently asked question.'
            confirmButtonTitle='Create'
            confirmButtonDisabled={!title || !answer}
            onConfirm={onSubmit}
            modalID={modalID}
        >
            <Container>
                <label>Title</label>
                <input value={title} onChange={onChangeTitle} />
                <label>Section</label>
                <select value={sectionID} onChange={onChangeSectionID}>
                    {FAQSections.map( ({title, id}) => (
                        <option value={id} key={id}>{title}</option>
                    ))}
                </select>
                <label>Answer</label>
                <textarea value={answer} onChange={onChangeAnswer} />
            </Container>
        </Confirm>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & input {
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc} !important;
        margin-bottom: 20px;
    }

    & select {
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc} !important;
        margin-bottom: 20px;
    }

    & textarea {
        width: 100% !important;
        height: 150px;
        box-sizing: border-box;
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc} !important;
    }
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    postFAQ
}, dispatch)

export const CreateFAQModal = connect(mapStateToProps, mapDispatchToProps)(CreateFAQModalComponent)