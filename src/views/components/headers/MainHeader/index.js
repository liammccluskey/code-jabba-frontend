import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useNavigate, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getIsMobile, getIsSemiMobile } from '../../../../redux/theme'
import {
    getMongoUser,
    getHasAdminPrivileges,
    getIsRecruiterMode,
    getIsRecruiterPremiumUser,
    getIsCandidatePremiumUser,

    fetchThisMongoUser,
    patchUser
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
    // ...( isRecruiterMode ? [

    //     ]
    //     : [
    //         {
    //             name: 'Jobs',
    //             url: '/jobs-feed',
    //             id: 'jobs-feed',
    //             icon: 'bi-briefcase'
    //         },
    //     ]
    // ),
    {
        name: 'Jobs',
        url: '/jobs-feed',
        id: 'jobs-feed',
        icon: 'bi-briefcase'
    },
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

export const getMainMenuPageLinks = (isPremiumUser, isRecruiterMode, mongoUser) => [
    ...(!isPremiumUser ?
        [
            {
                name: 'Go Premium',
                url: '/membership/premium',
                id: 'premium',
                icon: 'bi-trophy-fill',
                color: 'gold'
            }
        ] : []
    ),
    {
        name: 'Profile',
        url: `/users/${mongoUser._id}`,
        id: 'profile',
        icon: 'bi-person-circle'
    },
    ...(isRecruiterMode ?
        [
            {
                name: 'Create a Job',
                url: '/create-job',
                id: 'create-job',
                icon: 'bi-briefcase'
            },
            {
                name: 'Create a Company',
                url: '/create-company',
                id: 'create-company',
                icon: 'bi-globe2'
            },
        ]
        : []
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
        setMainMenuPageLinks(getMainMenuPageLinks(
            props.isRecruiterPremiumUser || props.isCandidatePremiumUser,
            props.isRecruiterMode, 
            props.mongoUser
        ))
        setLoadingPageLinks(false)
    }, [props.hasAdminPrivileges, props.isRecruiterPremiumUser, props.isCandidatePremiumUser, props.isRecruiterMode])

    const onClickLogo = () => navigate('/')

    const onClickSwitchModePill = () => {
        const onPatchSuccess = () => {
            props.fetchThisMongoUser(undefined, undefined, undefined, true)
        }

        props.patchUser({isRecruiter: !props.isRecruiterMode}, onPatchSuccess)

    }

    return (
        <Root className={`d-flex jc-space-between ai-center ${!hasSubheaderBelow && 'no-subheader'}`}>
            <div
                className='d-flex jc-flex-start ai-center clickable'
                onClick={onClickLogo}
            >
                <img className='logo-icon'
                    src='/images/logo.svg'
                    height={35}
                    width={35}
                />
                {props.isMobile ?
                    null
                    : <h3 className='logo-text'>
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
                        style={{marginRight: 15}}
                    >
                        <Pill
                            title={props.isRecruiterMode ? 'Recruiter' : 'Candidate'}
                            active={true}
                            
                            onClick={onClickSwitchModePill}
                        />
                    </Tooltip> 
                }   
                {props.isSemiMobile ?
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
    margin-right: 15px;

    &:hover,
    &.active {
        color: ${p => p.theme.tint} !important;
    }
`


const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    isSemiMobile: getIsSemiMobile(state),
    mongoUser: getMongoUser(state),
    hasAdminPrivileges: getHasAdminPrivileges(state),
    isRecruiterMode: getIsRecruiterMode(state),
    isRecruiterPremiumUser: getIsRecruiterPremiumUser(state),
    isCandidatePremiumUser: getIsCandidatePremiumUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    patchUser,
    fetchThisMongoUser,
}, dispatch)

export const MainHeader = connect(mapStateToProps, mapDispatchToProps)(MainHeaderComponent)