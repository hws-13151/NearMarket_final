import React, { useState } from "react";

const CartModal = ({ item, closeModal, updateItem }) => {
  const [count, setCount] = useState(item.count);

  // 수량 증가 함수
  const increaseCount = () => {
    setCount(count + 1);
  };

  // 수량 감소 함수
  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // 업데이트 함수
  const handleUpdate = () => {
    updateItem({ ...item, count });
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>상품 상세정보</h2>
        <img src={item.img} alt={item.img} />
        <p>상품명: {item.title}</p>
        <p>설명: {item.description}</p>
        <p>가격: {item.price}</p>
        <p>총금액: {count * item.price}</p>

        <div className="quantity-controls">
          <button onClick={decreaseCount}>-</button>
          <span>{count}</span>
          <button onClick={increaseCount}>+</button>
        </div>

        <div className="modal-buttons">
          <button onClick={handleUpdate}>수정하기</button>
          <button onClick={closeModal}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
