import React from "react";
import { useSelector } from "react-redux";

const CartList1 = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  return (
    <>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id}>
              <img src={item.img} alt={item.title} />
              <h2>{item.title}</h2>
              <p>가격: {item.price}원</p>
            </div>
          ))
        ) : (
          <p>장바구니가 비어 있습니다.</p>
        )}
      </div>
    </>
  );
};

export default CartList1;
