import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ordervegetablerouter from "./ordervegetablerouter";
import orderfruitrouter from "./orderfruitrouter";
import ordermeatrouter from "./ordermeatrouter";
import orderSnackRouter from "./orderSnackRouter";

const Loading = <div className="loading">Loading...</div>;

// Main
const MainPage = lazy(() => import("../pages/MainPage"));
const MainLayout = lazy(() => import("../layout/MainLayout"));
const OrderLayout = lazy(() => import("../layout/OrderLayout"));

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
  },
  {
    path: "/order/vegetable",
    element: (
      <Suspense fallback={Loading}>
        <OrderLayout />
      </Suspense>
    ),
    children: ordervegetablerouter(),
  },
  {
    path: "/order/fruit",
    element: (
      <Suspense fallback={Loading}>
        <OrderLayout />
      </Suspense>
    ),
    children: orderfruitrouter(),
  },
  {
    path: "/order/meat",
    element: (
      <Suspense fallback={Loading}>
        <OrderLayout />
      </Suspense>
    ),
    children: ordermeatrouter(),
  },
  {
    path: "/order/snack",
    element: (
      <Suspense fallback={Loading}>
        <OrderLayout />
      </Suspense>
    ),
    children: orderSnackRouter(),
  },
]);

export default root;
