import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { Confirm } from '../../../modals/Confirm'

export const JobFiltersModalComponent = props => {
    const {
        modalID,
        filters, // [key: []]
        setFilters, // curr => void
        
        onClickSave, // (onSuccess, onFailure) => void
    } = props
    const [jobsSortFilter, setJobsSortFilter] = useState(SortFilters[0].filter)
    const [entryPillActive, setEntryPillActive] = useState(filters.experienceLevels.includes('entry'))
    const [midPillActive, setMidPillActive] = useState(filters.experienceLevels.includes('mid'))
    const [seniorPillActive, setSeniorPillActive] = useState(filters.experienceLevels.includes('senior'))
    const [staffPillActive, setStaffPillActive] = useState(filters.experienceLevels.includes('staff'))
    const [principalPillActive, setPrincipalPillActive] = useState(filters.experienceLevels.includes('principal'))
    const [level0PillActive, setLevel0PillActive] = useState(filters.experienceYears.includes('0'))
    const [level1PillActive, setLevel1PillActive] = useState(filters.experienceYears.includes('1'))
    const [level2PillActive, setLevel2PillActive] = useState(filters.experienceYears.includes('2'))
    const [level3PillActive, setLevel3PillActive] = useState(filters.experienceYears.includes('3'))
    const [level4PillActive, setLevel4PillActive] = useState(filters.experienceYears.includes('4'))
    const [level5PillActive, setLevel5PillActive] = useState(filters.experienceYears.includes('5'))
    const [level6PillActive, setLevel6PillActive] = useState(filters.experienceYears.includes('6'))

    useEffect(() => {
        const activeExperienceLevels = [
            [entryPillActive, 'entry'],
            [midPillActive, 'mid'],
            [seniorPillActive, 'senior'],
            [staffPillActive, 'staff'],
            [principalPillActive, 'principal']
        ].filter( ([active]) => active)
        .map(([_, experienceLevelID]) => experienceLevelID)
        setFilters(curr => ({
            ...curr,
            experienceLevels: activeExperienceLevels
        }))
    }, [entryPillActive, midPillActive, seniorPillActive, staffPillActive, principalPillActive])

    useEffect(() => {
        const activeExperienceYears = [
            [level0PillActive, '0'],
            [level1PillActive, '1'],
            [level2PillActive, '2'],
            [level3PillActive, '3'],
            [level4PillActive, '4'],
            [level5PillActive, '5'],
            [level6PillActive, '6']
        ].filter( ([active]) => active)
        .map(([_, experienceYearsID]) => experienceYearsID)
        setFilters(curr => ({
            ...curr,
            experienceYears: activeExperienceYears
        }))
    }, [level0PillActive, level1PillActive, level2PillActive, level3PillActive, level4PillActive, level5PillActive, level6PillActive])

   
    // Utils

    return (
        <Confirm
            title='Job Filters'
            confirmButtonTitle='Apply filters'
            confirmButtonDisabled={false}
            onConfirm={onClickSave}
            modalID={modalID}
        >
            <Container>
                <InputWithMessage
                    label='School'
                    inputType='text'
                    fieldName='school'
                    text={formData.school}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.school}
                    hasError={errors.school}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Degree'
                    inputType='select'
                    fieldName='degree'
                    selectValue={formData.degree}
                    selectValues={EducationLevels}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.degree}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    label='Field of Study'
                    inputType='text'
                    fieldName='fieldOfStudy'
                    text={formData.fieldOfStudy}
                    onChangeText={onChangeField}
                    modified={isEditMode && modified.fieldOfStudy}
                    hasError={errors.fieldOfStudy}
                    style={{marginBottom: 20}}
                />
                <InputWithMessage
                    inputType='checklist'
                    label='Is current'
                    checklistOptions={checklistOptions}
                    onClickCheckbox={onClickCheckbox}
                    modified={isEditMode && modified.isCurrent}
                    style={{marginBottom: 20}}
                />
                <div className='inputs-container'>
                    <InputWithMessage
                        label='Start month'
                        inputType='select'
                        fieldName='startMonth'
                        selectValue={formData.startMonth}
                        selectValues={Months}
                        onChangeSelectValue={onChangeField}
                        modified={isEditMode && modified.startMonth}
                        style={{marginBottom: 0, flex: 1, marginRight: 10}}
                    />
                    <InputWithMessage
                        label='Start year'
                        inputType='select'
                        fieldName='startYear'
                        selectValue={formData.startYear}
                        selectValues={years}
                        onChangeSelectValue={onChangeField}
                        modified={isEditMode && modified.startYear}
                        style={{marginBottom: 0, flex: 1}}
                    />
                </div>
                {!formData.isCurrent ?
                    <div className='inputs-container'>
                        <InputWithMessage
                            label='End month'
                            inputType='select'
                            fieldName='endMonth'
                            selectValue={formData.endMonth}
                            selectValues={Months}
                            onChangeSelectValue={onChangeField}
                            modified={isEditMode && modified.endMonth}
                            style={{marginBottom: 0, flex: 1, marginRight: 10}}
                        />
                        <InputWithMessage
                            label='End year'
                            inputType='select'
                            fieldName='endYear'
                            selectValue={formData.endYear}
                            selectValues={years}
                            onChangeSelectValue={onChangeField}
                            modified={isEditMode && modified.endYear}
                            style={{marginBottom: 0, flex: 1}}
                        />
                    </div>
                    : null
                }
            </Container>
        </Confirm>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .inputs-container {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
    }
`

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({d

}, dispatch)

export const JobFiltersModal = connect(mapStateToProps, mapDispatchToProps)(JobFiltersModalComponent)