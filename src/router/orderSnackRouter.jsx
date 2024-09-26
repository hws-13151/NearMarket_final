import React, { lazy, Suspense } from 'react'

const Loading = <div className="loading">Loading...</div>;
const OrderSnackPage = lazy(()=> import('../pages/order/OrderSnackPage'))

const orderSnackRouter = () => {
  return ([
    {
      path: '',
      element: <Suspense fallback={Loading}><OrderSnackPage /></Suspense>
    }
  ]
    
  )
}

export default orderSnackRouter