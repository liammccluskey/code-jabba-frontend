import React from 'react'
import styled from 'styled-components'

export const PendingMessage = props => {
    const {
        message='Operation in progress',
        clear, // boolean
        
        ...rest
    } = props

    return (
        <Root {...rest} className={`${props.className} ${clear && 'clear'}`}>
            <div style={props.style} className="lds-ring"><div></div><div></div><div></div><div></div></div>
            <p>{message}</p>
        </Root>
    )
}

const Root = styled.div`
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    background-color: ${p => p.theme.tintTranslucent};
    border-radius: 5px;
    border: 1px solid ${p => p.theme.tint};
    padding: 10px;

    &.clear {
        background-color: transparent;
        border: none;
    }


    & p {
        color: ${p => p.theme.textMain};
    }

    .lds-ring {
        display: inline-flex;
        position: relative;
        min-width: 22px;
        min-height: 22px;
        margin-right: 10px;
        box-sizing: border-box;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 22px;
        height: 22px;
        border: 4px solid ${p => p.theme.tint};
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${p => p.theme.tint} transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @-moz-keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @-ms-keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`