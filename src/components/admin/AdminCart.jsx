import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCartItem } from "../../slice/cartSlice1";
import AdminCartModal from "./AdminCartModal";

const AdminCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false); // 삭제 확인 상태

  const categories = [
    { key: "snackItems", name: "과자 코너" },
    { key: "fruitItems", name: "과일 코너" },
    { key: "meatItems", name: "고기 코너" },
    { key: "vegetableItems", name: "야채 코너" },
  ];

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    dispatch(
      deleteCart({ id: selectedItem.id, category: selectedItem.category })
    );
    setIsDeleteConfirmation(false); // 삭제 확인 모달 닫기
    handleCloseModal(); // 모달 닫기
  };

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmation(true); // 삭제 확인 모달 열기
  };

  const handleUpdate = (id, count) => {
    dispatch(updateCartItem({ id, count, category: selectedItem.category }));
  };

  return (
    <div className="admin-cart">
      <h2>관리자 장바구니 조회</h2>
      {categories.map((category) => {
        const filteredItems = cartItems.filter(
          (item) => item.category === category.key
        );
        return (
          <div className="category-section" key={category.key}>
            <h3>{category.name}</h3>
            <div className="category-items">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    className="admin-cart-item"
                    key={item.id}
                    onClick={() => handleOpenModal(item)}
                  >
                    <img src={item.img} alt={item.title} width="100" />
                    <div className="admin-cart-info">
                      <p>상품명: {item.title}</p>
                      <p>가격: {item.price} 원</p>
                      <p>갯수: {item.count}</p>
                      <p>총금액: {item.count * item.price} 원</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>장바구니에 {category.name}이 없습니다.</p>
              )}
            </div>
          </div>
        );
      })}

      {isModalOpen && (
        <AdminCartModal
          item={selectedItem}
          onClose={handleCloseModal}
          onDeleteConfirm={openDeleteConfirmation} // 삭제 확인 모달 여는 함수 전달
          onUpdate={handleUpdate}
          isDeleteConfirmation={isDeleteConfirmation}
          handleDeleteConfirmationClose={() => setIsDeleteConfirmation(false)}
          handleDelete={handleDelete} // 실제 삭제 함수 전달
        />
      )}
    </div>
  );
};

export default AdminCart;
