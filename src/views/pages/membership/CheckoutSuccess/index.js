import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { Subheader } from '../../../components/headers/Subheader'

export const CheckoutPortalComponent = props => {
    const {
        
    } = props

    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Checkout' />
            <BodyContainer>
                <Container>
                    <div className='body-container float-container'>
                        <h3 className='title'>Review your Purchase</h3>
                        <div className='purchase-container'>

                        </div>
                    </div>
                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .body-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 30px;
    }

    & .title {
        margin-bottom: 20px;
    }

    & .purchase-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 1px solid ${p => p.theme.bc};
        border-radius: var(--br-container);
        padding: 30px;
        margin-bottom: 20px;
    }
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const CheckoutPortal = connect(mapStateToProps, mapDispatchToProps)(CheckoutPortalComponent)