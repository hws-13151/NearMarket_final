import { lazy, Suspense } from 'react';

const Loading = <div className="loading">Loading...</div>;
const OrderFruitPage= lazy (()=> import('../pages/order/OrderFruitPage'))

const orderfruitrouter = () => {
  return ([
    {
      path: '',
      element: <Suspense fallback={Loading}><OrderFruitPage /></Suspense>
    }
  ])
}

export default orderfruitrouter
