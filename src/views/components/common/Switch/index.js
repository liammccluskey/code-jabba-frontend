import React from 'react'
import styled from 'styled-components'

export const Switch = props => {
    const {
        title,
        enabled,

        onClick,

        ...rest
    } = props

    return (
        <Root {...rest}>
            {title ?
                <h5 className='label-text'>{title}</h5>
                : null
            }
            <div
                className={`switch ${enabled ? 'enabled' : 'disabled'}`}
                onClick={onClick}
            >
                <div className={`switch-button ${enabled ? 'enabled' : 'disabled'}`} />
            </div>
        </Root>
    )
}

const Root = styled.div`
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;

    & .label-text {
        margin-right: 10px;
    } 

    & .switch {
        cursor: pointer;
        box-sizing: border-box;
        width: 44px;
        height: 24px;
        border-radius: 12px;
        position: relative;
    }
    & .switch.enabled {
        background-color: ${p => p.theme.tint};
    }
    & .switch.disabled {
        background-color: ${p => p.theme.textTertiary};
    }

    & .switch-button {
        background-color: ${p => p.theme.bgcLight};
        height: 18px;
        width: 18px;
        border-radius: 50%;
        top: 3px;
        position: absolute;
        transition: var(--duration-animation);
        left: 3px;
    }
    & .switch-button.enabled {
        transform: translateX( calc(44px - 18px - 6px) );
    }
    & .switch-button.disabled {
    }

`