import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import {
    getUser,
    patchUserTintColor,
    patchUserThemeColor,
    signOutUser
} from '../../../../redux/user'
import { DropdownMenu } from '../DropdownMenu'
import { UserIcon } from '../../common/UserIcon'
import { Themes, Tints } from '../../../../redux/theme'
import { Tooltip } from '../../common/Tooltip'

import { PageLinks } from '../MainHeader'

export const MainMenuComponent = props => {
    const {
        menuHidden,
        pageLinks,

        setMenuHidden,

        ...rest
    } = props
    const navigate = useNavigate()

    const onClickProfileContainer = () => {
        navigate('/settings')
        setMenuHidden(true)
    }

    const onClickPageLink = url => {
        navigate(url)
        setMenuHidden(true)
    }

    const onClickThemeColor = themeColor => {
        props.patchUserThemeColor(themeColor)
    }

    const onClickTintColor = tintColor => {
        props.patchUserTintColor(tintColor)
    }

    const onClickLogOut = () => {
        props.signOutUser(() => navigate('/'))
    }

    return (
        <DropdownMenu
            {...rest}
            menuHidden={menuHidden}
            setMenuHidden={setMenuHidden}
            triggerElement={
                <UserIcon size='m' user={props.user}/>
            }
            triggerHeight={35}
            menuElement={
                <MenuContainer className='d-flex fd-column jc-flex-start ai-stretch'>
                    <div
                        className='d-flex fd-column jc-flex-start ai-center profile-container oh-dark'
                        onClick={onClickProfileContainer}
                    >
                        <UserIcon
                            size='l'
                            style={{marginBottom: 10}}
                            user={props.user}
                        />
                        <p style={{marginBottom: 5}} className='fw-m'>
                            {props.user.displayName}
                        </p>
                        <h5 className='c-ts'>{props.user.email}</h5>
                    </div>
                    <div className='links-container'>
                        {props.pageLinks.map( ({name, url, icon}) => (
                            <div
                                className='row-container oh-dark oh-c-t'
                                onClick={() => onClickPageLink(url)}
                                key={name}
                            >
                                <i className={icon} />
                                <p>{name}</p>
                            </div>
                        ))}
                    </div>
                    <div className='appearance-container'>
                        <div className='row-container jc-space-between'>
                            <div className='d-flex ai-center'>
                                <i className='bi-palette' />
                                <p>Theme</p>
                            </div>
                            <div className='d-flex ai-center jc-flex-end'>
                                {Object.values(Themes).map( ({icon, name, value}, i) => {
                                    const isLast = i === Object.values(Themes).length - 1
                                    const marginRight = isLast ? 0 : 7
                                    return (
                                        <Tooltip title={name} style={{marginRight}} key={value}> 
                                            <i
                                                className={`bi-${icon} oh-c-t`}
                                                onClick={() => onClickThemeColor(value)}
                                                style={{marginRight}}
                                            />
                                        </Tooltip>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='row-container jc-space-between'>
                            <div className='d-flex ai-center'>
                                <i className='bi-palette' />
                                <p>Tint Color</p>
                            </div>
                            <div className='d-flex ai-center jc-flex-end'>
                                {Object.values(Tints).map( ({tint, name, value}, i) => {
                                    const isLast = i === Object.values(Tints).length - 1
                                    const marginRight = isLast ? 0 : 7
                                    return (
                                        <Tooltip title={name} style={{marginRight}} key={value}> 
                                            <i
                                                style={{
                                                    height: 17, width: 17,
                                                    borderRadius: '50%',
                                                    backgroundColor: tint,
                                                    marginRight
                                                }}
                                                onClick={() => onClickTintColor(value)}
                                            />
                                        </Tooltip>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div 
                        className='row-container oh-dark'
                        onClick={onClickLogOut}
                    >
                        <i className='bi-box-arrow-right' />
                        <p>Log Out</p>
                    </div>
                </MenuContainer>
            }
        />
    )
}

const MenuContainer = styled.div`
    overflow: hidden;
    & .links-container,
    & .appearance-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    & .profile-container {
        padding: 20px 10px;
    }

    & .links-container {
        border-top: 1px solid ${p => p.theme.bc};
        border-bottom: 1px solid ${p => p.theme.bc};
    }

    & .appearance-container {
        border-bottom: 1px solid ${p => p.theme.bc};
    }

    & .row-container {
        padding: 12px 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    & .row-container i {
        font-size: 20px;
        color: ${p => p.theme.textMain};
        margin-right: 15px;
    }

    & .bi-chevron-down {
        color: ${p => p.theme.textSecondary};
        font-size: 16px;
        margin-right: 10px;
    }

    & .user-icon-container {
        background-color: red;
    }
    
`
const mapStateToProps = state => ({
    user: getUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    patchUserThemeColor,
    patchUserTintColor,
    signOutUser
}, dispatch)

export const MainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenuComponent)