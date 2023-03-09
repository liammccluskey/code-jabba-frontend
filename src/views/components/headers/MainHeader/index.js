import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useNavigate, Link} from 'react-router-dom'

const PageLinks = {
    dashboard: {
        name: 'Dashboard',
        url: '/dashboard',
        id: 'dashboard'
    },
}

export const MainHeader = () => {
    const navigate = useNavigate()
    const activeLinkID = window.location.pathname.split('/')[1]

    const onClickLogo = () => navigate('/')

    return (
        <Root className='d-flex jc-space-between ai-center'>
            <div
                className='d-flex jc-flex-start ai-center'
                onClick={onClickLogo}
            >
                <LogoIcon
                    src='/images/logo.png'
                    height={35}
                    width={35}
                />
                <LogoText>
                    {process.env.REACT_APP_SITE_NAME}
                </LogoText>
            </div>
            <div className='d-flex jc-flex-end ai-center'>
                {PageLinks.map( ({name, url, id}) => (
                    <PageLink
                        to={url}
                        className={id === activeLinkID ? 'active': ''}
                    >
                        {name}
                    </PageLink>
                ))}
            </div>
        </Root>
    )
}

const Root = styled.div`
    background-color: ${props => props.theme.bgcNav};
    height: var(--h-mainheader);
    padding: 0px var(--ps-mainheader);
`

const LogoIcon = styled.img`
    border-radius: 50%;
    margin-right: 10px;
`

const LogoText = styled.h3`
    text-transform: capitalize;
    font-weight: 400;
    letter-spacing: 1px;
    color: ${p => p.theme.textPrimary};
    cursor: pointer;
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