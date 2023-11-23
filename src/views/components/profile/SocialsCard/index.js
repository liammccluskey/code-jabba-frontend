import React from 'react'
import styled from 'styled-components'

import { IconButton } from '../../common/IconButton'
import { PageLink } from '../../common/PageLink'

export const SocialsCard = props => {
    const {
        linkedInURL=null,
        githubURL=null,
        portfolioURL=null,
        leetcodeURL=null,
        isEditable,

        onClickEdit,

        ...rest
    } = props

    return (
        <Root className='float-container' {...rest}>
            <div className='socials-header'>
                <h3>Socials</h3>
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
            <div className='social-container'>
                <i className='bi-linkedin social-icon' />
                {linkedInURL ?
                    <PageLink
                        title='LinkedIn Profile'
                        url={linkedInURL}
                        openInNewTab={true}
                    />
                    : <p>LinkedIn not provided</p>
                }
            </div>
            <div className='social-container'>
                <i className='bi-github social-icon' />
                {githubURL ?
                    <PageLink
                        title='Github Profile'
                        url={githubURL}
                        openInNewTab={true}
                    />
                    : <p>Github not provided</p>
                }
            </div>
            <div className='social-container'>
                <i className='bi-code-square social-icon' />
                {leetcodeURL ?
                    <PageLink
                        title='Leetcode Profile'
                        url={leetcodeURL}
                        openInNewTab={true}
                    />
                    : <p>Leetcode not provided</p>
                }
            </div>
            <div className='social-container'>
                <i className='bi-person-circle social-icon' />
                {portfolioURL ?
                    <PageLink
                        title='Portfolio'
                        url={portfolioURL}
                        openInNewTab={true}
                    />
                    : <p>Portfolio not provided</p>
                }
            </div>
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;

    & .socials-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    & .social-container {
        display: flex;
        align-items: center;
        margin-bottom: 7px;
    }
    & .social-icon {
        color: ${p => p.theme.tint};
        font-size: 25px;
        margin-right: 10px;
    }
`