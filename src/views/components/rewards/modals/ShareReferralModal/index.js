import React, {useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { getMongoUser } from '../../../../../redux/user'
import { Confirm } from '../../../modals/Confirm'
import { InputWithMessage } from '../../../common/InputWithMessage'

export const ShareReferralModalComponent = props => {
    const {
        modalID,
    } = props
    const [data, setData] = useState({
        email: '',
        message: `Hi,
        Check out Code Jabba, the job board for software engineers. It allows you to find jobs more easily by searching by coding language, skill, and experience level.
        \nCheck it out here at ${process.env.REACT_APP_DOMAIN}/register/${props.mongoUser.referralCode}
        \nFrom, ${props.mongoUser.displayName}
        `
    })

    const onChangeField = e => {
        const {name, value} = e.target

        setData(curr => ({
            ...curr,
            [name]: value
        }))
    }

    const onClickConfirm = (onSuccess, onFailure) => {
        const {email, message} = data
        props.sendReferralEmail(email, message, onSuccess, onFailure)
    }

    return (
        <Confirm
            title='Share Referral'
            confirmButtonTitle='Send'
            confirmButtonDisabled={!data.email || !data.message}
            onConfirm={onClickConfirm}
            modalID={modalID}
        >
            <InputWithMessage
                label='Recipient email'
                fieldName='email'
                inputType='text'
                placeholder='email@gmail.com'
                text={data.email}
                onChangeText={onChangeField}
                style={{marginBottom: 20}}
            />
            <InputWithMessage
                label='Message'
                inputType='textarea'
                text={data.message}
                locked={true}
                style={{marginBottom: 0}}
            />
        </Confirm>
    )
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    sendReferralEmail,
}, dispatch)

export const ShareReferralModal = connect(mapStateToProps, mapDispatchToProps)(ShareReferralModalComponent)