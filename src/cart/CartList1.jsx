import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart, migrateGuestCartToUser } from "../../src/slice/cartSlice1";
import CartModal from "./CartModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import SelectDeleteModal from "./cartSeleteModal";

const CartList1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSelectDeleteModalOpen, setIsSelectDeleteModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const isLogin = useSelector((state) => state.auth.isLogin);
  const loginUser = useSelector((state) => state.auth.loginUser || []);
  const userEmail = isLogin ? loginUser[0]?.userEmail : "guest";
  const cartItems = useSelector((state) => state.cart.items || []);

  const filteredCartItems = cartItems.filter(
    (item) => item.userEmail === userEmail
  );

  const totalPages = Math.ceil(filteredCartItems.length / itemsPerPage);
  const currentItems = filteredCartItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPrice = filteredCartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  useEffect(() => {
    if (isLogin) {
      dispatch(migrateGuestCartToUser({ userEmail }));
    }
  }, [isLogin, userEmail, dispatch]);

  const isItemSelected = (item) =>
    selectedItems.some(
      (selected) =>
        selected.id === item.id &&
        selected.category === item.category &&
        selected.userEmail === item.userEmail
    );

  const toggleItemSelection = (item) => {
    setSelectedItems((prev) =>
      isItemSelected(item)
        ? prev.filter(
            (selected) =>
              selected.id !== item.id ||
              selected.category !== item.category ||
              selected.userEmail !== item.userEmail
          )
        : [...prev, item]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === currentItems.length ? [] : currentItems
    );
  };

  const openModal = (item) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setModalItem(item);
    setIsDeleteModalOpen(true);
  };

  const openSelectDeleteModal = () => {
    setIsSelectDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCart(modalItem));
    setIsDeleteModalOpen(false);
  };

  const confirmSelectDelete = () => {
    selectedItems.forEach((item) => dispatch(deleteCart(item)));
    setSelectedItems([]);
    setIsSelectDeleteModalOpen(false);
  };

  const handlePageClick = (page) => setCurrentPage(page);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="cart-list">
      <div className="cart-list-con">
        <h3 className="cart-title">장바구니 목록</h3>

        <div className="cart-item-con">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div
                className="cart-item"
                key={`${item.id}-${item.category}-${item.userEmail}`}
              >
                <input
                  type="checkbox"
                  checked={isItemSelected(item)}
                  onChange={() => toggleItemSelection(item)}
                />
                <div className="cart-item-top">
                  <img src={item.img} alt={item.title} />
                  <button
                    onClick={() => openModal(item)}
                    className="cart-details-button"
                  >
                    상세정보
                  </button>
                </div>
                <div className="cart-item-bottom">
                  <div className="cart-details-container">
                    <span>카테고리: {item.category}</span>
                    <span>상품명: {item.title}</span>
                    <span>가격: {item.price.toLocaleString()} 원</span>
                    <span>갯수: {item.count}</span>
                    <span>
                      총금액: {(item.price * item.count).toLocaleString()} 원
                    </span>
                  </div>
                  <span
                    className="cart-delete"
                    onClick={() => openDeleteModal(item)}
                  >
                    삭제
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-null">
              <h1 onClick={() => navigate(-1)}>장바구니가 비어 있습니다!!!</h1>
            </div>
          )}
        </div>

        {currentItems.length > 0 && (
          <div className="cart-controls">
            <input
              type="checkbox"
              checked={selectedItems.length === currentItems.length}
              onChange={handleSelectAll}
            />
            <label>전체 선택</label>
            <button onClick={openSelectDeleteModal}>선택 삭제</button>
          </div>
        )}

        {filteredCartItems.length > itemsPerPage && (
          <div className="cart-pagination-container">
            <button
              className="cart-pagination-before-btn"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageClick(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="cart-pagination-after-btn"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        )}

        <div className="cart-payment">
          <div className="cart-sum-price">
            총합계: {totalPrice.toLocaleString()} 원
          </div>
          <button
            className="cart-payment-button"
            onClick={() => navigate("/order/payment")}
          >
            결제하기
          </button>
        </div>

        {isModalOpen && (
          <CartModal item={modalItem} setIsModalOpen={setIsModalOpen} />
        )}
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            item={modalItem}
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}
        {isSelectDeleteModalOpen && (
          <SelectDeleteModal
            items={selectedItems}
            onConfirm={confirmSelectDelete}
            onCancel={() => setIsSelectDeleteModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CartList1;
