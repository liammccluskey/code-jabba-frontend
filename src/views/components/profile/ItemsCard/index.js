import React from 'react'
import styled from 'styled-components'

import { IconButton } from '../../common/IconButton'

export const ItemsCard = props => {
    const {
        title='', // string
        includedItems=[], // [String]
        excludedItems=[], // [String]
        extraItems=[], // [String]
        isEditable, // boolean

        onClickEdit, // () => void

        ...rest
    } = props

    const sortedItems = {
        included: [...includedItems].sort((a, b) => a.localeCompare(b)),
        excluded: [...excludedItems].sort((a, b) => a.localeCompare(b)),
        extra: [...extraItems].sort((a, b) => a.localeCompare(b)),
    }

    return (
        <Root className='of-visible-float-container' {...rest}>
            {title ? 
                <div className='items-header'>
                    <h3>{title}</h3>
                    {isEditable ?
                        <IconButton
                            icon='bi-pencil'
                            size='s'
                            color='tint'
                            onClick={onClickEdit}
                        />
                        : null
                    }
                </div>
                : null
            }
            {sortedItems.included.map( item => (
                <div className='item-container' key={item}>
                    <i className='bi-check-circle-fill included-icon' />
                    <p>{item}</p>
                </div>
            ))}
            {sortedItems.excluded.map( item => (
                <div className='item-container' key={item}>
                    <i className='bi-x-circle-fill excluded-icon' />
                    <p>{item}</p>
                </div>
            ))}
            {sortedItems.extra.map( item => (
                <div className='item-container' key={item}>
                    <p>{item}</p>
                </div>
            ))}
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;

    & .items-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .item-container {
        display: flex;
        align-items: center;
        margin-bottom: 7px;
    }
    & .item-container:last-child {
        margin-bottom: 0px;
    }

    & .included-icon {
        color: ${p => p.theme.tint};
        margin-right: 10px;
    }
    & .excluded-icon {
        color: ${p => p.theme.textSecondary};
        margin-right: 10px;
    }
`