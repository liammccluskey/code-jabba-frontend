import React, {useState} from 'react'
import styled from 'styled-components'

import { Button } from '../../common/Button'
import { IconButton } from '../../common/IconButton'

export const FilterRow = props => {
    const {
        title, // string
        filterName, // string
        selectionText, // string
        filterActive=undefined, // bool
        actionButtonTitle='Clear', // string
        dangerButtonTitle='', // string
        onlyShowButtonsOnHover=false, // bool
        titleRightChild=undefined, // Node
        children, // [Node]

        onClickActionButton, // () => void
        onClickDangerButton = () => {}, // () => void
        
        ...rest
    } = props
    const [expanded, setExpanded] = useState(false)

    const onClickClearFilter = e => {
        e.stopPropagation()
        onClickActionButton()
    }

    const onClickDanger = e => {
        e.stopPropagation()
        onClickDangerButton()
    }

    return (
        <Root {...rest}>
            <div className='collapsible-row oh-dark' onClick={() => setExpanded(curr => !curr)}>
                <div className='title-container'>
                    <p>{title}</p>
                    {titleRightChild}
                </div>
                <div className='expansion-container'>
                    {dangerButtonTitle ?
                        <IconButton
                            size='s'
                            icon='bi-trash'
                            onClick={onClickDanger}
                            className='hidden-button'
                            style={{marginRight: 10}}
                        />
                        : null
                    }
                    {filterActive ? 
                        <Button
                            title={actionButtonTitle}
                            priority={3}
                            type='clear'
                            onClick={onClickClearFilter}
                            style={{marginRight: 10}}
                        />
                        : null
                    }
                    {filterActive === undefined && onlyShowButtonsOnHover ? 
                        <Button
                            title={actionButtonTitle}
                            priority={3}
                            type='clear'
                            onClick={onClickClearFilter}
                            style={{marginRight: 10}}
                            className='hidden-button'
                        />
                        : null
                    }
                    {filterActive && selectionText?
                        <div className='seperator' />
                        : null
                    }
                    {selectionText ? 
                        <p className='selection-text'>{selectionText}</p>
                        : null
                    }
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
    border-top: 1px solid ${p => p.theme.bc};

    & .collapsible-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        jusitfy-content: space-between;
        padding: 15px;
        box-sizing: border-box;
        max-height: 50px;
    }

    & .title-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    & .hidden-button {
        display: none;
    }
    & .collapsible-row:hover .hidden-button {
        display: flex;
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
        margin-right: 10px;
    }
`