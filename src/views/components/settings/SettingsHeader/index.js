import React from 'react'

import { Subheader } from '../../headers/Subheader'

const PageLinks = [
    {
        name: 'General',
        url: '',
        id: 'general'
    },
    {
        name: 'Advanced',
        url: '/advanced',
        id: 'advanced'
    }
]

export const SettingsHeader = props => {
    const {
        activeLinkID
    } = props

    return (
        <Subheader
            title='Settings'
            path='/settings'
            activeLinkID={activeLinkID}
            links={PageLinks}
        />
    )
}