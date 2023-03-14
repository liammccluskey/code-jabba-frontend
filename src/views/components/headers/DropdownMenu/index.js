import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { getIsMobile } from '../../../../redux/ducks/theme'

export const DropdownMenuComponent = props => {
    const {
        //menuHidden,
        triggerElement,
        menuElement,
        triggerHeight,

        onMenuHiddenChange,

        ...rest
    } = props
    const [menuHidden, setMenuHidden] = useState(props.menuHidden)
    const menuRef = useRef()
    const triggerRef = useRef()

    useEffect(() => {
        onMenuHiddenChange(menuHidden)
    }, [menuHidden])

    useEffect(() => {
        setMenuHidden(props.menuHidden)
    }, [props.menuHidden])

    useEffect(() => {
        const handleClick =  e => {
            if (menuRef.current && menuRef.current.contains(e.target)) return
            if (triggerRef.current && triggerRef.current.contains(e.target)) return
            else hideMenu()
        }
        
        document.body.addEventListener('click', handleClick)
        return () => document.body.removeEventListener('click', handleClick)
    })

    const hideMenu = () => setMenuHidden(true)
    const showMenu = () => setMenuHidden(false)

    const onClickTriggerContainer = () => {
        setMenuHidden(curr => !curr)
    }

    return (
        <Root className='d-inline-flex fd-column jc-flex-start ai-flex-end' {...rest}>
            <div
                className='trigger-container d-flex jc-space-around ai-center'
                onClick={onClickTriggerContainer}
                ref={triggerRef}
                style={{height: triggerHeight}}

            >
                {triggerElement}
            </div>
            {menuHidden ? null :
                <div
                style={{marginTop: triggerHeight + 15}}
                    className={`
                        menu-container d-flex fd-column jc-flex-start ai-stretch no-select
                        ${menuHidden ? '' : 'menu-container-active'}
                    `}
                    ref={menuRef}
                >
                    {menuElement}
                </div>
            }
        </Root>
    )
}

const Root = styled.div`
    & .trigger-container {
        cursor: pointer;
    }

    & .menu-container {
        position: absolute;
        border: 1px solid ${p => p.theme.bc};
        border-radius: var(--br-container);
        background-color: ${p => p.theme.bgcLight};
        width: 275px;
        box-shadow: ${p => p.theme.boxShadowDark};
        overflow: hidden;

        transition: 0.3s;
        opacity: 0;
        pointer-events: none;
    }

    & .menu-container-active {
        opacity: 1;
        pointer-events: auto;
        z-index: 10;
    }

    @media only screen and (max-width: 601px) {
        & .menu-container {
            width: calc(100% - var(--ps-body)*2);
            box-sizing: border-box;
            right: 0;
            left: 0;
            margin: 0px var(--ps-body);
        }
    }
`

const mapStateToProps = state => ({
    isMobile: getIsMobile(state)
})

export const DropdownMenu = connect(mapStateToProps)(DropdownMenuComponent)