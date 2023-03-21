import React from 'react'
import styled from 'styled-components'

import { UserIcon } from '../../common/UserIcon'
import { Button } from '../../common/Button'

export const AdminUserRow = props => {
    const {
        adminUser,
        hasSuperAdminPrivileges,
        isMobile,

        onClickRemoveAdmin,
        onClickMakeSuperAdmin,

        ...rest
    } = props

    return (
        <Root {...rest} className={isMobile ? 'mobile' : ''}>
            <div className='d-inline-flex jc-flex-start ai-center'>
                <UserIcon size='s' user={adminUser} style={{marginRight: 10}} />
                <p>{adminUser.displayName}</p>
            </div>
            {adminUser.isSuperAdmin ?
                <h5>Super Admin</h5>
                : null
            }
            {hasSuperAdminPrivileges && !adminUser.isSuperAdmin ?
                <div className='buttons-container'>
                    <Button
                        title='Remove'
                        type='error'
                        priority={3}
                        onClick={() => onClickRemoveAdmin(adminUser)}
                        style={{marginRight: 10, marginBottom: isMobile ? 5 : 0}}
                    />
                    <Button
                        title='Make super admin'
                        type='clear'
                        priority={3}
                        onClick={() => onClickMakeSuperAdmin(adminUser)}
                    />
                </div>
                : null
            }
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    border-bottom: 1px solid ${p => p.theme.bc};

    &:last-child {
        border-bottom: none;
    }

    & .buttons-container {
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
    }

    &.mobile .buttons-container {
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-end;
    }
`