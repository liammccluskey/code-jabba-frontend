import React from 'react'
import { RouterProvider as _RouterProvider, createBrowserRouter } from 'react-router-dom'

import { PrivateRoute } from '../PrivateRoute'
import { SignedOutRoute } from '../SignedOutRoute'
import {Landing} from '../../views/pages/Landing'
import {Login} from '../../views/pages/Login'
import {Register} from '../../views/pages/Register'
import {ResetPassword} from '../../views/pages/ResetPassword'
import { Dashboard } from '../../views/pages/Dashboard'
import { GeneralSettings } from '../../views/pages/settings/GeneralSettings'
import { AdvancedSettings } from '../../views/pages/settings/AdvancedSettings'
import { Notifications } from '../../views/pages/Notifications'

const router = createBrowserRouter([
    {
      path: '/',
      element: <SignedOutRoute element={<Landing />} />,
    },
    {
      path: '/login',
      element: <SignedOutRoute element={<Login />} />,
    },
    {
      path: '/register',
      element: <SignedOutRoute element={<Register />} />,
    },
    {
      path: '/reset',
      element: <SignedOutRoute element={<ResetPassword />} />,
    },

    // dashboard
    {
      path: '/dashboard',
      element: <PrivateRoute element={<Dashboard />} />
    },
    
    // settings
    {
      path: '/settings',
      element: <PrivateRoute element={<GeneralSettings />} />
    },
    {
      path: '/settings/advanced',
      element: <PrivateRoute element={<AdvancedSettings />} />
    },

    // notifications
    {
      path: '/notifications',
      element: <PrivateRoute element={<Notifications />} />
    },
    {
      path: '/notifications/:notificationID',
      element: <PrivateRoute element={<Notifications />} />
    },
])

export const RouterProvider = props => {
  return (
      <_RouterProvider
          router={router}
      />
  )
}