import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart } from "../../src/slice/cartSlice1";
import CartModal from "./CartModal";

const CartList1 = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice += item.price * item.count;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const openModal = (item) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const goToPayment = () => {
    navigate("/order/payment", { state: { cartItems, totalPrice } });
  };

  const confirmDelete = (id, category) => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (isConfirmed) {
      dispatch(deleteCart({ id, category })); // id와 category 전달

  };

  return (
    <div className="cart-list">
      <div className="cart-list-con">
        <h3 className="cart-title">장바구니 목록</h3>

        <div className="cart-item-con">
          {cartItems.map((el, idx) => (
            <div className="cart-item" key={idx}>
              <div className="cart-item-top">
                <img src={el.img} alt={el.title} />
                <button
                  onClick={() => openModal(el)}
                  className="cart-details-button"
                >
                  상세정보
                </button>
              </div>
              <div className="cart-item-bottom">
                <div className="cart-details-container">
                  <span>카테고리: {el.category}</span> {/* 카테고리 표시 */}

                  <span>상품명: {el.title}</span>
                  <span>가격: {el.price} 원</span>
                  <span>갯수: {el.count}</span>
                  <span>총금액: {el.count * el.price} 원</span>
                </div>
                <div className="cart-actions-container">
                  <span
                    className="cart-delete"
                    onClick={() => confirmDelete(el.id, el.category)}
                    
                  >
                    X
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 ? (
          <div className="cart-payment">
            <div className="cart-payment-sub">
              <div className="cart-sum-price"> 총합계 : {totalPrice} 원</div>
              <div className="cart-order-result">
                <button onClick={goToPayment}>결제</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-null">
            <h1 onClick={() => navigate(-1)}>
              <span>장바구니가 비어 있습니다!!!</span>
            </h1>
          </div>
        )}

        {/* 모달 창 */}
        {isModalOpen && (
          <CartModal modalItem={modalItem} setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
};

export default CartList1;
