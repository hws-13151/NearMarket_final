import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../slice/cartSlice1";
import "../css/cart/cartModal.css"; // 외부 CSS 파일을 임포트

const CartModal = ({ item, setIsModalOpen }) => {
  const [itemCount, setItemCount] = useState(item.count || 1); // 모달에서 초기 수량 설정

  const dispatch = useDispatch();

  // 모달이 열릴 때 itemCount가 modalItem.count로 초기화되도록 effect 추가
  useEffect(() => {
    if (item) {
      setItemCount(item.count);
    }
  }, [item]);

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
    const updatedItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      img: item.img,
      count: itemCount,
      category: item.category, // 카테고리 추가
      userEmail: item.userEmail, // 사용자 이메일 추가
    };
    dispatch(updateCartItem(updatedItem)); // 장바구니 아이템 수량 업데이트
    closeFn(); // 모달 닫기
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
