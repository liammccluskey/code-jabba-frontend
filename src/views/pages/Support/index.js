import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import {
    getSupportFAQs,
    getLoadingSupportFAQs,
    fetchSupportFAQs
} from '../../../redux/support'
import { addModal } from '../../../redux/modal'
import { getIsMobile, getIsSemiMobile } from '../../../redux/theme'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { LandingHeader } from '../../components/headers/LandingHeader'
import { Subheader } from '../../components/headers/Subheader'
import { ActionLink } from '../../components/common/ActionLink'
import { Loading } from '../../components/common/Loading'

export const SupportComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()

    useEffect(() => {
        props.fetchSupportFAQs()
    }, [])

    const onClickFAQLink = faqID => {
        navigate(`/support/faq/${faqID}`)
    }

    return (
        <PageContainer className='bgc-bgc-settings'>
            <LandingHeader showButtons={false} hasSubheaderBelow={true}/>
            <Subheader title='Support' />
            <BodyContainer>
                {props.loadingFAQs ?
                    <Loading />
                    : <Container className={`${props.isMobile && 'mobile'} ${props.isSemiMobile && 'semi-mobile'}`}>
                        {Object.values(props.faqs).map( faqs => (
                            <div className='section-container'>
                                <h3 className='section-title'>{faqs[0].section}</h3>
                                {faqs.map( ({title, _id}) => (
                                    <ActionLink
                                        title={title}
                                        size='m'
                                        onClick={() => onClickFAQLink(_id)}
                                        className='action-link'
                                    />
                                ))}
                            </div>
                        ))}
                    </Container>
                }
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    &.semi-mobile {
        grid-template-columns: 1fr 1fr;
    }
    &.mobile {
        grid-template-columns: 1fr;
    }

    & .section-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 40px;
    }

    & .section-container .section-title {
        text-transform: capitalize;
        margin-bottom: 20px;
    }

    & .section-container .action-link {
        margin-bottom: 10px;
    }
`
const mapStateToProps = state => ({
    faqs: getSupportFAQs(state),
    loadingFAQs: getLoadingSupportFAQs(state),
    isMobile: getIsMobile(state),
    isSemiMobile: getIsSemiMobile(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSupportFAQs,
    addModal
}, dispatch)

export const Support = connect(mapStateToProps, mapDispatchToProps)(SupportComponent)