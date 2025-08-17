import React, {useMemo} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { useNavigate } from 'react-router-dom'

import { getMongoUser } from '../../../../redux/user'

import { Subheader } from '../../headers/Subheader'
import { Button } from '../../common/Button'

const PageLinks = [
    {
        name: 'General',
        url: '',
        id: 'general'
    },
    {
        name: 'Jobs',
        url: '/jobs',
        id: 'jobs'
    }
]

export const CompanyHeaderComponent = props => {
    const {
        activeLinkID,
        company
    } = props
    const navigtate = useNavigate()
    const canEditCompany = useMemo(() => {
        const {_id: userID} = props.mongoUser
        const {recruiters, admins} = company

        return recruiters.includes(userID) || admins.includes(userID)
    }, [props.mongoUser, company])

    // Utils

    const onClickEditCompany = () => {
        navigtate(`/edit-company/${company._id}`)
    }

    // Render

    return (
        <Subheader
            title={company.name}
            path={`/companies/${company._id}`}
            activeLinkID={activeLinkID}
            links={PageLinks}
        >
            {canEditCompany ?
                <Button
                    title='Edit company'
                    priority={3}
                    type='clear'
                    onClick={onClickEditCompany}
                />
                : null
            }
        </Subheader>
    )
}

const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const CompanyHeader = connect(mapStateToProps, mapDispatchToProps)(CompanyHeaderComponent)