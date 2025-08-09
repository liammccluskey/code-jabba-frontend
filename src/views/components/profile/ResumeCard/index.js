import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { Button } from '../../common/Button'
import { IconButton } from '../../common/IconButton'

export const ResumeCard = props => {
    const {
        isEditable,
        resumeURL,

        onClickEdit, // () => void

        ...rest
    } = props

    const onClickViewResume = () => {
        window.open(resumeURL, '_blank')
    }

    return (
        <Root className='float-container' {...rest}>
            <div className='resume-header'>
                <h3>Resume</h3>
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
            {resumeURL ?
                <Button
                    title='View resume'
                    type='clear'
                    priority={2}
                    onClick={onClickViewResume}
                />
                : <div className='no-resume-container'>
                    <p>No resume to show</p>
                </div>
            }
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;

    & .resume-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .no-resume-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    & .no-resume-container p {
        color: ${p => p.theme.textSecondary};
    }
`