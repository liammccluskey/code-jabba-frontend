import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { DropdownMenu } from '../DropdownMenu'

import { PageLinks } from '../MainHeader'

export const LinksMenu = props => {
    const {
        ...rest
    } = props
    const navigate = useNavigate()
    const [menuHidden, setMenuHidden] = useState(true)

    const onClickLink = url => {
        navigate(url)
        setMenuHidden(true)
    }

    return (
        <DropdownMenu
            {...rest}
            menuHidden={menuHidden}
            onMenuHiddenChange={setMenuHidden}
            triggerElement={
                <LinksIcon className='bi-grid oh-c-t' />
            }
            triggerHeight={35}
            menuElement={
                <Menu className='d-flex jc-flex-start ai-stretch fd-column'>
                    {Object.values(PageLinks).map(({name, url, icon}) => (
                        <div
                            className='row-container oh-dark'
                            onClick={() => onClickLink(url)}
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
    font-size: 27px;
    color: ${p => p.theme.textMain};
`

const Menu = styled.div`
    & .row-container {
        padding: 15px 15px;
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