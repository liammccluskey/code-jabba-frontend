import React from 'react'
import styled from 'styled-components'

import { CircularProgressIndicator } from '../../common/CircularProgressIndicator'
import { ItemsCard } from '../../profile/ItemsCard'

export const ApplicationSummaryCard = props => {
    const {
        displayName,
        includedLanguages, // [string]
        excludedLanguages, // [string]
        includedSkills, // [string]
        excludedSkills, // [string]
        applicantProfessionalYOE, // {years: number, months: number}
        applicantInternshipCount, // number

        ...rest
    } = props

    const getYOEText = () => {
        const {years, months} = applicantProfessionalYOE

        return months ?
            `${years} ${years == 1 ? 'year' : 'years'} ${months} ${months == 1 ? 'month' : 'months'}`
            : `${years} ${years == 1 ? 'year' : 'years'}`
    }

    return (
        <Root className='of-visible-float-container' {...rest}>
            <div className='summary-header'>
                <h3>Application Summary</h3>
            </div>
            <div className='line-item-container'>
                <label>Name:</label>
                <p>{displayName}</p>
            </div>
            <div className='line-item-container'>
                <label>Professional YOE:</label>
                <p>{getYOEText()}</p>
            </div>
            <div className='line-item-container'>
                <label>Internship count:</label>
                <p>{applicantInternshipCount}</p>
            </div>
            <div className='split-section-container'>
                <div className='match-container' style={{marginRight: 10}}>
                    <label>Languages match:</label>
                    <div className='metrics-container'>
                        <ItemsCard
                            includedItems={includedLanguages}
                            excludedItems={excludedLanguages}
                            isEditable={false}
                            style={{padding: 0, border: 'none'}}
                        />
                        <CircularProgressIndicator
                            size={75}
                            strokeWidth={6}
                            countCompleted={includedLanguages.length}
                            countTotal={includedLanguages.length + excludedLanguages.length}
                        />
                    </div>
                </div>
                <div className='match-container-divider' />
                <div className='match-container'>
                    <label>Skills match:</label>
                    <div className='metrics-container'>
                        <ItemsCard
                            includedItems={includedSkills}
                            excludedItems={excludedSkills}
                            isEditable={false}
                            style={{padding: 0, border: 'none'}}
                        />
                        <CircularProgressIndicator
                            size={75}
                            strokeWidth={6}
                            countCompleted={includedSkills.length}
                            countTotal={includedSkills.length + excludedSkills.length}
                        />
                    </div>
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
        width: calc(50% - 15px);
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
        align-items: stretch;
        justify-content: flex-start;
        flex: 1;
    }
    & .match-container label {
        margin-bottom: 10px;
    }

    & .metrics-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }

    & .match-container-divider {
        width: 1px;
        height: 100%;
        background-color: ${p => p.theme.bc};
        margin-right: 20px;
        margin-left: 20px;
    }
`