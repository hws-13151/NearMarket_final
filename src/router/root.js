import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ordervegetablerouter from "./ordervegetablerouter";
import orderfruitrouter from "./orderfruitrouter";
import ordermeatrouter from "./ordermeatrouter";
import orderSnackRouter from "./orderSnackRouter";
import authrouter from "./authrouter";
import adminRouter from "./adminRouter";

const Loading = <div className="loading">Loading...</div>;

const OrderCartPage1 = lazy(() => import("../pages/cart/CartListPage1"));

// Main
const MainPage = lazy(() => import("../pages/MainPage"));
const MainLayout = lazy(() => import("../layout/MainLayout"));
const OrderLayout = lazy(() => import("../layout/OrderLayout"));
const OrderIndexPage = lazy(() => import("../pages/order/OrderIndexPage"));


const AuthLayout = lazy(() => import("../layout/authLayout"));

const AdminLayout = lazy(() => import("../layout/admin/AdminLayout"));

const PaymentPage = lazy(() => import("../pages/payment/PaymentPage"));

const PaymentDetailPage = lazy(() =>
  import("../pages/payment/PaymentDetailPage")
);

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
        path: "cart",
        element: (
          <Suspense fallback={Loading}>
            <OrderCartPage1 />
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
        path: "index",
        element: (
          <Suspense fallback={Loading}>
            <OrderIndexPage />
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
        path: "payment",
        element: (
          <Suspense fallback={Loading}>
            <PaymentPage />
          </Suspense>
        ),
      },
    ],
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
  {
    path: "/auth",
    element: (
      <Suspense fallback={Loading}>
        <AuthLayout />
      </Suspense>
    ),
    children: authrouter(),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={Loading}>
        <AdminLayout />
      </Suspense>
    ),
    children: adminRouter(),
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
        path: "detail",
        element: (
          <Suspense fallback={Loading}>
            <PaymentDetailPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default root;
