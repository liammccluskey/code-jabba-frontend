import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useNavigate, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getIsMobile } from '../../../../redux/theme'
import {
    getHasAdminPrivileges,
    getIsPremiumUser,
    getIsRecruiterMode,
    setIsRecruiterMode
} from '../../../../redux/user'
import { MainMenu } from '../MainMenu'
import { LinksMenu } from '../LinksMenu'
import { NotificationsMenu } from '../NotificationsMenu'
import { Pill } from '../../common/Pill'
import { Tooltip } from '../../common/Tooltip'

export const getMainPageLinks = (hasAdminPrivileges, isRecruiterMode) => [
    {
        name: 'Dashboard',
        url: '/dashboard',
        id: 'dashboard',
        icon: 'bi-house'
    },
    ...( isRecruiterMode ? [

        ]
        : [
            {
                name: 'Jobs',
                url: '/jobs',
                id: 'jobs',
                icon: 'bi-briefcase'
            },
        ]
    ),
    {
        name: 'Companies',
        url: '/companies',
        id: 'companies',
        icon: 'bi-globe2'
    },
    ...( hasAdminPrivileges ?
        [
            {
                name: 'Admin',
                url: '/admin',
                id: 'admin',
                icon: 'bi-person-circle'
            }
        ]
        : []
    ),
]

export const getMainMenuPageLinks = isPremiumUser => [
    ...(isPremiumUser ?
        []
        : [
            {
                name: 'Go Premium',
                url: '/membership/premium',
                id: 'premium',
                icon: 'bi-trophy-fill',
                color: 'gold'
            }
        ]
    ),
    {
        name: 'Settings',
        url: '/settings',
        id: 'settings',
        icon: 'bi-gear'
    },
    {
        name: 'Support',
        url: '/support',
        id: 'support',
        icon: 'bi-question-circle',
        openInNewTab: true
    },
]

export const MainHeaderComponent = props => {
    const {
        hasSubheaderBelow=true,
    } = props
    const navigate = useNavigate()
    const [linksMenuHidden, setLinksMenuHidden] = useState(true)
    const [notificationsMenuHidden, setNotificationsMenuHidden] = useState(true)
    const [mainMenuHidden, setMainMenuHidden] = useState(true)
    const [mainPageLinks, setMainPageLinks] = useState([])
    const [mainMenuPageLinks, setMainMenuPageLinks] = useState([])
    const [loadingPageLinks, setLoadingPageLinks] = useState(true)

    const activeLinkID = window.location.pathname.split('/').length == 2 ?
        window.location.pathname.split('/')[1]
        : null
        
    useEffect(() => {
        setLoadingPageLinks(true)
        setMainPageLinks(getMainPageLinks(props.hasAdminPrivileges, props.isRecruiterMode))
        setMainMenuPageLinks(getMainMenuPageLinks(props.isPremiumUser))
        setLoadingPageLinks(false)
    }, [props.hasAdminPrivileges, props.isPremiumUser, props.isRecruiterMode])

    const onClickLogo = () => navigate('/')

    const onClickSwitchModePill = () => {
        props.setIsRecruiterMode(!props.isRecruiterMode)
    }

    return (
        <Root className={`d-flex jc-space-between ai-center ${!hasSubheaderBelow && 'no-subheader'}`}>
            <div
                className='d-flex jc-flex-start ai-center clickable'
                onClick={onClickLogo}
            >
                <img className='logo-icon'
                    src='/images/logo.png'
                    height={35}
                    width={35}
                />
                {props.isMobile ? null :
                    <h3 className='logo-text'>
                        {process.env.REACT_APP_SITE_NAME}
                    </h3>
                }
            </div>
            <div className='d-flex jc-flex-end ai-center'>
                {loadingPageLinks ?
                    null
                    : <Tooltip
                        title={props.isRecruiterMode ? 'Switch to candidate mode' : 'Switch to recruiter mode'}
                        marginTop={35}
                        style={{marginRight: 25}}
                    >
                        <Pill
                            title={props.isRecruiterMode ? 'Recruiter mode' : 'Candidate mode'}
                            active={true}
                            onClick={onClickSwitchModePill}
                        />
                    </Tooltip> 
                }   
                {props.isMobile ?
                    <LinksMenu
                        style={{marginRight: 15}}
                        menuHidden={linksMenuHidden}
                        setMenuHidden={setLinksMenuHidden}
                        pageLinks={mainPageLinks}
                    />
                    : mainPageLinks.map( ({name, url, id}) => (
                        <PageLink
                            key={id}
                            to={url}
                            className={id === activeLinkID ? 'active': ''}
                        >
                            {name}
                        </PageLink>
                    ))
                }
                <NotificationsMenu
                    style={{marginRight: 15}}
                    menuHidden={notificationsMenuHidden}
                    setMenuHidden={setNotificationsMenuHidden}
                />
                <MainMenu
                    menuHidden={mainMenuHidden}
                    setMenuHidden={setMainMenuHidden}
                    pageLinks={mainMenuPageLinks}
                />
            </div>
        </Root>
    )
}

const Root = styled.div`
    background-color: ${props => props.theme.bgcNav};
    min-height: var(--h-mainheader);
    padding: 0px var(--ps-mainheader);
    width: 100%;
    box-sizing: border-box;
    
    &.no-subheader {
        border-bottom: ${p => p.theme.navBorder};
        position: sticky;
        top: 0px;
    }

    & .logo-icon {
        border-radius: 50%;
        margin-right: 15px;
    }

    & .logo-text {
        font-weight: 600;
        color: ${p => p.theme.textPrimary};
    }
`

const PageLink = styled(Link)`
    color: ${p => p.theme.textPrimary};
    font-weight: 400;
    font-size: 15px;
    text-decoration: none;
    margin-right: 25px;

    &:hover,
    &.active {
        color: ${p => p.theme.tint} !important;
    }
`


const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    hasAdminPrivileges: getHasAdminPrivileges(state),
    isPremiumUser: getIsPremiumUser(state),
    isRecruiterMode: getIsRecruiterMode(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsRecruiterMode
}, dispatch)

export const MainHeader = connect(mapStateToProps, mapDispatchToProps)(MainHeaderComponent)