import React from 'react'
import styled from 'styled-components'
import {useNavigate, Link} from 'react-router-dom'

import {Button} from '../../common/Button'

export const LandingHeader = props => {
    const {
        showButtons=true
    } = props

    const navigate = useNavigate()

    const onClickLogo = () => navigate('/')

    const onClickLogIn = () => navigate('/login')

    const onClickSignUp = () => navigate('/register')

    return (
        <Root className='d-flex fd-row jc-space-between ai-center'>
            <div
                className='d-flex fd-row jc-flex-start ai-center'
                onClick={onClickLogo}
                style={{cursor: 'pointer'}}
            >
                <img className='logo-icon'
                    src='/images/logo.png'
                    height={35}
                    width={35}
                />
                <h3 className='logo-text'>
                    {process.env.REACT_APP_SITE_NAME}
                </h3>
            </div>
            {showButtons ?
                <div className='d-flex jc-flex-end ai-center'>
                    <Button
                        type='clear'
                        priority={1}
                        onClick={onClickLogIn}
                        title='Log In'
                        style={{marginRight: 15}}
                        className='fw-m'
                    />
                    <Button
                        type='solid'
                        priority={1}
                        onClick={onClickSignUp}
                        title='Sign Up'
                        className='fw-m'
                    />
                </div>
                : null
            }
            
        </Root>
    )
}

const Root = styled.div`
    background-color: ${props => props.theme.bgcNav};
    min-height: var(--h-mainheader);
    padding: 0px var(--ps-mainheader);
    box-shadow: ${p => p.theme.boxShadow};
    box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);
    width: 100%;
    box-sizing: border-box;

    & .logo-icon {
        border-radius: 50%;
        margin-right: 10px;
    }

    & .logo-text {
        font-weight: 600;
        cursor: pointer;
    }
`

const PageLink = styled(Link)`
    color: ${p => p.theme.textPrimary};
    font-weight: 400;
    font-size: 15px;
    text-decoration: none;
    margin-right: 25px;

    & :hover,
    & .active {
        background-color: ${p => p.theme.tint}
    }
`