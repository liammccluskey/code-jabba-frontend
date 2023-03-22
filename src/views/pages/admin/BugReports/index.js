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

export const BugReportsComponent = props => {
    const {
        
    } = props
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('Week')

    const timePeriods = ['Week', 'Month', 'Year']
    const metrics = [
        {title: 'Reports', value: 30, percentDelta: -10},
        {title: 'Resolved', value: 50, percentDelta: 0},
        {title: 'Archived', value: 10, percentDelta: 100}
    ]

    const onChangeSelectedTimePeriod = e => {
        setSelectedTimePeriod(e.target.value)
    }

    return (
        <PageContainer>
            <MainHeader showBorder={false}/>
            <AdminHeader activeLinkID='bug-reports' />
            <BodyContainer>
                <Container>
                    <div className='section-header '>
                        <h3 className=''>Metrics</h3>
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
                        style={{padding: '15px 0px'}}
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
        background-color: transparent;
        border: 1px solid ${p => p.theme.bc};
    }

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
`
const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const BugReports = connect(mapStateToProps, mapDispatchToProps)(BugReportsComponent)