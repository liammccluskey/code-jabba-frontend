import React, {useState} from 'react'
import styled from 'styled-components'

import { IconButton } from '../IconButton'

export const ErrorLabel = props => {
    const {
        errorText, // string
    } = props

    const [noticeVisible, setNoticeVisible] = useState(true)

    const onClickCloseNotice = () => setNoticeVisible(false)

    return (noticeVisible ? 
        <Root className='notice-label'>
            <p className='notice-text'>{errorText}</p>
            <IconButton
                icon='bi-x'
                size='m'
                color='error'
                onClick={onClickCloseNotice}
            />
        </Root>
        : null
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid ${p => p.theme.error};
    background-color: ${p => p.theme.errorTranslucent};
    margin-bottom: 30px;

    & .notice-text {
        color: ${p => p.theme.error};
    }

    & .notice-label i {
        color: ${p => p.theme.error};
        font-size: 30px;
    }
`