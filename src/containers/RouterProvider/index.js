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
import { Support } from '../../views/pages/Support'
import { FAQ } from '../../views/pages/admin/FAQ'
import { IndividualAdminFAQ } from '../../views/pages/IndividualAdminFAQ'
import { IndividualFAQ } from '../../views/pages/IndividualFAQ'
// import { Premium } from '../../views/pages/Premium'
import { CheckoutPortal } from '../../views/pages/membership/CheckoutPortal'
import { CheckoutSuccess } from '../../views/pages/membership/CheckoutSuccess'
import { CheckoutCancel } from '../../views/pages/membership/CheckoutCancel'
import { CancelMembership } from '../../views/pages/membership/CancelMembership'
import { ErrorElement } from '../../views/pages/ErrorElement'
import { Jobs } from '../../views/pages/Jobs'
import { Companies } from '../../views/pages/Companies'
import { Job } from '../../views/pages/Job'
import { CompanyGeneral } from '../../views/pages/company/CompanyGeneral'
import { CreateJob } from '../../views/pages/CreateJob'
import { CreateCompany } from '../../views/pages/CreateCompany'
import { CompanyJobs } from '../../views/pages/company/CompanyJobs'
import { Applications } from '../../views/pages/Applications'
import { EditJob } from '../../views/pages/EditJob'
import { CandidateApplication } from '../../views/pages/CandidateApplication'
import { Profile } from '../../views/pages/Profile'
import { AdminAnalytics } from '../../views/pages/admin/AdminAnalytics'
import { ContactUs } from '../../views/pages/ContactUs'

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
      path: '/register',
      element: <SignedOutRoute element={<Register />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/reset',
      element: <SignedOutRoute element={<ResetPassword />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/contact-us',
      element: <SignedOutRoute element={<ContactUs />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/support',
      element: <Support />,
      errorElement: <ErrorElement />
    },
    {
      path: '/support/faq/:faqID',
      element: <IndividualFAQ />,
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
      path: '/admin/analytics',
      element: <AdminRoute element={<AdminAnalytics />} />,
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
    },
    {
      path: '/admin/faq',
      element: <AdminRoute element={<FAQ />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/admin/faq/:faqID',
      element: <AdminRoute element={<IndividualAdminFAQ />} />,
      errorElement: <ErrorElement />
    },

    // membership
    // {
    //   path: '/membership/premium',
    //   element: <PrivateRoute element={<Premium />} />,
    //   errorElement: <ErrorElement />
    // },
    // {
    //   path: '/membership/checkoutportal',
    //   element: <PrivateRoute element={<CheckoutPortal />} />,
    //   errorElement: <ErrorElement />
    // },
    // {
    //   path: '/membership/checkoutsuccess/:subscriptionTier',
    //   element: <PrivateRoute element={<CheckoutSuccess />} />,
    //   errorElement: <ErrorElement />
    // },
    // {
    //   path: '/membership/checkoutcancel',
    //   element: <PrivateRoute element={<CheckoutCancel />} />,
    //   errorElement: <ErrorElement />
    // },
    // {
    //   path: '/membership/cancel',
    //   element: <PrivateRoute element={<CancelMembership />} />,
    //   errorElement: <ErrorElement />
    // },

    // main
    {
      path: '/jobs',
      element: <PrivateRoute element={<Jobs />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/companies',
      element: <PrivateRoute element={<Companies />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/jobs/:jobID',
      element: <PrivateRoute element={<Job />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/create-company',
      element: <PrivateRoute element={<CreateCompany />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/create-job',
      element: <PrivateRoute element={<CreateJob />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/edit-job/:jobID',
      element: <PrivateRoute element={<EditJob />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/applications/:jobID',
      element: <PrivateRoute element={<Applications />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/candidate-applications/:applicationID',
      element: <PrivateRoute element={<CandidateApplication />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/users/:userID',
      element: <PrivateRoute element={<Profile />} />,
      errorElement: <ErrorElement />
    },

    // company
    {
      path: '/companies/:companyID',
      element: <PrivateRoute element={<CompanyGeneral />} />,
      errorElement: <ErrorElement />
    },
    {
      path: '/companies/:companyID/jobs',
      element: <PrivateRoute element={<CompanyJobs />} />,
      errorElement: <ErrorElement />
    },
])

export const RouterProvider = props => {
  return (
      <__RouterProvider
          router={router}
      />
  )
}