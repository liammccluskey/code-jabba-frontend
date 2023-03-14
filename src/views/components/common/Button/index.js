import React from 'react'
import styled from 'styled-components'

export const Button = props => {
    const {
        priority, // 0 : big | 1 : medium
        type, // 'solid' | 'clear' | 'tint' | 'error' | 'danger'
        title,
        className='',
        imageURL=null,
        imageSize=18,
        iconClassName=null,
        iconSize=18,
        isSubmitButton=false,
    
        onClick,

        ...rest
    } = props
    const rootClassName = `t${type} p${priority} ${className} fw-m`

    return (
        <Root
            {...rest}
            className={rootClassName}
            onClick={onClick}
        >
            {imageURL ?
                <img
                    src={imageURL}
                    height={imageSize}
                    width={imageSize}
                />
                : null
            }
            {iconClassName ?
                <i
                    className={iconClassName}
                    style={{fontSize: iconSize}}
                />
                : null
            }
            {title}
            {isSubmitButton ?
                <button type='submit' style={{display: 'none'}} />
                : null
            }
        </Root>
    )
}

const Root = styled.div`
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    &.p1 {
        padding: 10px 25px;
        font-size: 17px;
    }
    &.p2 {
        padding: 7px 20px;
        font-size: 14px;
    }

    @media only screen and (max-width: 601px) {
        &.p1 {
            font-size: 15px;
            padding: 8px 17px;
        }
        &.p2 {
            padding: 7px 14px;
            font-size: 14px;
        }
    }

    &.tsolid {
        background-color: ${p => p.theme.tint};
        color: ${p => p.theme.bgcLight};
        border: 1px solid ${p => p.theme.tint};
    }
    &&.tclear {
        background-color: ${p => p.theme.bgcLight};
        color: ${p => p.theme.tint};
        border: 1px solid ${p => p.theme.bc};
    }
    &.ttint {
        background-color: clear;
        color: ${p => p.theme.tint};
        border: 1px solid clear;
    }
    &.terror {
        background-color: clear;
        color: ${p => p.theme.error};
        border: 1px solid clear;
    }
    &.tdanger {
        background-color: clear;
        color: ${p => p.theme.error};
        border: 1px solid ${p => p.theme.bc};
    }

    &:hover {
        transition: 0.3s
    }

    &.tsolid:hover {
        filter: brightness(80%);
    }

    &.ttint:hover {
        border-color: ${p => p.theme.tintTranslucent};
    }

    &.tclear:hover,
    &.ttint:hover {
        background-color: ${p => p.theme.tintTranslucent};
    }

    &.terror:hover {
        background-color: ${p => p.theme.errorTranslucent};
        border-color: ${p => p.theme.error};
    }

    &.tdanger:hover {
        background-color: ${p => p.theme.error};
        color: ${p => p.theme.bgcLight};
    }

    & i, & img {
        margin-right: 10px;
    }
`