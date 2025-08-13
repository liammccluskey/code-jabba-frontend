import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getIsMobile } from '../../../../redux/theme'
import { addModal } from '../../../../redux/modal'
import { ModalTypes } from '../../../../containers/ModalProvider'
import { IconButton } from '../../common/IconButton'

export const QuestionsCardComponent = props => {
    const {
        questions=[], // [{title, answer, id}]
        isEditable,

        ...rest
    } = props

    const onClickEdit = () => {
        props.addModal(ModalTypes.EDIT_QUESTIONS)
    }

    return (
        <Root className={`of-visible-float-container ${props.isMobile && 'mobile'}`} {...rest}>
            <div className='questions-header'>
                <h3>Questions</h3>
                {isEditable ?
                    <IconButton
                        icon='bi-pencil'
                        size='s'
                        color='tint'
                        onClick={onClickEdit}
                    />
                    : null
                }
            </div>
            {questions.map( ({id, title, answer}) => (
                <div className='question-container' key={id}>
                    <label>{title}</label>
                    <p>{answer}</p>
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

    & .questions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    & .question-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-bottom: 15px;
    }
    & label {
        margin-bottom: 5px;
    }
    & .question-container p {
        color: ${p => p.theme.textSecondary};
    }

    & no-results-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    & no-results-container p {
        color: ${p => p.theme.textSecondary};
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addModal
}, dispatch)

export const QuestionsCard = connect(mapStateToProps, mapDispatchToProps)(QuestionsCardComponent)