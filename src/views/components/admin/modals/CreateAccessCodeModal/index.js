import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { postAccessCode } from '../../../../../redux/project'
import { Confirm } from '../../../modals/Confirm'

export const CreateAccessCodeModalComponent = props => {
    const {
        modalID, // automatically added

        ...rest
    } = props
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onChangeTitle = e => setTitle(e.target.value)

    const onClickCreate = (onSuccess, onFailure) => {
        props.postAccessCode(title, onSuccess, onFailure)
    }

    return (
        <Confirm
            {...rest}
            title='Create an Access Code'
            message='Enter the name of the project below.'
            confirmButtonTitle='Create'
            confirmButtonDisabled={!title}
            onConfirm={onClickCreate}
            modalID={modalID}
        >
            <Container>
                <label>Title</label>
                <input value={title} onChange={onChangeTitle} className='title'/>
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
    postAccessCode
}, dispatch)

export const CreateAccessCodeModal = connect(mapStateToProps, mapDispatchToProps)(CreateAccessCodeModalComponent)