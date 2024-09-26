import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div className="loading">Loading...</div>;
//Main
const MainPage = lazy(() => import("../pages/MainPage"));
const MainLayout = lazy(() => import("../layout/MainLayout"));
const OrderLayout = lazy(() => import("../layout/OrderLayout"));
const OrderVegetablePage = lazy(() =>
  import("../pages/order/OrderVegetablePage")
);

const root = createBrowserRouter([
  {
    //main

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
    ],
  },
]);

export default root;
