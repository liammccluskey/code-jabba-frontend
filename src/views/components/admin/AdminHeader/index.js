import React from 'react'

import { Subheader } from '../../headers/Subheader'

const PageLinks = [
    {
        name: 'General',
        url: '',
        id: 'general'
    },
]

export const AdminHeader = props => {
    const {
        activeLinkID
    } = props

    return (
        <Subheader
            title='Admin Console'
            path='/admin'
            activeLinkID={activeLinkID}
            links={PageLinks}
        />
    )
}