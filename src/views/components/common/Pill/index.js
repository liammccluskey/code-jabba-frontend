import React from 'react'
import styled from 'styled-components'

export const Pill = props => {
    const {
        title,
        id,
        active,
        closeable=false,
        fieldName='', // string : name for the group of pills

        onClick, // (pillID, fieldName='') => void

        ...rest
    } = props

    return (
        <Root
            {...rest}
            onClick={() => onClick(id, fieldName)}
            className={`${(active || closeable) && 'active'} ${props.className} no-select`}
            key={id}
        >
            <p>{title}</p>
            {closeable ?
                <i className='bi-x close-icon'/>
                : null
            }
        </Root>
    )
}

const Root = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 5px 15px;
    height: 20px;
    background-color: ${p => p.theme.bgcLight};
    border-radius: 16px;
    border: 1px solid ${p => p.theme.bc};
    cursor: pointer;

    &:hover {
        background-color: ${p => p.theme.tintTranslucent};
    }

    &.active {
        background-color: ${p => p.theme.tint};
    }

    & p {
        color: ${p => p.theme.textSecondary};
        font-weight: 500;
        white-space: nowrap;
    }

    &.active p {
        color:  #fdf1f0;
        color: ${p => p.theme.bgcLight};
    }

    &.active {
        background-color: ${p => p.theme.tintTranslucent};
        border-color: ${p => p.theme.tint};
    }

    &.active p {
        color: ${p => p.theme.tint};
    }

    & .close-icon {
        color: ${p => p.theme.tint};
        font-size: 25px;
        margin-top: 2px;
        margin-right: -5px;
    }
`