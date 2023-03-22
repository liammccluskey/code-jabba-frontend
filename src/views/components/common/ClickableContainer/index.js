import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getIsMobile } from '../../../../redux/ducks/theme'

export const ClickableContainerComponent = props => {
    const {
        children,

        onClick,

        ...rest
    } = props

    return (
        <Root className={`${props.isMobile && 'mobile'} ${props.className}`} onClick={onClick}>
            {children}
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid ${p => p.theme.bc};
    border-radius: var(--br-container);
    background-color: ${p => p.theme.bgcLight};
    margin-right: 10px;
    padding: 20px;
    cursor: pointer;
    margin-bottom: 20px;
    overflow: hidden;
    box-sizing: border-box;
}
    &:hover {
        border-color: ${p => p.theme.tint};
    }
    &.mobile {
        padding: 15px;
    }
    
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const ClickableContainer = connect(mapStateToProps, mapDispatchToProps)(ClickableContainerComponent)