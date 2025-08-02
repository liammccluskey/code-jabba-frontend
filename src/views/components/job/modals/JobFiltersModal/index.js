import React, {useState, useMemo, useRef} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { CitiesUSA } from '../../EditJobCard/constants'
import { 
    SettingTypes,
    JobTypes,
    PositionTypes,
    ExperienceLevels,
    ExperienceYears,
    Languages,
    Skills,
} from '../../EditJobCard'
import { getSavedFilters } from '../../../../../redux/job'
import { getSelectedFilter } from './utils'

import { Confirm } from '../../../modals/Confirm'
import { SearchableSelectableInput } from '../../../common/SearchableSelectableInput'
import { Pill } from '../../../common/Pill'
import { FilterRow } from '../../FilterRow'
import { PillLabel } from '../../../common/PillLabel'

export const JobFiltersModalComponent = props => {
    const {
        modalID,
        initialFilters, // [key: []]
        
        onClickApply, // (onSuccess, onFailure, filters, savedFilterID) => void
        onClickDeleteFilter, // (filterID, onDeleteSuccess) => void
    } = props

    // State

    const containerRef = useRef(null)
    const [filters, setFilters] = useState(initialFilters)
    const [formData, setFormData] = useState({
        setting: '',
        location: '',
        includedSkill: '',
        excludedSkill: '',
        includedLanguage: '',
        exlcudedLanguage: '',
    })
    const selectedSavedFilterID = useMemo(() => {
        const selectedFilter = getSelectedFilter(filters, props.savedFilters)
        return selectedFilter ? selectedFilter._id : undefined
    }, [filters, props.savedFilters])

    // Utils

    function prettyPrintObject(obj, level = 0) {
        const indent = ' '.repeat(level * 4)
        const nextIndent = ' '.repeat((level + 1) * 4)
    
        if (Array.isArray(obj)) {
            const isScalar = obj.every(v => typeof v !== 'object' || v === null)
    
            if (isScalar) {
                return `[${obj.map(v => JSON.stringify(v)).join(', ')}]`
            }
    
            const items = obj.map(v => `${nextIndent}${prettyPrintObject(v, level + 1)}`)
            return `[\n${items.join(',\n')}\n${indent}]`
        }
    
        if (typeof obj === 'object' && obj !== null) {
            const entries = Object.entries(obj).map(
                ([key, val]) => `${nextIndent}"${key}": ${prettyPrintObject(val, level + 1)}`
            )
            return `{\n${entries.join(',\n')}\n${indent}}`
        }
    
        return JSON.stringify(obj)
    }
      

    const getSelectionText = filterName => {
        switch (filterName) {
            case 'settings':
            case 'locations':
            case 'types':
            case 'positions':
            case 'experienceLevels':
            case 'experienceYears':
            case 'includedLanguages':
            case 'includedSkills':
                return filters[filterName].length ? `${filters[filterName].length} selected` : 'any'
            case 'excludedLanguages':
            case 'excludedSkills':
                return filters[filterName].length ? `${filters[filterName].length} selected` : 'none'
            default:
                break
        }
    }

    // Direct

    const onChangeField = e => {
        const {name, value} = e.target
        
        setFormData(curr => ({
            ...curr,
            [name]: value
        }))
    }

    const onClickOption = (option, fieldName) => {
        const filterName = fieldName + 's'

        setFilters( curr => ({
            ...curr,
            [filterName]: curr[filterName].includes(option) ?
                curr[filterName].filter(item => item !== option)
                : [...curr[filterName], option]
            ,
        }))
    }

    const onClickClearFilter = (filterName) => {
        switch(filterName) {
            case 'settings':
            case 'locations':
            case 'types':
            case 'positions':
            case 'experienceLevels':
            case 'experienceYears':
            case 'includedLanguages':
            case 'excludedLanguages':
            case 'includedSkills':
            case 'excludedSkills':
                setFilters(curr => ({
                    ...curr,
                    [filterName]: []
                }))
                break
            default:
                break
        }
    }

    const onClickApplyFilter = (filterID) => {
        const savedFilter = props.savedFilters.find(filter => filter._id === filterID)
        setFilters(savedFilter)
    }

    // Render

    return (
        <Confirm
            title='Job Filters'
            confirmButtonTitle='Apply filters'
            onConfirm={onClickApply}
            modalID={modalID}
            onConfirmExtraArg={{updatedFilters: filters, savedFilterID: selectedSavedFilterID}}
        >
            <Root ref={containerRef}>
                <h4 className='section-title'>Saved filters</h4>
                {props.savedFilters.length ? 
                    props.savedFilters.map(({title, _id, ...filter}) => (
                        <FilterRow
                            title={title}
                            selectionText={''}
                            actionButtonTitle='Apply'
                            dangerButtonTitle='Delete'
                            onlyShowButtonsOnHover={true}
                            onClickActionButton={() => onClickApplyFilter(_id)}
                            onClickDangerButton={() => onClickDeleteFilter(_id)}
                            titleRightChild={_id === selectedSavedFilterID ?
                                <PillLabel
                                    title='Active'
                                    color='green'
                                    size='s'
                                    style={{marginLeft: 10}}
                                />
                                : null
                            }
                            key={_id}
                        >
                            <pre>Filter: {prettyPrintObject(filter.asMongoFilter)}</pre>
                        </FilterRow>
                    ))
                    : <div className='no-saved-filters-container'>
                        <p>You have no saved filters</p>
                    </div>
                }
                <h4 className='section-title' style={{marginTop: 25}}>Custom filters</h4>
                <FilterRow
                    title='Settings'
                    filterName='settings'
                    selectionText={getSelectionText('settings')}
                    filterActive={filters.settings.length > 0}
                    onClickActionButton={() => onClickClearFilter('settings')}

                >
                    <div className='pills-row row'>
                        {SettingTypes.map(({id, title}) => (
                            <Pill
                                title={title}
                                active={filters.settings.includes(id)}
                                id={id}
                                onClick={onClickOption}
                                fieldName='setting'
                                className='pill-option'
                            />
                        ))}
                    </div>
                </FilterRow>
                <FilterRow
                    title='Locations'
                    filterName='locations'
                    selectionText={getSelectionText('locations')}
                    filterActive={filters.locations.length > 0}
                    onClickActionButton={() => onClickClearFilter('locations')}
                >
                    <SearchableSelectableInput
                        options={CitiesUSA}
                        selectedOptions={filters.locations}
                        value={formData.location}
                        fieldName='location'
                        onChange={onChangeField}
                        onClickOption={onClickOption}
                        className='row'
                    />
                </FilterRow>
                <FilterRow
                    title='Employment types'
                    filterName='types'
                    selectionText={getSelectionText('types')}
                    filterActive={filters.types.length > 0}
                    onClickActionButton={() => onClickClearFilter('types')}
                >
                    <div className='pills-row row'>
                        {JobTypes.map(({id, title}) => (
                            <Pill
                                title={title}
                                active={filters.types.includes(id)}
                                id={id}
                                onClick={onClickOption}
                                fieldName='type'
                                className='pill-option'
                            />
                        ))}
                    </div>
                </FilterRow>
                <FilterRow
                    title='Position types'
                    filterName='positions'
                    selectionText={getSelectionText('positions')}
                    onClickActionButton={() => onClickClearFilter('positions')}
                    filterActive={filters.positions.length > 0}
                >
                    <div className='pills-row row'>
                        {PositionTypes.map(({id, title}) => (
                            <Pill
                                title={title}
                                active={filters.positions.includes(id)}
                                id={id}
                                onClick={onClickOption}
                                fieldName='position'
                                className='pill-option'
                            />
                        ))}
                    </div>
                </FilterRow>
                <FilterRow
                    title='Experience levels'
                    filterName='experienceLevels'
                    selectionText={getSelectionText('experienceLevels')}
                    filterActive={filters.experienceLevels.length > 0}
                    onClickActionButton={() => onClickClearFilter('experienceLevels')}
                >
                    <div className='pills-row row'>
                        {ExperienceLevels.map(({id, title}) => (
                            <Pill
                                title={title}
                                active={filters.experienceLevels.includes(id)}
                                id={id}
                                onClick={onClickOption}
                                fieldName='experienceLevel'
                                className='pill-option'
                            />
                        ))}
                    </div>
                </FilterRow>
                <FilterRow
                    title='Years of experience'
                    filterName='experienceYears'
                    selectionText={getSelectionText('experienceYears')}
                    filterActive={filters.experienceYears.length > 0}
                    onClickActionButton={() => onClickClearFilter('experienceYears')}
                >
                    <div className='pills-row row'>
                        {ExperienceYears.map(({id, title}) => (
                            <Pill
                                title={title}
                                active={filters.experienceYears.includes(id)}
                                id={id}
                                onClick={onClickOption}
                                fieldName='experienceYear'
                                className='pill-option'
                            />
                        ))}
                    </div>
                </FilterRow>
                <FilterRow
                    title='Included langauges'
                    filterName='includedLanguages'
                    selectionText={getSelectionText('includedLanguages')}
                    filterActive={filters.includedLanguages.length > 0}
                    onClickActionButton={() => onClickClearFilter('includedLanguages')}
                >
                    <SearchableSelectableInput
                        options={Languages}
                        selectedOptions={filters.includedLanguages}
                        value={formData.includedLanguage}
                        fieldName='includedLanguage'
                        onChange={onChangeField}
                        onClickOption={onClickOption}
                        className='row'
                    />
                </FilterRow>
                <FilterRow
                    title='Excluded langauges'
                    filterName='excludedLanguages'
                    selectionText={getSelectionText('excludedLanguages')}
                    filterActive={filters.excludedLanguages.length > 0}
                    onClickActionButton={() => onClickClearFilter('excludedLanguages')}
                >
                    <SearchableSelectableInput
                        options={Languages}
                        selectedOptions={filters.excludedLanguages}
                        value={formData.excludedLanguage}
                        fieldName='excludedLanguage'
                        onChange={onChangeField}
                        onClickOption={onClickOption}
                        className='row'
                    />
                </FilterRow>
                <FilterRow
                    title='Included skills'
                    filterName='includedSkills'
                    selectionText={getSelectionText('includedSkills')}
                    filterActive={filters.includedSkills.length > 0}
                    onClickActionButton={() => onClickClearFilter('includedSkills')}
                >
                    <SearchableSelectableInput
                        options={Skills}
                        selectedOptions={filters.includedSkills}
                        value={formData.includedSkill}
                        fieldName='includedSkill'
                        onChange={onChangeField}
                        onClickOption={onClickOption}
                        className='row'
                    />
                </FilterRow>
                <FilterRow
                    title='Excluded skills'
                    filterName='excludedSkills'
                    selectionText={getSelectionText('excludedSkills')}
                    filterActive={filters.excludedSkills.length > 0}
                    onClickActionButton={() => onClickClearFilter('excludedSkills')}
                >
                    <SearchableSelectableInput
                        options={Skills}
                        selectedOptions={filters.excludedSkills}
                        value={formData.excludedSkill}
                        fieldName='excludedSkill'
                        onChange={onChangeField}
                        onClickOption={onClickOption}
                        className='row'
                    />
                </FilterRow>
            </Root>
        </Confirm>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid ${p => p.theme.bc};
    border-radius: 15px;
    overflow: scroll;
    max-height: 500px;
    padding-top: 15px;

    & .section-title {
        margin-bottom: 20px;
        margin-left: 15px;
    }
    & .no-saved-filters-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
`

const mapStateToProps = state => ({
    savedFilters: getSavedFilters(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export const JobFiltersModal = connect(mapStateToProps, mapDispatchToProps)(JobFiltersModalComponent)