import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { api } from '../../../networking'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Button } from '../../components/common/Button'

export const PremiumPricePerMonth = 10
export const Features = [
    {
        title: 'Feature 1',
        description: 'This is a description of feature 1. You get this feature with premium',
        icon: 'bi-scissors',
    },
    {
        title: 'Feature 2',
        description: 'This is a description of feature 2. You get this feature with premium',
        icon: 'bi-plus-circle',
    },
    {
        title: 'Feature 3',
        description: 'This is a description of feature 3. You get this feature with premium',
        icon: 'bi-check-circle'
    },
    {
        title: 'Feature 4',
        description: 'This is a description of feature 4. You get this feature with premium',
        icon: 'bi-archive',
    },
]

export const PremiumComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate('')

    // Direct

    const onClickContinue = async () => {
        navigate('/membership/checkoutportal')
    }

    return (
        <PageContainer>
            <MainHeader />
            <Banner>
                <h1>Go Premium</h1>
            </Banner>
            <BodyContainer>
                <Container>
                    <h2>Ready to go Premium?</h2>
                    <div className='d-flex ai-center'>
                        <p>With premium you'll get access to the following features.</p>
                    </div>
                    <div className='premium-container float-container'>
                        <h4>{`$${PremiumPricePerMonth} per month`}</h4>
                        <div className='divider' />
                        <Button
                            title='Continue'
                            priority={2}
                            type='gold'
                            onClick={onClickContinue}
                        />
                    </div>
                    <div className='features-container'>
                        {Features.map( ({title, description, icon}, i) => (
                            <div
                                className='feature-container'
                                style={{marginRight: i % 2 == 0 ? 40 : 0, marginBottom: i <= 1 ? 40 : 0}}
                                key={title}
                            >
                                <div className='icon-container' >
                                    <i className={icon}/>
                                </div>
                                <h3 className='title'>{title}</h3>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Banner = styled.div`
    width: 100%;
    padding: 30px 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${p => p.theme.goldTranslucent};
    border-top: 1px solid ${p => p.theme.gold};
    border-bottom: 1px solid ${p => p.theme.gold};

    & h1 {
        font-weight: 700;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 100px;

    & .action-link {
        color: ${p => p.theme.gold} !important;
        margin-left: 10px;
    }

    & .premium-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 30px;
        margin-top: 30px;
        margin-bottom: 50px;
    }
    & .divider {
        width: 1px;
        height: 50px;
        background-color: ${p => p.theme.bc};
    }

    & .features-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    & .feature-container {
        display: flex;
        flex-direction: column;
    }
    & .feature-container .icon-container {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 10px;
        background-color: ${p => p.theme.tintTranslucent};
    }
    & .feature-container i {
        color: white;
        font-size: 20px;
        color: ${p => p.theme.tint};
    }
    & .feature-container .title {
        margin-bottom: 10px;
        font-weight: 600;
    }
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const Premium = connect(mapStateToProps, mapDispatchToProps)(PremiumComponent)