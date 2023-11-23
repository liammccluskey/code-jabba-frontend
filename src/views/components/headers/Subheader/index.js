import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useNavigate, Link} from 'react-router-dom'

export const Subheader = props => {
    const {
        path,
        activeLinkID,
        title,
        links = [], // [{name, url, id}]
        children,
        headerChildren,
        imageURL=null,
        showUserIcon=false,
    } = props

    const getLinkPath = linkURL => path + linkURL

    const getLinkClassName = linkID => linkID === activeLinkID ? 'active' : ''

    return (
        <Root className='d-flex jc-space-between ai-center'>
            <div className='d-flex fd-column jc-flex-start ai-flex-start'>
                <div className='d-flex jc-flex-start ai-center'>
                    {imageURL ?
                        <img className='header-image' src={imageURL} />
                        : showUserIcon ?
                            <div className='header-icon-container'>
                                <i className='bi-person person-icon' />
                            </div>
                            : null
                    }
                    <div className='header-container'>
                        <h2 className='subheader-title'>{title}</h2>
                        {headerChildren ?
                            <div className='header-children-container'>
                                {headerChildren}
                            </div>
                            : null
                        }
                    </div>
                </div>
                <div className='page-links-container'>
                    {links.map( ({name, url, id, fullName}) => (
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

    & .header-container {
        margin: 10px 0px;
    }
    & .header-children-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    & .page-links-container {
        display: flex;
        align-items: center;
        overflow-x: scroll;
    }

    & .header-image {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        border: 3px solid ${p => p.theme.bc};
        margin-right: 15px;
        margin-bottom: 10px;
    }

    & .header-icon-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        border: 3px solid ${p => p.theme.bc};
        background-color: ${p => p.theme.tintTranslucent};
        margin-right: 15px;
        margin-bottom: 10px;
    }
    & .person-icon {
        font-size: 40px;
        color: ${p => p.theme.tint};
    }
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
