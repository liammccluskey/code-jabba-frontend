import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getModalStack, ModalTypes } from '../../redux/ducks/modal'
import { Confirm } from '../../views/components/modals/Confirm'

export const ModalProviderComponent = props => {
    const {
        children
    } = props

    // Utils

    const renderModal = (modalType, modalProps) => {
        switch (modalType) {
            case ModalTypes.CONFIRM:
                return <Confirm {...modalProps} />
            default:
                return null
        }
    }

    return (
        <Root>
            {children}
            {props.modalStack.map( ({type, props, id}, i) => (
                <div
                    className='fullscreen-blur'
                    style={{zIndex: 20 + i}}
                    key={id}
                >
                    {renderModal(type, props)}
                </div>
            ))}
        </Root>
    )
}

const Root = styled.div`
    .fullscreen-blur {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0px;
        right: 0px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        backdrop-filter: blur(3px) brightness(85%);
    }
`
const mapStateToProps = state => ({
    modalStack: getModalStack(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const ModalProvider = connect(mapStateToProps, mapDispatchToProps)(ModalProviderComponent)