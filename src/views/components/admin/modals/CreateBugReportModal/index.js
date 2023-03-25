import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { postBugReport } from '../../../../../redux/admin'
import { Confirm } from '../../../modals/Confirm'

export const CreateBugReportModalComponent = props => {
    const {
        modalID, // automatically added

        ...rest
    } = props
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onChangeTitle = e => setTitle(e.target.value)

    const onChangeDescription = e => setDescription(e.target.value)

    const onClickReport = onSuccess => {
        props.postBugReport({title, description}, onSuccess)
    }

    return (
        <Confirm
            {...rest}
            title='Report a Bug'
            message='Describe the issue that occurred.'
            confirmButtonTitle='Report'
            confirmButtonDisabled={!title || !description}
            onConfirm={onClickReport}
            modalID={modalID}
        >
            <Container>
                <label>Title</label>
                <input value={title} onChange={onChangeTitle} className='title'/>
                <label>Description</label>
                <textarea value={description} onChange={onChangeDescription} className='description'/>
            </Container>
        </Confirm>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & input.title {
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc};
        margin-bottom: 20px;
    }

    & textarea.description {
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc};
        height: 200px;
        width: 100% !important;
        box-sizing: border-box;
    }
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    postBugReport
}, dispatch)

export const CreateBugReportModal = connect(mapStateToProps, mapDispatchToProps)(CreateBugReportModalComponent)