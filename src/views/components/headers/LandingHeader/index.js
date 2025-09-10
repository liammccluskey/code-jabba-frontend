import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useNavigate, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'

import { 
    getIsRecruiterMode,

    setIsRecruiterMode
} from '../../../../redux/user'
import { getIsSemiMobile } from '../../../../redux/theme'
import { Button } from '../../common/Button'
import { LinksMenu } from '../../landing/menus/LinksMenu'
import { Tooltip } from '../../common/Tooltip'
import { Pill } from '../../common/Pill'

const PageLinks = [
    {
        name: 'Home',
        url: '/',
        icon: 'bi-house',
        id: '',
    },
    {
        name: 'Support',
        url: '/support',
        icon: 'bi-question-circle',
        id: 'support'
    },
    {
        name: 'Contact Us',
        url: '/contact-us',
        icon: 'bi-mailbox',
        id: 'contact-us'
    },
]

export const LandingHeaderComponent = props => {
    const {
        showButtons=true,
        hasSubheaderBelow=false,
        ...rest
    } = props
    const navigate = useNavigate()
    const [linksMenuHidden, setLinksMenuHidden] = useState(true)

    const activeLinkID = window.location.pathname.split('/')[1]

    useEffect(() => {
        setLinksMenuHidden(true)
    }, [props.isSemiMobile])

    // Direct

    const onClickLogo = () => navigate('/')

    const onClickLogIn = () => navigate('/login')

    const onClickSignUp = () => navigate('/register')

    const onClickSwitchModePill = () => {
        props.setIsRecruiterMode(!props.isRecruiterMode)
    }

    return (
        <Root {...rest} className={`${!hasSubheaderBelow && 'no-subheader'}`}>
            <div
                className='d-flex jc-flex-start ai-center'
                onClick={onClickLogo}
                style={{cursor: 'pointer'}}
            >
                <img className='logo-icon'
                    src='/images/logo.svg'
                    height={35}
                    width={35}
                />
                <h3 className='logo-text'>
                    {process.env.REACT_APP_SITE_NAME}
                </h3>
            </div>
            <div className='right-container'>
                <Tooltip
                    title={props.isRecruiterMode ? 'Switch to candidate mode' : 'Switch to recruiter mode'}
                    marginTop={35}
                    style={{marginRight: 15}}
                >
                    <Pill
                        title={props.isRecruiterMode ? 'Recruiter' : 'Candidate'}
                        active={true}
                        
                        onClick={onClickSwitchModePill}
                    />
                </Tooltip> 
                {props.isSemiMobile ?
                    <LinksMenu
                        menuHidden={linksMenuHidden}
                        setMenuHidden={setLinksMenuHidden}
                        pageLinks={PageLinks}
                        style={{marginRight: 15}}
                    />
                    : <div className='links-container'>
                        {PageLinks.map( ({name, url, id}) => (
                            <PageLink
                                key={id}
                                to={url}
                                className={id === activeLinkID ? 'active' : ''}
                            >
                                {name}
                            </PageLink>
                        ))}
                        {showButtons ?
                            <div className='d-flex jc-flex-end ai-center'>
                                <Button
                                    type='clear'
                                    priority={1}
                                    onClick={onClickLogIn}
                                    title='Log In'
                                    style={{marginRight: 15}}
                                />
                                <Button
                                    type='solid'
                                    priority={1}
                                    onClick={onClickSignUp}
                                    title='Sign Up'
                                />
                            </div>
                            : null
                        }
                    </div>
                }
            </div>
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.bgcNav};
    min-height: var(--h-mainheader);
    padding: 0px var(--ps-mainheader);
    box-shadow: ${p => p.theme.boxShadow};
    box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);
    width: 100%;
    box-sizing: border-box;
    
    &.no-subheader {
        position: sticky;
        top: 0px;
    }

    & .logo-icon {
        margin-right: 15px;
    }

    & .logo-text {
        font-weight: 600;
        cursor: pointer;
    }

    & .links-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    & .right-container {
        display: flex;
        align-items: center;
    }
`

const PageLink = styled(Link)`
    color: ${p => p.theme.textPrimary};
    font-weight: 400;
    font-size: 15px;
    text-decoration: none;
    margin-right: 15px;

    &:hover,
    &.active {
        color: ${p => p.theme.tint};
    }
`

const mapStateToProps = state => ({
    isSemiMobile: getIsSemiMobile(state),
    isRecruiterMode: getIsRecruiterMode(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsRecruiterMode
}, dispatch)

export const LandingHeader = connect(mapStateToProps, mapDispatchToProps)(LandingHeaderComponent)
