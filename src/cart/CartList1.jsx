import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart, migrateGuestCartToUser } from "../../src/slice/cartSlice1";
import CartModal from "./CartModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const CartList1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // 사용자 인증 상태
  const { isLogin, loginUser } = useSelector((state) => state.auth);

  const userEmail = isLogin ? loginUser[0].userEmail : "guest";

  // 장바구니 아이템
  const cartItems = useSelector((state) => state.cart.items);

  console.log(cartItems);
  // userEmail에 해당하는 cartItems 필터링
  const filteredCartItems = cartItems.filter(
    (item) => item.userEmail === userEmail
  );

  const totalPrice = filteredCartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지당 표시할 아이템 수

  // 현재 페이지에 표시할 아이템 계산
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredCartItems.slice(firstItemIndex, lastItemIndex);

  // 총 페이지 수
  const totalPages = Math.ceil(filteredCartItems.length / itemsPerPage);

  // 페이지네이션 핸들러
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // 모달 열기
  const openModal = (item) => {
    setModalItem({ ...item, userEmail });
    setIsModalOpen(true);
  };

  // 결제 페이지로 이동
  const goToPayment = () => {
    navigate("/order/payment");
  };

  // 삭제 모달 열기
  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  // 아이템 삭제 확인
  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(
        deleteCart({
          id: itemToDelete.id,
          category: itemToDelete.category,
          userEmail,
        })
      );
      setItemToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  // 삭제 취소
  const cancelDelete = () => {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // 사용자 장바구니 마이그레이션
  useEffect(() => {
    if (isLogin) {
      dispatch(migrateGuestCartToUser({ userEmail }));
    }
  }, [isLogin, userEmail, dispatch]);

  return (
    <div className="cart-list">
      <div className="cart-list-con">
        <h3 className="cart-title">장바구니 목록</h3>

        <div className="cart-item-con">
          {currentItems.length > 0 ? (
            currentItems.map((el, idx) => (
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
                    <span>카테고리: {el.category}</span>
                    <span>상품명: {el.title}</span>
                    <span>가격: {el.price} 원</span>
                    <span>갯수: {el.count}</span>
                    <span>총금액: {el.count * el.price} 원</span>
                  </div>
                  <div className="cart-actions-container">
                    <span
                      className="cart-delete"
                      onClick={() => openDeleteModal(el)}
                    >
                      X
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-null">
              <h1 onClick={() => navigate(-1)}>
                <span>장바구니가 비어 있습니다!!!</span>
              </h1>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        )}

        {filteredCartItems.length > 0 && (
          <div className="cart-payment">
            <div className="cart-payment-sub">
              <div className="cart-sum-price">총합계: {totalPrice} 원</div>
              <div className="cart-payment-buttons">
                <button onClick={goToPayment}>결제하기</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <CartModal item={modalItem} setIsModalOpen={setIsModalOpen} />
      )}
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          item={itemToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default CartList1;
