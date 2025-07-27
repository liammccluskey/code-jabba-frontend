import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'

import { PendingMessage } from '../PendingMessage'
import { Checkbox } from '../Checkbox'
import { Pill } from '../Pill'

export const SearchableSelectableInput = props => {
    const {
        options, // [string]
        selectedOptions, // [string]
        value='',
        fieldName,

        onChange, // e => void
        onClickOption, // optionID => void

        ...rest
    } = props
    const optionsRef = useRef()
    const inputRef = useRef()
    const [optionsVisible, setOptionsVisible] = useState(false)

    const parsedOptions = options.filter( option => option.toLowerCase().includes(value.toLowerCase()))
    const parsedSelectedOptions = selectedOptions.filter(option => option !== '')

    useEffect(() => {
        const handleClick = e => {
            if (
                optionsRef.current &&
                optionsRef.current.contains(e.target)
            ) return
            else if (
                inputRef.current &&
                inputRef.current.contains(e.target)
            ) setOptionsVisible(curr => !curr)
            else setOptionsVisible(false)
        }
        
        document.body.addEventListener('click', handleClick)
        return () => {
            document.body.removeEventListener('click', handleClick)
        }
    }, [])

    const onChangeValue = e => {
        onChange(e)
        setOptionsVisible(true)
    }

    return (
        <Root {...rest}>
            <input
                name={fieldName}
                value={value}
                onChange={onChangeValue}
                ref={inputRef}
                autoComplete='off'
            />
            {optionsVisible ?
                <div className='options-container' ref={optionsRef}>
                    {parsedOptions.length ?
                        parsedOptions.map(option => (
                            <div
                                className='option-container'
                                onClick={() => onClickOption(option)}
                                key={option}
                            >
                                <Checkbox
                                    selected={parsedSelectedOptions.includes(option)}
                                    style={{marginRight: 10}}
                                />
                                <p>{option}</p>
                            </div>
                        ))
                        : <p className='no-options-message'>No results</p>
                    }
                </div>
                : null
            }
            <div className='pills-row'>
                {parsedSelectedOptions.map( option => (
                    <Pill
                        title={option}
                        id={option}
                        onClick={onClickOption}
                        closeable={true}
                        className='pill-option'
                    />
                ))}
            </div>
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;

    & .options-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        position: absolute;
        border: 1px solid ${p => p.theme.bc};
        border-radius: var(--br-container);
        background-color: ${p => p.theme.bgcLight};
        width: 100%;
        box-shadow: ${p => p.theme.boxShadowDark};
        overflow: hidden;
        z-index: 10;
        top: 50px;
        max-height: 250px;
        overflow: scroll;
    }

    & .option-container {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        cursor: pointer;
    }
    & .option-container:hover {
        background-color: ${p => p.theme.bgcHover};
    }

    & .option-container img {
        height: 30px;
        width: 30px;
        margin-right: 10px;
    }

    & .no-options-message {
        padding: 10px 0px;
        align-self: center;
    }

    & .pills-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    & .pill-option {
        margin-top: 10px;
        margin-right: 10px;
    }
`