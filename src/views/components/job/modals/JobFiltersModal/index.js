import React, {useState, useEffect, useRef} from 'react'
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

import { Confirm } from '../../../modals/Confirm'
import { SearchableSelectableInput } from '../../../common/SearchableSelectableInput'
import { Pill } from '../../../common/Pill'
import { FilterRow } from '../../FilterRow'

export const JobFiltersModalComponent = props => {
    const {
        modalID,
        initialFilters, // [key: []]
        
        onClickSave, // (filters, onSuccess, onFailure) => void
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

    // Utils

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

    // Render

    return (
        <Confirm
            title='Job Filters'
            confirmButtonTitle='Apply filters'
            onConfirm={onClickSave}
            modalID={modalID}
            onConfirmExtraArg={filters}
        >
            <Root ref={containerRef}>
                <FilterRow
                    title='Settings'
                    filterName='settings'
                    selectionText={filters.settings.length ? `${filters.settings.length} selected` : 'any'}
                    filterActive={filters.settings.length > 0}
                    onClickClear={onClickClearFilter}
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
                    selectionText={filters.locations.length ? `${filters.locations.length} selected` : 'any'}
                    filterActive={filters.locations.length > 0}
                    onClickClear={onClickClearFilter}
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
                    selectionText={filters.types.length ? `${filters.types.length} selected` : 'any'}
                    filterActive={filters.types.length > 0}
                    onClickClear={onClickClearFilter}
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
                    selectionText={filters.positions.length ? `${filters.positions.length} selected` : 'any'}
                    onClickClear={onClickClearFilter}
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
                    selectionText={filters.experienceLevels.length ? `${filters.experienceLevels.length} selected` : 'any'}
                    filterActive={filters.experienceLevels.length > 0}
                    onClickClear={onClickClearFilter}
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
                    selectionText={filters.experienceYears.length ? `${filters.experienceYears.length} selected` : 'any'}
                    filterActive={filters.experienceYears.length > 0}
                    onClickClear={onClickClearFilter}
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
                    selectionText={filters.includedLanguages.length ? `${filters.includedLanguages.length} selected` : 'any'}
                    filterActive={filters.includedLanguages.length > 0}
                    onClickClear={onClickClearFilter}
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
                    selectionText={filters.excludedLanguages.length ? `${filters.excludedLanguages.length} selected` : 'none'}
                    filterActive={filters.excludedLanguages.length > 0}
                    onClickClear={onClickClearFilter}
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
                    selectionText={filters.includedSkills.length ? `${filters.includedSkills.length} selected` : 'any'}
                    filterActive={filters.includedSkills.length > 0}
                    onClickClear={onClickClearFilter}
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
                    selectionText={filters.excludedSkills.length ? `${filters.excludedSkills.length} selected` : 'none'}
                    filterActive={filters.excludedSkills.length > 0}
                    onClickClear={onClickClearFilter}
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

const SavedFiltersRoot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid ${p => p.theme.bc};
    border-radius: 15px;
    overflow: scroll;
    max-height: 200px;
`

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid ${p => p.theme.bc};
    border-radius: 15px;
    overflow: scroll;
    max-height: 500px;
`

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export const JobFiltersModal = connect(mapStateToProps, mapDispatchToProps)(JobFiltersModalComponent)