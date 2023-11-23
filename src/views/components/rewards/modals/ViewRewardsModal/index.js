import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { Confirm } from '../../../modals/Confirm'

export const ViewRewardsModalComponent = props => {
    const {
        modalID,
    } = props

    const onClickConfirm = onSuccess => {
        onSuccess()
    }

    return (
        <Confirm
            title='View reward'
            confirmButtonTitle='Okay'
            confirmButtonDisabled={false}
            onConfirm={onClickConfirm}
            modalID={modalID}
        >
            
        </Confirm>
    )
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const ViewRewardsModal = connect(mapStateToProps, mapDispatchToProps)(ViewRewardsModalComponent)