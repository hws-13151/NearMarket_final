import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../slice/cartSlice1";
import "../css/cart/cartModal.css";

const CartModal = ({ item, setIsModalOpen }) => {
  const [itemCount, setItemCount] = useState(item.count || 1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      setItemCount(item.count);
    }
  }, [item]);

  const closeFn = () => {
    setIsModalOpen(false);
  };

  const incrementFn = () => {
    setItemCount(itemCount + 1);
  };

  const decrementFn = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const addCartFn = () => {
    const updatedItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      img: item.img,
      count: itemCount,
      category: item.category,
      userEmail: item.userEmail,
    };
    dispatch(updateCartItem(updatedItem));
    closeFn();
  };

  return (
    <div className="cart-modal">
      <div className="cart-modal-con">
        <span className="close" onClick={closeFn}>
          X
        </span>
        <div className="top">
          <img src={item.img} alt={item.title} />
        </div>
        <div className="bottom">
          <div className="b-title">
            <span>상품명: {item.title}</span>
            <span>가격: {item.price}원</span>
          </div>
          <div className="sum">
            <p>
              <button onClick={decrementFn}>-</button>
              <span className="count">{itemCount}</span>
              <button onClick={incrementFn}>+</button>
            </p>
            <p>
              <span className="sum-price">
                총합계: {item.price * itemCount} 원
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
