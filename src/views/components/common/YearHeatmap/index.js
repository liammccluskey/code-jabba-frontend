import React, {useState, useEffect} from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { connect } from 'react-redux'

import {generate} from '@ant-design/colors'
import { formatUnit, formatNumber } from '../../../../utils'
import {
    Themes, 
    Tints, 

    getThemeColor,
    getTintColor
} from '../../../../redux/theme'
import {Tooltip} from '../../common/Tooltip'

/*
    Prop Types
    {
        count: total num
        max: max num on a given day
        data: {
            Number(day num) : count on day
        }
    }
*/

export const YearHeatmapComponent = props => {
    const {
        inputData, // { count, max, data: {dayNum: countOnDay} }
        dataUnit,

        ...rest
    } = props
    const [data, setData] = useState()
    const [dataRanges, setDataRanges] = useState([])
    const [calendarDays, setCalendarDays] = useState([])
    const [monthStarts, setMonthStarts] = useState([])
    const [colors, setColors] = useState( () => getPalette() )

    useEffect(() => {
        setColors( () => getPalette() )
    }, [props.tintColor, props.themeColor]) 

    function getPalette() {
        const tint = Tints[props.tintColor].tint
        const palette = generate(tint, {theme: props.themeColor > 0 ? 'dark' : 'default'})
            .filter( (c, idx) => idx!== 0 && idx % 2 === 0)
        return [Themes[props.themeColor].bgcLight, ...palette ]
    }

    useEffect(() => {
        const dataMax = inputData.max ? inputData.max : 0
        const ranges = dataMax < colors.length ? 
            Array(colors.length).fill(0).map( (e, idx) => ({min: idx, max: idx} ))
            :
            Array(colors.length).fill(0).map( (e, idx) => (
                idx === 0 ? 
                    {min: 0, max: 0} 
                    : {min: (dataMax / colors.length) * (idx - 1) + 1, max: (dataMax / colors.length) * idx}
            ))
        ranges[ranges.length - 1].max = Infinity

        setData(inputData.data ? inputData.data : {})
        setDataRanges(ranges)
    }, [inputData])

    useEffect( () => {
        // Configure calendar
        const val = moment()
        const startDay = val.clone().startOf('year').startOf('week')

        const endDay = val.clone().endOf('year').endOf('week')

        const currDay = startDay.clone().subtract(1,'day')
        let days = []
        while (currDay.isBefore(endDay, 'day')) {
            days.push(currDay.add(1, 'day').clone())
        }
        setCalendarDays(days)

        const months = []
        const startMonth = moment().startOf('year').startOf('month')
        const endMonth = moment().endOf('year').startOf('month')
        const currMonth = startMonth.clone().subtract(1, 'month')
        while (currMonth.isBefore(endMonth, 'month')) {
            months.push(currMonth.add(1, 'month').clone() )
        }
        setMonthStarts(months)
    }, [] )

    function getValue(dayMoment) {
        const dayIndex = dayMoment.dayOfYear()
        return data.hasOwnProperty(dayIndex) ? data[dayIndex] : 0
    }

    function getColor(dayMoment) {
        const val = getValue(dayMoment)
        let color
        dataRanges.forEach( (range, idx) => {
            if (val >= range.min && val <= range.max) {
                color = colors[idx]
            }
        })
        return color
    }

    function getFormattedValue(dayMoment) {
        const val = getValue(dayMoment)
        return `${formatNumber(val)} ${formatUnit(props.dataUnit, val)}`
    }

    return (
        <Root {...rest}>
            <div style={{
                gridTemplateColumns: `repeat(${moment().weeksInYear() + 1}, 1fr)`,
                gridTemplateRorws: `repeat(7, 1fr)`, 
                display: 'inline-grid'
            }}>
                {monthStarts.map( (m, idx) => 
                    <h6 style={{width: 0, gridRow: 1, gridColumn: 2 + m.diff( moment().startOf('year').startOf('week'), 'weeks') }}
                        className='h7 month-text' key={idx}
                    >
                        {m.format('MMM')}
                    </h6>
                )}
                {['Mon', 'Wed', 'Fri'].map( (day, idx) => 
                    <h6 style={{gridRow: 1 + (idx + 1) * 2, gridColumn: 0}} key={idx}
                        className='h7 weekday-text'
                    >
                        {day}
                    </h6>
                )}
                {calendarDays.map( (day, idx) => 
                    <Tooltip 
                        key={idx} 
                        title={`${getFormattedValue(day)} on ${day.format('LL')}`}
                        style={{gridRow: 2 + day.day(), gridColumn: 2 + day.diff(moment().startOf('year').startOf('week'), 'weeks'),}}
                    >
                        <div
                            style={{
                                display: !day.isSame(moment(), 'year') && 'none',
                                backgroundColor: getColor(day)
                            }}
                            className='cell'
                        />
                    </Tooltip>
                )}
            </div>
            <div className='footnote-container'>
                <h6 style={{marginRight: 5}}>Less</h6>
                {colors.map( (color, idx) => 
                    <Tooltip key={idx} 
                        title={dataRanges.length > 0 ?
                            `Range: ${dataRanges[idx].min} to ${dataRanges[idx].max}`
                            : ''
                        }
                    >
                        <div 
                            className='footnote-color-cell' 
                            style={{backgroundColor: color}}
                        />
                    </Tooltip>
                )}
                <h6>More</h6>
            </div>
        </Root>
    )
}

const Root = styled.div`

    & .month-text {
        margin-bottom: 3px;
    }

    & .weekday-text {
        grid-column: 1;
        height: 0px;
        margin-right: 6px;
    }

    & .cell {
        margin: 0px;
        height: 13px;
        border: none;
        border-left: 1px solid ${p => p.theme.bcChart};
        border-top: 1px solid ${p => p.theme.bcChart};
        flex: 1;
    }

    & .footnote-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 15px;
    }

    & .footnote-color-cell {
        height: 15px;
        width: 15px;
        margin-right: 5px;
        border-radius: 3px;
        border: 1px solid ${p => p.theme.bcChart};
    }
`

const mapStateToProps = state => ({
    themeColor: getThemeColor(state),
    tintColor: getTintColor(state)
})

export const YearHeatmap = connect(mapStateToProps)(YearHeatmapComponent)