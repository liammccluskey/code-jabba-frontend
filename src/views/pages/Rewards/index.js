import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate  } from 'react-router-dom'

import { 
    getRewardsStats,
    getLoadingRewardsStats,
    getRewards,
    getLoadingRewards,
    getRewardsPagesCount,

    fetchRewards,
    fetchRewardsStats
} from '../../../redux/rewards'
import { 
    getMongoUser,
    getIsRecruiterMode,
} from '../../../redux/user'
import { getIsMobile } from '../../../redux/theme'
import { addMessage } from '../../../redux/communication'
import { addModal } from '../../../redux/modal'
import { ModalTypes } from '../../../containers/ModalProvider'
import { stringifyQuery } from '../../../networking'
import { MainHeader } from '../../components/headers/MainHeader'
import { Subheader } from '../../components/headers/Subheader'
import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { Button } from '../../components/common/Button'
import { Loading } from '../../components/common/Loading'
import { ValueDeltaSpread } from '../../components/common/ValueDeltaSpread'
import { SearchableTable } from '../../components/common/SearchableTable'

export const RewardsComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()
    const [data, setData] = useState({
        unclaimedPillActive: false,
        activePillActive: false,
    })
    const [page, setPage] = useState(0)

    const statsValues = props.loadingStats ?
        []
        : [
        {title: 'Total referrals', value: props.stats.referralsCount},
        {title: 'Claimed balance', value: '$ ' + (props.stats.claimedReferralsCount*5).toLocaleString()},
        {title: 'Unclaimed balance', value: '$ ' + (props.stats.unclaimedReferralsCount*5).toLocaleString()},
    ]

    const headers = ['Referree', 'Ready for redemption', 'Premium signup', 'Claimed']
    const rows = props.rewards.map(({referree, active, claimed, _id}) => ({
        id: _id,
        cells: [referree.displayName, active ? 'Yes' : 'No', active ? 'Signed up' : 'Not yet', claimed ? 'Yes' : 'No']
    }))
    const pills = [
        {title: 'Unclaimed', id: 'unclaimed', active: data.unclaimedPillActive},
        {title: 'Ready for redemption', id: 'active', active: data.activePillActive},
    ]

    const showRequirementsModal = () => props.addModal(ModalTypes.CONFIRM, {
        title: props.isRecruiterMode ? 'Job post requirements' : 'Application requirements',
        message: props.isRecruiterMode ? 'You must complete the todo items before you can post jobs.' : 'You must complete the todo items before you can apply to jobs.',
        confirmButtonTitle: 'Go to dashboard',
        onConfirm: onSuccess => {
            navigate('/dashboard')
            onSuccess()
        }
    })

    const canPerformAction = () => {
        if (props.isRecruiterMode) {
            return props.mongoUser.canPostJobs
        } else {
            return props.mongoUser.canApplyToJobs
        }
    }

    useEffect(() => {
        !canPerformAction() && showRequirementsModal()
    }, [])

    useEffect(() => {
        props.fetchRewardsStats()
    }, [])

    useEffect(() => {
        props.fetchRewards(getRewardsFilters())
        setPage(1)
    }, [data.activePillActive, data.unclaimedPillActive])

    // Utils

    const getRewardsFilters = () => {
        return {
            ...(data.activePillActive ? {active: true} : {}),
            ...(data.unclaimedPillActive ? {unclaimed: true} : {})
        }
    }

    const updatePill = (pillID) => {
        const fieldName = pillID + 'PillActive'

        setData(curr => ({
            ...curr,
            [fieldName]: !curr[fieldName]
        }))
    }

    // Direct

    const onClickCopyReferralLink = () => {
        if (!canPerformAction()) {
            showRequirementsModal()
            return
        }

        const queryString = stringifyQuery({
            referralCode: props.mongoUser.referralCode
        })
        const referralLink = `${process.env.REACT_APP_DOMAIN}/register${queryString}`
        navigator.clipboard.writeText(referralLink)
        props.addMessage('Referral code copied.')
    }

    const onClickShareReferralLink = () => {
        if (!canPerformAction()) {
            showRequirementsModal()
            return
        }
        props.addModal(ModalTypes.SHARE_REFERRAL)
    }

    const onClickPill = pillID => {
        switch (pillID) {
            case 'unclaimed':
                updatePill('unclaimed')
                break
            case 'active':
                updatePill('active')
                break
        }
    }

    const onClickTableRow = rowID => {
        const reward = props.rewards.find( ({_id}) => _id === rowID)

        if (!reward.active) {
            props.addMessage('This referree on this referral has not signed up for premium yet.', true, true)
            return
        }
        props.addModal(ModalTypes.VIEW_REWARD, {
            rewardID: rowID
        })
    }

    const onClickDecrementPage = () => {
        if (page == 1) return

        setPage(curr => curr - 1)
    }

    const onClickIncrementPage = () => {
        if (page === props.rewardsPagesCount) return

        setPage(curr => curr + 1)
    }

    return (
        <PageContainer>
            <MainHeader />
            <Subheader title='Rewards' />
            <BodyContainer>
                <Root className={`${props.isMobile && 'mobile'}`}>
                    <h3 className='section-title'>Policy</h3>
                    <div className='float-container policy-container'>
                        <div className='policy-item-container'>
                            <p>{`Receive one $5 amazon gift card for each person that signs up for ${process.env.REACT_APP_SITE_NAME} using your referral link and buys a premium subscription.`}</p>
                        </div>
                        <div className='policy-item-container' >
                            <Button
                                title='Copy my referral link'
                                icon='bi-copy'
                                type='clear'
                                priority={2}
                                onClick={onClickCopyReferralLink}
                            />
                            <Button
                                title='Share my referral link'
                                icon='bi-copy'
                                type='solid'
                                priority={2}
                                onClick={onClickShareReferralLink}
                                style={{marginTop: 15}}
                            />
                        </div>
                    </div>
                    <h3 className='section-title'>Stats</h3>
                    {props.loadingStats ?
                        <Loading />
                        : <ValueDeltaSpread
                            values={statsValues}
                            showDelta={false}
                            style={{marginBottom: 50}}
                            className='float-container value-delta-spread'
                        />
                    }
                    <h3 className='section-title'>Referrals</h3>
                    <SearchableTable
                        loading={props.loadingRewards}
                        searchable={false}
                        tableHeaders={headers}
                        tableRows={rows}
                        pills={pills}
                        onClickPill={onClickPill}
                        page={page}
                        pagesCount={props.rewardsPagesCount}
                        onClickTableRow={onClickTableRow}
                        onClickDecrementPage={onClickDecrementPage}
                        onClickIncrementPage={onClickIncrementPage}
                    />
                </Root>
            </BodyContainer>
        </PageContainer>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .section-title {
        margin-bottom: 20px;
    }

    & .policy-container {
        display: flex;
        align-items: flex-start;
        padding: 30px;
        margin-bottom: 50px;
    }
    &.mobile .policy-container {
        padding: 20px;
    }

    & .policy-item-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100px;
        padding-right: 15px;
        padding-left: 15px;
        border-right: 1px solid ${p => p.theme.bc};
        flex: 1;
    }
    & .policy-item-container:last-child {
        border-right: none;
        justify-content: space-around;
        flex-direction: column;
    }

    & .value-delta-spread {
        padding: 30px;
        margin-bottom: 50px;
    }
    &.mobile .value-delta-spread {
        padding: 20px;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
    stats: getRewardsStats(state),
    loadingStats: getLoadingRewardsStats(state),
    mongoUser: getMongoUser(state),
    rewards: getRewards(state),
    loadingRewards: getLoadingRewards(state),
    rewardsPagesCount: getRewardsPagesCount(state),
    isRecruiterMode: getIsRecruiterMode(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addModal,
    addMessage,
    fetchRewards,
    fetchRewardsStats,
}, dispatch)

export const Rewards = connect(mapStateToProps, mapDispatchToProps)(RewardsComponent)