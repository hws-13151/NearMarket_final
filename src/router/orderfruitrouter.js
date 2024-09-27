import { lazy, Suspense } from 'react';

const Loading = <div className="loading">Loading...</div>;
const OrderFruitPage= lazy (()=> import('../pages/order/OrderFruitPage'))
const OrderFruitDetailPage= lazy(()=>import('../pages/order/OrderFruitDetailPage'))
const FruitCartPage = lazy(()=>import('../pages/order/FruitCartPage'))
const orderfruitrouter = () => {
  return ([
    {
      path: '',
      element: <Suspense fallback={Loading}><OrderFruitPage /></Suspense>
    },
    {
      path:'detail/:id',
      element:<Suspense fallback={Loading}><OrderFruitDetailPage /></Suspense>
    },
    {
      path:'/order/fruit/cart',
      element:<Suspense fallback={Loading}><FruitCartPage /></Suspense>
    }
  ])
}

export default orderfruitrouter
