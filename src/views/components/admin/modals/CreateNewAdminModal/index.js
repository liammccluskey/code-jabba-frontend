import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import {
    getUsersSearchResults,
    getLoadingUsersSearchResults,
    clearUsersSearchResults,
    fetchUsersSearchResults,
    createNewAdminUser
} from '../../../../../redux/admin'
import { Confirm } from '../../../modals/Confirm'
import { SearchBar } from '../../../common/SearchBar'
import { UserIcon } from '../../../common/UserIcon'
import { Loading } from '../../../common/Loading'

export const CreateNewAdminModalComponent = props => {
    const {
        modalID, // automatically provided

        ...rest
    } = props
    const [searchText, setSearchText] = useState('')
    const [selectedUserID, setSelectedUserID] = useState(null)

    useEffect(() => {
        props.clearUsersSearchResults()
    }, [])
    
    const onChangeSearch = e => {
        setSearchText(e.target.value)
    }

    const onSubmitSearch = e => {
        e.preventDefault()
        if (searchText) {
            setSelectedUserID(null)
            props.fetchUsersSearchResults(searchText)
        }
    }

    const onClickUserRow = userID => {
        if (userID === selectedUserID) setSelectedUserID(null)
        else setSelectedUserID(userID)
    }

    const onClickMakeAdmin = (onSuccess, onFailure) => {
        if (!selectedUserID) return
        props.createNewAdminUser(selectedUserID, onSuccess, onFailure)
    }

    return (
        <Confirm
            {...rest}
            title='Create New Admin'
            message='Search for a user to make an admin.'
            confirmButtonTitle='Make admin'
            confirmButtonDisabled={!selectedUserID}
            onConfirm={onClickMakeAdmin}
            modalID={modalID}
        >
            <Container>
                <SearchBar
                    value={searchText}
                    onChange={onChangeSearch}
                    onSubmit={onSubmitSearch}
                    placeholder='Search by name'
                    style={{marginBottom: 15, width: '100%'}}
                />
                <div className='search-results-container'>
                    {props.loadingUsersSearchResults ?
                        <Loading />
                        : null
                    }
                    {!props.loadingUsersSearchResults && !props.usersSearchResults.length ?
                        <h4 className='no-results-message'>No results</h4>
                        : null
                    }
                    {props.usersSearchResults.map( user => (
                        <div
                            className={`user-row-container ${user._id === selectedUserID && 'selected'}`}
                            onClick={() => onClickUserRow(user._id)}
                        >
                            <div className='d-flex jc-flex-start ai-center'>
                                <UserIcon size='m' user={user} style={{marginRight: 10}} />
                                <div className='d-flex fd-column jc-flex-start ai-flex-start'>
                                    <p className='name-text'>{user.displayName}</p>
                                    <p className='email-text'>{user.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Confirm>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & .search-results-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 250px;
        border: 1px solid ${p => p.theme.bc};
        border-radius: 5px;
        overflow: hidden;
    }

    & .user-row-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        cursor: pointer;
        border: 1px solid transparent;
        border-bottom: 1px solid ${p => p.theme.bc};
    }
    & .user-row-container.selected {
        background-color: ${p => p.theme.tintTranslucent};
    }
    & .user-row-container:hover {
        border: 1px solid ${p => p.theme.tint};
        border-radius: 5px;
    }

    & .name-text {
        margin-bottom: 0px;
    }

    & .email-text {
        color: ${p => p.theme.textSecondary};
    }

    & .no-results-message {
        color: ${p => p.theme.textSecondary};
        align-self: center;
        margin: auto 0px;
    }
`
const mapStateToProps = state => ({
    usersSearchResults: getUsersSearchResults(state),
    loadingUsersSearchResults: getLoadingUsersSearchResults(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    clearUsersSearchResults,
    fetchUsersSearchResults,
    createNewAdminUser
}, dispatch)

export const CreateNewAdminModal = connect(mapStateToProps, mapDispatchToProps)(CreateNewAdminModalComponent)