import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../../src/slice/cartSlice1";
import "../css/cart/cartModal.css"; // 외부 CSS 파일을 임포트

const CartModal = ({ modalItem, setIsModalOpen }) => {
  const [itemCount, setItemCount] = useState(modalItem.count); // 모달에서 초기 수량 설정

  const dispatch = useDispatch();

  const closeFn = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const incrementFn = () => {
    setItemCount(itemCount + 1); // 수량 증가
  };

  const decrementFn = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1); // 수량 감소
    }
  };

  const addCartFn = () => {
    const item = {
      id: modalItem.id,
      title: modalItem.title,
      price: modalItem.price,
      img: modalItem.img,
      count: itemCount,

      category: modalItem.category, // 카테고리 추가
    };
    dispatch(updateCartItem(item)); // 장바구니 아이템 수량 업데이트
    closeFn(); // 모달 닫기
  };

  return (
    <div className="cart-modal">
      <div className="cart-modal-con">
        <span className="close" onClick={closeFn}>
          X
        </span>
        <div className="top">
          <img src={modalItem.img} alt={modalItem.title} />
        </div>
        <div className="bottom">
          <div className="b-title">
            <span>상품명: {modalItem.title}</span>
            <span>가격: {modalItem.price}원</span>
          </div>
          <div className="sum">
            <p>
              <button onClick={decrementFn}>-</button>
              <span className="count">{itemCount}</span>
              <button onClick={incrementFn}>+</button>
            </p>
            <p>
              <span className="sum-price">
                총합계: {modalItem.price * itemCount} 원
              </span>
              <button onClick={addCartFn} className="add-btn">
                장바구니 업데이트
              </button>
              <button onClick={closeFn}>닫기</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
