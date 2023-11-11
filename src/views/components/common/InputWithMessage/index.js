import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { getIsMobile } from '../../../../redux/theme'
import { Switch } from '../Switch'
import { ChecklistOptions } from '../ChecklistOptions'
import { PillLabel } from '../PillLabel'
import AutoComplete from 'react-google-autocomplete'

export const InputWithMessageComponent = props => {
    const {
        label,
        message='',
        tintMessage='',
        fieldName,
        inputType, // 'text' | 'textarea' | 'select' | 'switch' | 'checklist'
        text='',
        placeholder='',
        selectValue=null,
        selectValues=[], // [{title, id}]
        switchEnabled=false,
        checklistOptions=[], // [{title, selected, ?leftChild, ?rightChild, id}]
        hasError,
        modified=false,
        locked=false,
        optional=false,
        rightChild=null,
        labelRightChild=null,
        labelMarginBottom=0,
        verticalLabels=false,
        switchLabel='',
        switchID=null,
    
        onChangeText, // e => void
        onChangeSelectValue, // e => void
        onClickSwitch, // switchID => void
        onClickCheckbox, // optionID => void
        onChangeLocation, // (location, fieldName) => void

        ...rest
    } = props

    return (
        <Root {...rest} className={`${props.className} ${props.isMobile && 'mobile'}`}>
            <div className='input-container'>
                <div
                    className={`label-header ${verticalLabels && 'vertical'}`}
                    style={{marginBottom: labelMarginBottom}}
                >
                    <label>{label}</label>
                    {optional ?
                        <h5 className='optional-text' style={{marginRight: 10}}>Optional</h5>
                        : null
                    }
                    {hasError ?
                        <PillLabel
                            title='Required Field'
                            size='s'
                            color='red'
                            style={{marginRight: 10}}
                            className='pill-label'

                        />
                        : null
                    }
                    {modified ?
                        <PillLabel
                            title='Modified'
                            size='s'
                            color='yellow'
                            style={{marginRight: 10}}
                            className='pill-label'
                        />
                        : null
                    }
                    {locked ?
                        <i className='bi-lock-fill lock-icon' />
                        : null 
                    }
                    {labelRightChild ?
                        <div className='label-right-child'>
                            {labelRightChild}
                        </div>
                        : null
                    }
                </div>
                {inputType === 'text' ?
                    <input
                        name={fieldName}
                        value={text}
                        onChange={locked ? () => {} : onChangeText}
                        placeholder={placeholder}
                    />
                : inputType === 'textarea' ?
                    <textarea
                        name={fieldName}
                        value={text}
                        onChange={locked ? () => {} : onChangeText}
                        placeholder={placeholder}
                        style={{height: 150}}
                    />
                : inputType === 'select' ?
                    <select
                        name={fieldName}
                        value={selectValue}
                        onChange={locked ? () => {} : onChangeSelectValue}
                    >
                        {selectValues.map( ({title, id}) => (
                            <option value={id} key={id}>{title}</option>
                        ))}
                    </select>
                : inputType === 'switch' ?
                    <div className='switch-container'>
                        <Switch
                            enabled={switchEnabled}
                            onClick={locked ?
                                () => {}
                                : () => onClickSwitch(switchID)
                            }
                            className='switch'
                        />
                        <p>{switchLabel}</p>
                    </div>
                : inputType === 'checklist' ?
                    <ChecklistOptions
                        options={checklistOptions}
                        onClickCheckbox={locked ? () => {} : onClickCheckbox}
                        className='checklist'
                    />
                : inputType === 'location' ?
                    <AutoComplete
                        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                        onPlaceSelected={location => onChangeLocation(location, fieldName)}
                        onChange={onChangeText}
                        value={text}
                        name={fieldName}
                        className='location-input'
                    />
                : null
                }
            </div>
            {message ? 
                <p className='message'>{message}</p>
                : null
            }
            {tintMessage ?
                <h4 className='tint-message'>{tintMessage}</h4>
                : null
            }
            {rightChild ?
                <div className='right-child-container'>
                    {rightChild}
                </div>
                : null
            }
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    
    & .input-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
        width: 50%;
        box-sizing: border-box;
    }
    &.mobile .message {
        display: none;
    }
    & .message {
        color: ${p => p.theme.textSecondary};
        flex: 1;
        text-align: right;
    }
    & .tint-message {
        color: ${p => p.theme.tint};
        font-weight: 600;
        flex: 1;
        text-align: right;
        padding-left: 50px;
    }
    & .input-container input,
    & .input-container select,
    & .input-container textarea {
        width: 100%;
        box-sizing: border-box;
    }
    & .input-container textarea {
        height: 100px;
        width: 100% !important;
    }
    & .input-container .checklist {
        margin-left: 15px;
    }

    & .label-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        position: relative;
    }
    & .label-header label {
        margin-right: 10px;
    }

    & .right-child-container {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        align-items: center;
    }

    & .lock-icon {
        font-size: 15px;
        color: ${p => p.theme.textSecondary};
    }

    & .optional-text {
        color: ${p => p.theme.textTertiary};
    }

    & .label-right-child {
        display: inline-flex;
        align-items: center;
        position: absolute;
        right: 0px;
    }
    & .label-header.vertical {
        flex-direction: column;
        align-items: flex-start;
    }
    & .label-header.vertical .pill-label {
        margin-bottom: 5px;
    }

    & .switch-container {
        display: flex;
        align-items: center;
        margin-top: 5px;
        margin-left: 5px;
    }
    & .switch-container p {
        color: ${p => p.theme.textSecondary};
        margin-left: 10px;
    }
`

const mapStateToProps = state => ({
    isMobile: getIsMobile(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const InputWithMessage = connect(mapStateToProps, mapDispatchToProps)(InputWithMessageComponent)