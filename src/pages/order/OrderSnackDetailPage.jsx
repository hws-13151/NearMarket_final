import React from "react";
import { useParams } from "react-router-dom";
import OrderSnackDetail from "../../components/order/OrderSnackDetail";

const OrderSnackDetailPage = () => {
  const param = useParams();
  console.log(param);
  return <OrderSnackDetail param={param} />;
};

export default OrderSnackDetailPage;
