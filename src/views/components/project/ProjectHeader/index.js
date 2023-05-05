import React from 'react'
import styled from 'styled-components'

import { Subheader } from '../../headers/Subheader'

const PageLinks = [
    {
        name: 'Overview',
        url: '',
        id: ''
    }
]

export const ProjectHeader = props => {
    const {
        activeLinkID,
        projectID
    } = props

    return (
        <Subheader
            title='Project'
            path={`/projects/${projectID}`}
            activeLinkID={activeLinkID}
            links={PageLinks}
        />
    )
}

const Root = styled.div`
    
`