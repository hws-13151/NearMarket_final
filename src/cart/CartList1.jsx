import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart } from "../../src/slice/cartSlice1";

const CartList1 = () => {
  const cartItems = useSelector((state) => state.cart.items);

  console.log(cartItems);
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice += item.price * item.count;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="cart-list">
      <div className="cart-list-con">
        <h3 className="title">장바구니 목록</h3>
        <div className="cart-item-con">
          {cartItems &&
            cartItems.map((el, idx) => {
              return (
                <div className="cart-item" key={idx}>
                  <div className="top">
                    <img src={el.img} alt={el.img} />
                  </div>
                  <div className="bottom">
                    <span>상품명: {el.title}</span>
                    <span>설명: {el.description}</span>
                    <span>가격: {el.price}</span>
                    <span>갯수: {el.count}</span>
                    <span>총금액: {el.count * el.price}</span>

                    <span
                      className="delete-cart"
                      onClick={() => {
                        dispatch(deleteCart(el.id));
                      }}
                    >
                      X
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        {cartItems.length > 0 ? (
          <div className="payment">
            <div className="payment-sub">
              <div className="sum-price"> 총합계 : {totalPrice} 원</div>
              <div className="order-result">
                <button
                  onClick={() => {
                    navigate("/order/payment");
                  }}
                >
                  결제
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-null">
            <h1
              onClick={() => {
                navigate(-1);
              }}
            >
              <span>장바구니가 비어 있습니다!!!</span>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList1;
