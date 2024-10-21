import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart, migrateGuestCartToUser } from "../../src/slice/cartSlice1";
import CartModal from "./CartModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const CartList1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const isLogin = useSelector((state) => state.auth.isLogin);
  const loginUser = useSelector((state) => state.auth.loginUser);
  const userEmail = isLogin ? loginUser[0].userEmail : "guest";
  const cartItems = useSelector((state) => state.cart.items);

  const filteredCartItems = cartItems.filter(
    (item) => item.userEmail === userEmail
  );

  const totalPages = Math.ceil(filteredCartItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCartItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  let totalPrice = 0;

  filteredCartItems.forEach((item) => {
    totalPrice += item.price * item.count;
  });

  const openModal = (item) => {
    setModalItem({ ...item, userEmail });
    setIsModalOpen(true);
  };

  const goToPayment = () => {
    navigate("/order/payment");
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

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

  useEffect(() => {
    if (isLogin) {
      dispatch(migrateGuestCartToUser({ userEmail }));
    }
  }, [isLogin, userEmail, dispatch]);

  const renderPaginationButtons = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <>
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`pagination-arrow ${
              currentPage === 1 ? "disabled" : ""
            }`}
            disabled={currentPage === 1}
          >
            {/* ← */} 이전
          </button>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`cart-pagination-btn ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`pagination-arrow ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            {/* → */} 다음
          </button>
        )}
      </>
    );
  };

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
                    <span>가격: {el.price.toLocaleString()} 원</span>
                    <span>갯수: {el.count}</span>
                    <span>
                      총금액: {(el.count * el.price).toLocaleString()} 원
                    </span>
                  </div>
                  <span
                    className="cart-delete"
                    onClick={() => openDeleteModal(el)}
                  >
                    삭제
                  </span>
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

        {filteredCartItems.length > itemsPerPage && (
          <div className="cart-pagination">{renderPaginationButtons()}</div>
        )}

        {filteredCartItems.length > 0 && (
          <div className="cart-payment">
            <div className="cart-sum-price">
              총합계: {totalPrice.toLocaleString()} 원
            </div>
            <button className="cart-payment-button" onClick={goToPayment}>
              결제하기
            </button>
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
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CartList1;
