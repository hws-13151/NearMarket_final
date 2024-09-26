import { lazy, Suspense } from "react";

const Loading = <div className="loading">Loading...</div>;
const OrderVegetablePage = lazy(()=> import('../pages/order/OrderVegetablePage'))

const ordervegetablerouter = () => {
  return ([
      {
        path: '',
        element: <Suspense fallback={Loading}><OrderVegetablePage /></Suspense>
      }

    ]
  )
}

export default ordervegetablerouter