import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { RouterProvider as _RouterProvider, redirect, createBrowserRouter } from 'react-router-dom'

import { getIsLoggedIn } from '../../redux/ducks/user'
import {Landing} from '../../views/pages/Landing'
import {Login} from '../../views/pages/Login'
import {Register} from '../../views/pages/Register'
import {ResetPassword} from '../../views/pages/ResetPassword'
import { Dashboard } from '../../views/pages/Dashboard'
import { Settings } from '../../views/pages/Settings'


const loggedInRouter = createBrowserRouter([
    {
      path: '/',
      //loader: () => redirect('/dashboard')
      element: <Dashboard />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/settings',
      element: <Settings />
    },
  ])
  
  const loggedOutRouter = createBrowserRouter([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/reset',
      element: <ResetPassword />
    }
  ])

export const RouterProviderComponent = props => {
  console.log({isLoggedIn: props.isLoggedIn})
  return (
      <_RouterProvider
          router={props.isLoggedIn ? loggedOutRouter : loggedOutRouter}
      />
  )
}

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const RouterProvider = connect(mapStateToProps, mapDispatchToProps)(RouterProviderComponent)