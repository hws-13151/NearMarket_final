import React from "react";
import { useSelector } from "react-redux";

const CartList1 = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  return (
    <>
      <div>{cartItems}</div>
    </>
  );
};

export default CartList1;
