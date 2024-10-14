import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart1 } from "../../slice/cartSlice1"; // 장바구니에 추가 액션

const DetailModal = ({ setIsModal, cartItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModal(false);
  };

  // "장바구니로 이동하기" 버튼 클릭 시 장바구니에 데이터 전송
  const moveToCart = () => {
    if (cartItem) {
      dispatch(addCart1(cartItem)); // 장바구니에 아이템 추가
      navigate("/order/cart"); // 장바구니 페이지로 이동
    }
    closeModal(); // 모달 닫기
  };

  return (
    <div className="modal">
      <div className="modal-con">
        <div className="modal-top">
          <span>알림</span>
          <span className="close" onClick={closeModal}>
            X
          </span>
        </div>
        <div className="modal-body">
          <p>장바구니에 추가했습니다.</p>
          <ul>
            <li onClick={closeModal}>계속 쇼핑하기</li>
            <li onClick={moveToCart}>장바구니로 이동하기</li>{" "}
            {/* 장바구니로 이동 시 데이터 전송 */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
