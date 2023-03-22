import React from 'react'
import styled from 'styled-components'

export const Table = props => {
    const {
        headers,
        rows, // [[]]

        ...rest
    } = props

    return (
        <Root {...rest} className={`${props.className}`}>
            <tr>
                {headers.map( header => (
                    <th key={header}>{header}</th>
                ))}
            </tr>
            {rows.map( (row, i) => (
                <tr key={i}>
                    {row.map( cell => (
                        <td key={cell}>{cell}</td>
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

    & tr {
        display: flex;
        flex: 1;
        width: 100%;
        padding: 12px 15px;
    }
    & tr:nth-child(even) {
        background-color: ${p => p.theme.bgcSemilight};
    }
    & tr:first-child {
        border-bottom: 1px solid ${p => p.theme.bc};
        padding: 10px 15px;
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
`