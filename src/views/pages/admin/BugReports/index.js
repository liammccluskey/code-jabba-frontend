import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getIsMobile } from '../../../../redux/ducks/theme'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { MainHeader } from '../../../components/headers/MainHeader'
import { AdminHeader } from '../../../components/admin/AdminHeader'
import { ValueDeltaSpread } from '../../../components/common/ValueDeltaSpread'
import { Table } from '../../../components/common/Table'
import { Pill } from '../../../components/common/Pill'
import { Button } from '../../../components/common/Button'

const timePeriods = ['Week', 'Month', 'Year']

export const BugReportsComponent = props => {
    const {
        
    } = props
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(timePeriods[0])
    const [resolvedPillActive, setResolvedPillActive] = useState(false)
    const [highPriorityPillActive, setHighPriorityPillActive] = useState(false)
    const [archivedPillActive, setArchivedPillActive] = useState(false)

    const metrics = [
        {title: 'Reports', value: 30, percentDelta: -10},
        {title: 'Resolved', value: 50, percentDelta: 0},
        {title: 'Archived', value: 10, percentDelta: 100}
    ]

    const pills = [
        {title: 'Resolved', id: 'resolved', active: resolvedPillActive},
        {title: 'High Priority', id: 'highPriority', active: highPriorityPillActive},
        {title: 'Archived', id: 'archived', active: archivedPillActive}
    ]

    const tableHeaders = ['Title', 'Date Created', 'Status', 'Priority']
    const tableRows = [
        ['Title', 'Date Created', 'Status', 'Priority'],
        ['Title', 'Date Created', 'Status', 'Priority'],
        ['Title', 'Date Created', 'Status', 'Priority'],
        ['Title', 'Date Created', 'Status', 'Priority'],
    ]

    const onChangeSelectedTimePeriod = e => {
        setSelectedTimePeriod(e.target.value)
        // TODO
    }

    const onClickCreateBugReport = () => {
        // TODO
    }

    const onSubmitSearch = searchText => {
        // TODO
    }

    const onClickPill = pillID => {
        switch (pillID) {
            case 'resolved':
                setResolvedPillActive(curr => !curr)
                break
            case 'highPriority':
                setHighPriorityPillActive(curr => !curr)
                break
            case 'archived':
                setArchivedPillActive(curr => !curr)
                break
        }
    }



    return (
        <PageContainer>
            <MainHeader showBorder={false}/>
            <AdminHeader activeLinkID='bug-reports' />
            <BodyContainer>
                <Container>
                    <div className='section-header '>
                        <h3>Metrics</h3>
                        <select value={selectedTimePeriod} onChange={onChangeSelectedTimePeriod}>
                            {timePeriods.map(timePeriod => (
                                <option value={timePeriod} key={timePeriod}>{timePeriod}</option>
                            ))}
                        </select>
                    </div>
                    <ValueDeltaSpread
                        timePeriod={selectedTimePeriod.toLocaleLowerCase()}
                        values={metrics}
                        isMobile={props.isMobile}
                        className='float-container'
                        style={{padding: '15px 0px', marginBottom: 60}}
                    />
                    <div className='section-header'>
                        <h3>Reports</h3>
                        <Button
                            title='Create Bug Report'
                            type='clear'
                            priority={3}
                            onClick={onClickCreateBugReport}
                            icon='bi-plus'
                        />
                    </div>
                    <div className='pills-container'>
                        {pills.map(({title, id, active}) => (
                            <Pill
                                title={title}
                                id={id}
                                active={active}
                                onClick={() => onClickPill(id)}
                            />
                        ))}
                    </div>
                    <Table
                        headers={tableHeaders}
                        rows={tableRows}
                        className='float-container'
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

    & select {
        padding-top: 5px !important;
        padding-bottom: 5px !important;
        background-color: transparent !important;
        border: 1px solid ${p => p.theme.bc} !important;
    }

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    & .pills-container {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        overflow: scroll;
    }
    & .pills-container::-webkit-scrollbar {
        display: none;
    }
    & .pills-container {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    & .pills-container {
        scroll-behavior: smooth;
    }
    & .pills-container div {
        margin-right: 15px;
    }
    & .pills-container div:last-child {
        margin-right: none;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const BugReports = connect(mapStateToProps, mapDispatchToProps)(BugReportsComponent)