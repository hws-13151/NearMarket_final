import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div className="loading">Loading...</div>;

// Main
const MainPage = lazy(() => import("../pages/MainPage"));
const MainLayout = lazy(() => import("../layout/MainLayout"));
const OrderLayout = lazy(() => import("../layout/OrderLayout"));

// Order
const OrderVegetablePage = lazy(() => import("../pages/order/OrderVegetablePage"));
const OrderFruitPage = lazy(() => import('../pages/order/OrderFruitPage'));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={Loading}>
            <MainPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/order",
    element: (
      <Suspense fallback={Loading}>
        <OrderLayout />
      </Suspense>
    ),
    children: [
      {
        path: "vegetable",
        element: (
          <Suspense fallback={Loading}>
            <OrderVegetablePage />
          </Suspense>
        ),
      },
      {
        path: "fruit",
        element: (
          <Suspense fallback={Loading}>
            <OrderFruitPage />
          </Suspense>
        ),
       
      },
    ],
  },
]);

export default root;
