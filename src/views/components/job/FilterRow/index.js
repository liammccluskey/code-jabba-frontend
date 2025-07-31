import React, {useState} from 'react'
import styled from 'styled-components'

import { Button } from '../../common/Button'

export const FilterRow = props => {
    const {
        title, // string
        filterName, // string
        selectionText, // string
        filterActive, // bool
        children,

        onClick, // () => void
        onClickClear, // filterName => void
        
        ...rest
    } = props
    const [expanded, setExpanded] = useState(false)

    const onClickClearFilter = e => {
        e.stopPropagation()
        onClickClear(filterName)
    }

    return (
        <Root {...rest}>
            <div className='collapsible-row oh-dark' onClick={() => setExpanded(curr => !curr)}>
                <h4>{title}</h4>
                <div className='expansion-container'>
                    {filterActive ? 
                        <Button
                            title='Clear'
                            priority={3}
                            type='clear'
                            onClick={onClickClearFilter}
                        />
                        : null
                    }
                    {filterActive ?
                        <div className='seperator' />
                        : null
                    }
                    <p className='selection-text'>{selectionText}</p>
                    {expanded ?
                        <i className='bi-chevron-up expand-arrow' />
                        : <i className='bi-chevron-down expand-arrow' />
                    }
                </div>
            </div>
            <div className='filter-container' style={{padding: expanded ? 15 : 0}}>
                { expanded ? children : null }
            </div>
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-bottom: 1px solid ${p => p.theme.bc};
    &:last-child {
        border-bottom: none;
    }

    & .collapsible-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        jusitfy-content: space-between;
        padding: 15px;
        box-sizing: border-box;
        max-height: 50px;
    }

    & .expansion-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
    }

    & .filter-container {
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    & .expand-arrow {
        font-size: 16px;
        color: ${p => p.theme.textPrimary};
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

    & .selection-text {
        color: ${p => p.theme.tint};
        margin-right: 10px;
        min-width: 65px;
        text-align: right;
    }
    & .seperator {
        height: 15px;
        width: 1px;
        background-color: ${p => p.theme.textSecondary};
        margin-left: 10px;
        margin-right: 10px;
    }
`