import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { DropdownMenu } from '../../../headers/DropdownMenu'
import { Button } from '../../../common/Button'

export const LinksMenu = props => {
    const {
        menuHidden,
        pageLinks,

        setMenuHidden,

        ...rest
    } = props
    const navigate = useNavigate()

    const onClickLink = url => {
        navigate(url)
        setMenuHidden(true)
    }

    const onClickLogIn = () => navigate('/login')

    const onClickSignUp = () => navigate('/register')

    return (
        <DropdownMenu
            {...rest}
            menuHidden={menuHidden}
            setMenuHidden={setMenuHidden}
            triggerElement={
                <LinksIcon className={`bi-grid ${!menuHidden && 'active'}`} />
            }
            triggerHeight={20}
            menuElement={
                <Menu className='d-flex jc-flex-start ai-stretch fd-column'>
                    {props.pageLinks.map(({name, url, icon}) => (
                        <div
                            className='row-container oh-dark'
                            onClick={() => onClickLink(url)}
                            key={name}
                        >
                            <i className={icon} />
                            <h4>{name}</h4>
                        </div>
                    ))}
                    <Button
                        type='clear'
                        priority={2}
                        onClick={onClickLogIn}
                        title='Log In'
                        style={{margin: '10px 10px'}}
                    />
                    <Button
                        type='solid'
                        priority={2}
                        onClick={onClickSignUp}
                        title='Sign Up'
                        style={{margin: '10px 10px', marginTop: 0}}
                    />
                </Menu>
            }
        />
    )
}

const LinksIcon = styled.i`
    font-size: 25px;
    color: ${p => p.theme.textMain};

    &:hover,
    &.active {
        color: ${p => p.theme.tint};
    }
`

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

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
`