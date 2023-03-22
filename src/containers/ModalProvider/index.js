import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getModalStack } from '../../redux/ducks/modal'
import { Confirm } from '../../views/components/modals/Confirm'
import { CreateNewAdminModal } from '../../views/components/admin/modals/CreateNewAdminModal'

export const ModalTypes = {
    CONFIRM: 'confirm',
    CREATE_NEW_ADMIN: 'create-new-admin',
}

export const ModalProviderComponent = props => {
    const {
        children
    } = props

    // Utils

    const renderModal = (modalType, modalProps, modalID) => {
        switch (modalType) {
            case ModalTypes.CONFIRM:
                return <Confirm {...modalProps} key={modalID}/>
            case ModalTypes.CREATE_NEW_ADMIN:
                return <CreateNewAdminModal {...modalProps} key={modalID} />
            default:
                return null
        }
    }

    return (
        <Root>
            {children}
            {props.modalStack.map( ({type, props, id}, i) => (
                <div
                    className='fullscreen-blur animation-fade-in'
                    style={{zIndex: 20 + i}}
                    key={`container-${id}`}
                >
                    {renderModal(type, props, id)}
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
        //backdrop-filter: blur(3px) brightness(50%);
        backdrop-filter: brightness(50%);
    }
`
const mapStateToProps = state => ({
    modalStack: getModalStack(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const ModalProvider = connect(mapStateToProps, mapDispatchToProps)(ModalProviderComponent)