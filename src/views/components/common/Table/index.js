import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Button } from '../Button'

import { Checkbox } from '../Checkbox'
import { IconButton } from '../IconButton'

export const Table = props => {
    const {
        headers,
        rows, // [{id, cells}]
        selectActions=[], // [{title, action: (selectedRowIDs, onSuccess) => void, isDanger}]
        clearSelectedRows,

        onClickRow, // rowID => void

        ...rest
    } = props
    const [headerSelected, setHeaderSelected] = useState(false)
    const [selectedRowIDs, setSelectedRowIDs] = useState([])

    const selectable = selectActions.length

    useEffect(() => {
        clearSelection()
    }, [clearSelectedRows])

    // Utils

    const clearSelection = () => {
        setHeaderSelected(false)
        setSelectedRowIDs([])
    }

    // Direct

    const onClickHeaderCheckbox = () => {
        if (headerSelected) {
            setHeaderSelected(false)
            setSelectedRowIDs([])
        } else {
            setHeaderSelected(true)
            setSelectedRowIDs(rows.map( row => row.id ))
        }
    }

    const onClickRowCheckbox = rowID => {
        console.log(rowID)
        console.log(selectedRowIDs)
        if (selectedRowIDs.includes(rowID)) {
            setSelectedRowIDs(curr => curr.filter(id => id !== rowID))
            setHeaderSelected(false)
        } else {
            setSelectedRowIDs(curr => [...curr, rowID])
        }
    }

    const onClickCancelSelect = clearSelection

    return (
        <Root {...rest} className={`${props.className}`}>
            {selectedRowIDs.length ?
                <div className='selected-feedback-container'>
                    <IconButton
                        size='m'
                        iconClassName='bi-x'
                        onClick={onClickCancelSelect}
                        style={{marginRight: 10}}
                    />
                    <h4 className='selected-title'>{selectedRowIDs.length} Selected</h4>
                    <div className='select-action-buttons-container'>
                        {selectActions.map( ({title, action, isDanger}) => (
                            <Button
                                title={title}
                                type={isDanger ? 'danger' : 'solid'}
                                priority={3}
                                onClick={() => action(selectedRowIDs)}
                                className='select-action-button'
                            />
                        ))}
                    </div>
                </div> : null
            }
            <tr className='header-row'>
                {selectable ?
                    <Checkbox
                        active={headerSelected}
                        onClick={onClickHeaderCheckbox}
                        className='checkbox'
                    />
                    : null
                }
                {headers.map( header => (
                    <th key={header}>{header}</th>
                ))}
            </tr>
            {rows.map( ({id, cells}, i) => (
                <tr key={id} className='data-row' onClick={() => onClickRow(id)}>
                    {selectable ?
                        <Checkbox
                            active={selectedRowIDs.includes(id)}
                            onClick={() => onClickRowCheckbox(id)}
                            className='checkbox'
                        />
                        : null
                    }
                    {cells.map( cell => (
                        <td key={cell} className='line-clamp-1'>{cell}</td>
                    ))}
                </tr>
            ))}
        </Root>
    )
}

const Root = styled.table`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-collapse: collapse;
    text-align: left;

    & .selected-feedback-container {
        display: flex;
        align-items: center;
        padding: 15px 15px;
        border-bottom: 1px solid ${p => p.theme.bc};
    }

    & .selected-title {
        color: ${p => p.theme.tint};
        padding-right: 15px;
        border-right: 2px solid ${p => p.theme.textSecondary};
        margin-right: 15px;
        white-space: nowrap;
    }

    & .select-action-buttons-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: scroll;
    }
    & .select-action-buttons-container::-webkit-scrollbar {
        display: none !important;
    }
    & .select-action-buttons-container {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
    }
    & .select-action-buttons-container {
        scroll-behavior: smooth;
    }

    & .select-action-button {
        margin-right: 10px;
    }
    & .select-action-button:last-child {
        margin-right: 0px;
    }

    & tr {
        display: flex;
        align-items: center;
        flex: 1;
        width: 100%;
        padding: 12px 20px;
        cursor: pointer;
    }
    & .data-row:nth-child(even) {
        background-color: ${p => p.theme.bgcSemilight};
    }
    & .header-row {
        border-bottom: 1px solid ${p => p.theme.bc};
        padding: 10px 20px;
    }
    & .data-row:hover {
        background-color: ${p => p.theme.bgcHover};
    }

    & th,
    & td {
        flex: 1;
    }

    & th {
        font-size: 13px;
        font-weight: 500;
        color: ${p => p.theme.textTertiary};
        text-transform: uppercase;
    }

    & td {
        font-size: 14px;
        font-weight: 400;
        color: ${p => p.theme.textMain};
    }

    & .checkbox {
        margin-right: 20px
    }
`