import React from 'react'
import styled from 'styled-components'

import { Checkbox } from '../Checkbox'

export const ChecklistOptions = props => {
    const {
        options, // [{title, selected, ?leftChild, ?rightChild, id}]

        onClickCheckbox, // optionID => void

        ...rest
    } = props

    return (
        <Root {...rest}>
            {options.map( ({title, selected, leftChild=null, rightChild=null, id}) => (
                <div className='option-container' key={id}>
                    <Checkbox
                        selected={selected}
                        onClick={() => onClickCheckbox(id)}
                        className='checkbox'
                    />
                    {leftChild}
                    <p className='option-title'>{title}</p>
                    {rightChild}
                </div>
            ))}
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;

    & .option-container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    & .checkbox {
        margin-right: 15px;
    }

    & .option-title {
        margin: 0px 5px;
    }
`