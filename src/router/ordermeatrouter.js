import React, { lazy, Suspense } from 'react'

const Loading = <div className="loading">Loading...</div>;
const OrderMeatPage= lazy (()=> import('../pages/order/OrderMeatPage'))

const ordermeatrouter = () => {
  return ([
    {
      path: '',
      element: <Suspense fallback={Loading}><OrderMeatPage /></Suspense>
    }
  ]
    
  )
}

export default ordermeatrouter