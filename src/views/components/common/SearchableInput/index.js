import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { PendingMessage } from '../PendingMessage'

export const SearchableInput = props => {
    const {
        options, // [{title, id, imageSrc?}]
        value,
        fieldName,
        loading,

        onChange, // e => void
        onClickOption, // optionID => void

        ...rest
    } = props
    const optionsRef = useRef()
    const inputRef = useRef()
    const [optionsVisible, setOptionsVisible] = useState(false)

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

    const _onClickOption = optionID => {
        onClickOption(optionID)
        setOptionsVisible(false)
    }

    return (
        <Root {...rest}>
            <input
                name={fieldName}
                value={value}
                onChange={onChangeValue}
                ref={inputRef}
            />
            {optionsVisible ?
                <div className='options-container' ref={optionsRef}>
                    {loading ?
                        <PendingMessage message='' clear={true}/>
                        : options.length ?
                            options.map(({title, id, imageSrc=null}) => (
                                <div
                                    className='option-container'
                                    onClick={() => _onClickOption(id)}
                                    key={id}
                                >
                                    {imageSrc ?
                                        <img src={imageSrc} />
                                        : null
                                    }
                                    <p>{title}</p>
                                </div>
                            ))
                            : <p className='no-options-message'>No results</p>
                    }
                </div>
                : null
            }
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
`