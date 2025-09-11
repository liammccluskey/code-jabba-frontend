import React from 'react'
import styled from 'styled-components'
import { bindActionCreators } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

import { getIsMobile } from '../../../../redux/theme'

export const ButtonComponent = props => {
    const {
        priority, // 1 : big | 2 : medium | 3 : small
        type, // 'solid' | 'clear' | 'tint' | 'error' | 'danger' | 'gold' | 'success'
        title,
        imageURL=null,
        imageSize=18,
        icon=null,
        iconSize=18,
        isSubmitButton=false,
        disabled=false,
        iconSide='left', // 'left' | 'right'
    
        onClick,

        ...rest
    } = props

    return (
        <Root
            {...rest}
            className={`t${type} p${priority} ${props.isMobile && 'mobile'} ${props.className} ${disabled && 'disabled'} fw-m`}
            onClick={disabled ? undefined : onClick}
        >
            {imageURL ?
                <img
                    src={imageURL}
                    height={imageSize}
                    width={imageSize}
                />
                : null
            }
            {icon && iconSide === 'left' ?
                <i className={icon} style={{fontSize: iconSize, marginRight: 5}} />
                : null
            }
            {title}
            {isSubmitButton ?
                <button type='submit' style={{display: 'none'}} />
                : null
            }
            {icon && iconSide === 'right' ?
                <i className={icon} style={{fontSize: iconSize, marginLeft: 5}} />
                : null
            }
        </Root>
    )
}

const mapStateToProps = state => ({
    isMobile: getIsMobile(state)
})

export const Button = connect(mapStateToProps)(ButtonComponent)

const Root = styled.div`
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-sizing: border-box;
    white-space: nowrap;

    &.disabled {
        cursor: not-allowed;
    }

    &.p1 {
        padding: 10px 25px;
        font-size: 17px;
        border-radius: 24px;
    }
    &.p2 {
        padding: 7px 20px;
        font-size: 14px;
        border-radius: 20px;
    }
    &.p3 {
        padding: 5px 10px;
        font-size: 13px;
        border-radius: 16px;
        height: 30px;
    }

    &.mobile.p1 {
        font-size: 15px;
        padding: 8px 17px;
    }
    &.mobile.p2 {
        padding: 7px 14px;
        font-size: 14px;
    }



    &.tsolid {
        background-color: ${p => p.theme.tint};
        color: ${p => p.theme.bgcLight};
        border: 1px solid ${p => p.theme.tint};
    }
    &.tclear {
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
        background-color: ${p => p.theme.bgcLight};
        color: ${p => p.theme.brightRed};
        border: 1px solid ${p => p.theme.bc};
    }
    &.tgold {
        background-color: black;
        color: ${p => p.theme.gold};
        border: 1px solid black;
    }
    &.tsuccess {
        background-color: ${p => p.theme.bgcLight};
        color: ${p => p.theme.green};
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
        border-color: ${p => p.theme.error};
        color: #fdf1f0;
    }

    &.tgold:hover {
        background-color: ${p => p.theme.goldTranslucent};
        color: ${p => p.theme.textPrimary};
    }

    &.tsuccess:hover {
        background-color: ${p => p.theme.green};
        border-color: ${p => p.theme.green};
        color: #fdf1f0;
    }

    & img {
        margin-right: 5px;
    }
`