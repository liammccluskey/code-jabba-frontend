import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { DropdownMenu } from '../DropdownMenu'

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

    return (
        <DropdownMenu
            {...rest}
            menuHidden={menuHidden}
            setMenuHidden={setMenuHidden}
            triggerElement={
                <LinksIcon className={`bi-grid ${!menuHidden && 'active'}`} />
            }
            triggerHeight={35}
            menuElement={
                <Menu className='d-flex jc-flex-start ai-stretch fd-column'>
                    {props.pageLinks.map(({name, url, icon}) => (
                        <div
                            className='row-container oh-dark'
                            onClick={() => onClickLink(url)}
                            key={name}
                        >
                            <i className={icon} />
                            <p>{name}</p>
                        </div>
                    ))}
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