import React from 'react'
import styled from 'styled-components'
import { Link as _Link } from 'react-router-dom'

export const PageLink = props => {
    const {
        title,
        url,
        openInNewTab,

        ...rest
    } = props

    const onClickLink = () => {
        window.open(url, '_blank')
    }

    return (
        <Link to={url} target={openInNewTab ? '_blank' : ''}>
            {title}
        </Link>
    )
}

const Link = styled(_Link)`
    color: ${p => p.theme.textPrimary};
    font-weight: 400;
    font-size: 14px;
    text-decoration: none;

    &:hover {
        color: ${p => p.theme.tint};
        text-decoration: underline;
    }
`