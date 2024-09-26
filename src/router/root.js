import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import OrderVegetable from "../components/order/OrderVegetable";
import ordervegetablerouter from "./ordervegetablerouter";
import orderfruitrouter from "./orderfruitrouter";
import ordermeatrouter from "./ordermeatrouter";
import ordersnackrouter from "./ordersnackrouter";

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
    children: [
      {
        path:'vegetable',
        element: ordervegetablerouter()
      },
      {
        path:'fruit',
        element: orderfruitrouter()
      },
      {
        path:'meat',
        element: ordermeatrouter()
      },
      {
        path:'snack',
        element: ordersnackrouter()
      }
    ],
  },
]);

export default root;
