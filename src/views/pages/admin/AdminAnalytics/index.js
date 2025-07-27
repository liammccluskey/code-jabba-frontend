import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { 
    getAdminUserStats,
    getLoadingAdminUserStats,
    getSiteStats,
    getLoadingSiteStats,
    getEvents,
    getLoadingEvents,

    fetchAdminUserStats,
    fetchSiteStats,
    fetchEvents
} from '../../../../redux/admin'
import { PageContainer } from '../../../components/common/PageContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { AdminHeader } from '../../../components/admin/AdminHeader'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { ValueDeltaSpread } from '../../../components/common/ValueDeltaSpread'
import { Loading } from '../../../components/common/Loading'
import { SearchableTable } from '../../../components/common/SearchableTable'

export const AllTimeframesSortFilters = [
    {title: 'Day', filter: 'day'},
    {title: 'Week', filter: 'week'},
    {title: 'Month', filter: 'month'},
    {title: 'Year', filter: 'year'},
    {title: 'All time', filter: 'alltime'},
]

export const AdminAnalyticsComponent = props => {
    const {
        
    } = props
    const [eventsTimeframe, setEventsTimeframe] = useState('alltime')
    const [eventsSearchText, setEventsSearchText] = useState('')

    const userStatsValues = props.loadingUserStats ?
        {
            users: [],
            // premiumUsers: []
        } 
        : {
            users: [
                {title: 'Candidates', value: props.userStats.candidatesCount.toLocaleString()},
                {title: 'Recruiters', value: props.userStats.recruitersCount.toLocaleString()}
            ],
            // premiumUsers: [
            //     {title: 'Premium Candidates', value: props.userStats.premiumCandidatesCount.toLocaleString()},
            //     {title: 'Premium Recruiters', value: props.userStats.premiumRecruitersCount.toLocaleString()}
            // ]
        }

    const siteStatsValues = props.loadingSiteStats ? []
        : [
            {title: 'Applications', value: props.siteStats.applicationsCount},
            {title: 'Companies', value: props.siteStats.companiesCount},
            {title: 'Job Posts', value: props.siteStats.jobsCount}
        ]

    const eventsHeaders = ['Event', 'Count']
    const eventsRows = props.loadingEvents ? []
        : props.events
            .filter(({event}) => event.toLowerCase().includes(eventsSearchText.toLocaleLowerCase()))
            .map( ({event, count}) => ({
            id: event,
            cells: [event, count.toLocaleString()]
        }))

    useEffect(() => {
        props.fetchAdminUserStats()
        props.fetchSiteStats()
    }, [])

    useEffect(() => {
        props.fetchEvents(eventsTimeframe)
    }, [eventsTimeframe])

    const onChangeEventsTimeframe = e => {
        setEventsTimeframe(e.target.value)
    }

    const onChangeEventsSearchText = e => {
        setEventsSearchText(e.target.value)
    }

    return (
        <PageContainer>
            <MainHeader />
            <AdminHeader activeLinkID='analytics' />
            <BodyContainer>
                <Container>
                    <div className='section-header'>
                        <h3>Total Stats</h3>
                    </div>
                    {props.loadingUserStats ?
                        <Loading style={{height: 50}} />
                        : <div 
                            className='float-container'
                            style={{paddingRight: 20, paddingLeft: 20, marginBottom: 30}}
                        >
                            <ValueDeltaSpread
                                values={userStatsValues.users}
                                showDelta={false}
                                className='value-delta-spread'
                            />
                            {/* <ValueDeltaSpread
                                values={userStatsValues.premiumUsers}
                                showDelta={false}
                                className='value-delta-spread'
                                style={{borderBottom: 'none'}}
                            /> */}
                        </div>
                    }
                    {props.loadingSiteStats ?
                        <Loading style={{height: 50}} />
                        : <ValueDeltaSpread
                            values={siteStatsValues}
                            showDelta={false}
                            className='float-container value-delta-spread'
                            style={{marginBottom: 50}}
                        />
                    }
                    <div className='section-header'>
                        <h3>Events</h3>
                    </div>
                    <SearchableTable
                        searchable={true}
                        loading={props.loadingEvents}
                        searchText={eventsSearchText}
                        tableRows={eventsRows}
                        tableHeaders={eventsHeaders}
                        sortFilter={eventsTimeframe}
                        sortFilters={AllTimeframesSortFilters}
                        onChangeSortFilter={onChangeEventsTimeframe}
                        onChangeSearchText={onChangeEventsSearchText}
                    />
                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    & .value-delta-spread {
        padding: 20px;
        border-bottom: 1px solid ${p => p.theme.bc};
    }

    & .section-container {
        margin-bottom: 50px;
    }
`
const mapStateToProps = state => ({
    userStats: getAdminUserStats(state),
    loadingUserStats: getLoadingAdminUserStats(state),
    siteStats: getSiteStats(state),
    loadingSiteStats: getLoadingSiteStats(state),
    events: getEvents(state),
    loadingEvents: getLoadingEvents(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAdminUserStats,
    fetchSiteStats,
    fetchEvents
}, dispatch)

export const AdminAnalytics = connect(mapStateToProps, mapDispatchToProps)(AdminAnalyticsComponent)