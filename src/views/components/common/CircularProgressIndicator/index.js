import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'

import { getTheme } from '../../../../redux/theme'

export const CircularProgressIndicatorComponent = props => {
    const { 
        countCompleted,
        countTotal, 
        size = 100, 
        strokeWidth = 10,
        progressColor = props.theme.tint, 
        backgroundColor = props.theme.bgc,
    } = props

    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (countCompleted/countTotal) * circumference

    return (
        <svg width={size} height={size}>
            <circle
                stroke={backgroundColor}
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                stroke={progressColor}
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
                strokeLinecap='butt'
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize={size * 0.2}
                fill={progressColor}
            >
                {`${countCompleted} / ${countTotal}`}
            </text>
        </svg>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export const CircularProgressIndicator = connect(mapStateToProps, mapDispatchToProps)(CircularProgressIndicatorComponent)
