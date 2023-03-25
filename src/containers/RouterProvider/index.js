import React, {useEffect, useState} from 'react'
import { RouterProvider as __RouterProvider, createBrowserRouter } from 'react-router-dom'

import { PrivateRoute } from '../PrivateRoute'
import { SignedOutRoute } from '../SignedOutRoute'
import { AdminRoute } from '../AdminRoute'
import {Landing} from '../../views/pages/Landing'
import {Login} from '../../views/pages/Login'
import {Register} from '../../views/pages/Register'
import {ResetPassword} from '../../views/pages/ResetPassword'
import { Dashboard } from '../../views/pages/Dashboard'
import { GeneralSettings } from '../../views/pages/settings/GeneralSettings'
import { AdvancedSettings } from '../../views/pages/settings/AdvancedSettings'
import { Notifications } from '../../views/pages/Notifications'
import { AdminGeneral } from '../../views/pages/admin/AdminGeneral'
import { BugReports } from '../../views/pages/admin/BugReports'
import { AdminTools } from '../../views/pages/admin/Tools'
import { BugReport } from '../../views/pages/BugReport'
import { ErrorElement } from '../../views/pages/ErrorElement'

const router = createBrowserRouter([
    {
      path: '/',
      element: <SignedOutRoute element={<Landing />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/login',
      element: <SignedOutRoute element={<Login />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/register',
      element: <SignedOutRoute element={<Register />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/reset',
      element: <SignedOutRoute element={<ResetPassword />} />,
      errorElement: <ErrorElement />
    },

    // dashboard
    {
      path: '/dashboard',
      element: <PrivateRoute element={<Dashboard />} />,
      errorElement: <ErrorElement />
    },
    
    // settings
    {
      path: '/settings',
      element: <PrivateRoute element={<GeneralSettings />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/settings/advanced',
      element: <PrivateRoute element={<AdvancedSettings />} />,
      errorElement: <ErrorElement />
    },

    // notifications
    {
      path: '/notifications',
      element: <PrivateRoute element={<Notifications />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/notifications/:activeNotificationID',
      element: <PrivateRoute element={<Notifications />} />,
      errorElement: <ErrorElement />
    },

    // admin
    {
      path: '/admin',
      element: <AdminRoute element={<AdminGeneral />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/admin/bugreports',
      element: <AdminRoute element={<BugReports />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/admin/tools',
      element: <AdminRoute element={<AdminTools />} />,
      errorElement: <ErrorElement />
    },
    {
      path: 'admin/bugreports/:bugReportID',
      element: <AdminRoute element={<BugReport />} />,
      errorElement: <ErrorElement />
    }
])

export const RouterProvider = props => {
  return (
      <__RouterProvider
          router={router}
      />
  )
}