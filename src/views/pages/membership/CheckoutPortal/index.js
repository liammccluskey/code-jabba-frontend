import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { addMessage } from '../../../../redux/communication'
import { getIsPremiumUser, isPremiumUser } from '../../../../redux/user'
import { api } from '../../../../networking'
import { PremiumPricePerMonth } from '../../Premium'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { Subheader } from '../../../components/headers/Subheader'
import { Button } from '../../../components/common/Button'

export const CheckoutPortalComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()

    useEffect(() => {
        if (props.isPremiumUser) {
            navigate('/dashboard')
            props.addMessage('You are already a premium user.')
            
        }
    }, [])

    const onClickPurchase = async () => {
        const res = await api.post('/membership/create-checkout-session')
        const {sessionURL} = res.data
        window.location.href = sessionURL
    }

    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Checkout' />
            <BodyContainer>
                <Container>
                    <div className='body-container float-container'>
                        <h3 className='title'>Review your Purchase</h3>
                        <div className='purchase-container'>
                            <div className='d-inline-flex jc-flex-start ai-center'>
                                <i className='bi-trophy-fill trophy-icon' />
                                <h4 className='premium-text'>Premium</h4> 
                            </div>
                            <div className='divider' />
                            <h4>{`$${PremiumPricePerMonth} per month`}</h4>
                        </div>
                        <Button
                            title='Purchase'
                            priority={1}
                            type='solid'
                            onClick={onClickPurchase}
                            className='as-flex-start'
                        />
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
        margin-bottom: 40px;
    }

    & .divider {
        width: 1px;
        height: 30px;
        background-color: ${p => p.theme.bc};
    }

    & .trophy-icon {
        font-size: 20px;
        color: ${p => p.theme.gold};
        margin-right: 10px;
    }

    & .premium-text {
        font-weight: 600;
    }
`
const mapStateToProps = state => ({
    isPremiumUser: getIsPremiumUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage
}, dispatch)

export const CheckoutPortal = connect(mapStateToProps, mapDispatchToProps)(CheckoutPortalComponent)
