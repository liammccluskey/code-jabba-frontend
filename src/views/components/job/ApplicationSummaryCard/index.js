import React from 'react'
import styled from 'styled-components'

import { CircularProgressIndicator } from '../../common/CircularProgressIndicator'

export const ApplicationSummaryCard = props => {
    const {
        totalLanguagesCount,
        totalSkillsCount,
        missingLanguagesCount,
        missingSkillsCount,
        applicantProfessionalYOE,
        applicantInternshipCount,

        ...rest
    } = props

    return (
        <Root className='float-container' {...rest}>
            <div className='summary-header'>
                <h3>Application Summary</h3>
            </div>
            <div className='line-item-container'>
                <label>Professional YOE:</label>
                <p>{applicantProfessionalYOE}</p>
            </div>
            <div className='line-item-container' style={{marginBottom: 15}}>
                <label>Internship count:</label>
                <p>{applicantInternshipCount}</p>
            </div>
            <div className='split-section-container'>
                <div className='match-container'>
                    <label>Languages match:</label>
                    <CircularProgressIndicator
                        percentage={80}
                        size={100}
                        strokeWidth={10}
                        countCompleted={totalLanguagesCount - missingLanguagesCount}
                        countTotal={totalLanguagesCount}
                    />
                </div>
                <div className='match-container'>
                    <label>Skills match:</label>
                    <CircularProgressIndicator
                        percentage={50}
                        size={100}
                        strokeWidth={10}
                        countCompleted={totalSkillsCount - missingSkillsCount}
                        countTotal={totalSkillsCount}
                    />
                </div>
            </div>
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;

    & .summary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .line-item-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 7px;
    }

    & label {
        margin-right: 5px;
    }

    & .split-section-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
    }

    & .match-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 1;
    }
    & .match-container label {
        margin-bottom: 7px;
    }
`