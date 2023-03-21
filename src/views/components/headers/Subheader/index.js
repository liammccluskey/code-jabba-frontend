import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useNavigate, Link} from 'react-router-dom'

export const Subheader = props => {
    const {
        path,
        activeLinkID,
        title,
        links = [], // [{name, url, id}]
        children
    } = props

    const getLinkPath = linkURL => path + linkURL

    const getLinkClassName = linkID => linkID === activeLinkID ? 'active' : ''

    return (
        <Root className='d-flex jc-space-between ai-center'>
            <div className='d-flex fd-column jc-flex-start ai-flex-start'>
                <Title>{title}</Title>
                <div className='d-flex jc-flex-start ai-center'>
                    {links.map( ({name, url, id}) => (
                        <PageLink
                            to={getLinkPath(url)}
                            className={getLinkClassName(id)}
                            key={id}
                        >
                            {name}
                        </PageLink>
                    ))}
                </div>
            </div>
            <div className='d-flex fd-column jc-flex-start ai-flex-end'>
                {children}
            </div>
        </Root>
    )
}

const Root = styled.div`
    background-color: ${p => p.theme.bgcNav};
    text-align: left;
    padding-right: var(--ps-subheader);
    padding-left: var(--ps-subheader);
    border-bottom: ${p => `1px solid ${p.theme.bc}`};
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    top: 0px;
`

const Title = styled.h2`
    color: ${p => p.theme.textPrimary};
    margin: 10px 0px;
`

const PageLink = styled(Link)`
    color: ${p => p.theme.textPrimary};
    font-weight: 400;
    font-size: 15px;
    text-decoration: none;
    margin-right: 20px;
    border-bottom: 2px solid ${p => p.theme.bgcNav};
    padding-bottom: 11px;
    color: ${p => p.theme.textSecondary};

    &:hover {
        color: ${p => p.theme.tint};
    }

    &.active {
        border-bottom: 2px solid ${p => p.theme.tint};
        color: ${p => p.theme.textPrimary};
    }
`
