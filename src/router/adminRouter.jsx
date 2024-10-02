import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const Loading = <div className="loading">Loading...</div>

const AdminIndexPage = lazy(()=> import('../pages/admin/AdminIndexPage'))

const adminRouter = () => {
  return (
  [
    {
      path: '',
      element: <Navigate replace to='index' />
    },
    {
      path: 'index',
      element: <Suspense fallback={Loading}><AdminIndexPage /></Suspense>
    }
  ]
)
}

export default adminRouter