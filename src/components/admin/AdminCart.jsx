import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItem, deleteCart } from "../../slice/cartSlice1"; // deleteCart 추가
import AdminCartModal from "./AdminCartModal";
import AdminCartModalDelete from "./AdminCartModalDelete";

const AdminCart = () => {
  const dispatch = useDispatch();
  const [modalItem, setModalItem] = useState(null);
  const [deleteItemModal, setDeleteItemModal] = useState(null);

  // 전체 장바구니 아이템
  const cartItems = useSelector((state) => state.cart.items);

  // 각 사용자의 장바구니 필터링
  const usersCart = cartItems.filter((item) => item.userEmail !== "guest");
  const guestsCart = cartItems.filter((item) => item.userEmail === "guest");

  // 수량 업데이트 함수
  const updateCount = (item, newCount) => {
    if (newCount < 1) return;
    dispatch(
      updateCartItem({
        id: item.id,
        category: item.category,
        userEmail: item.userEmail,
        count: newCount,
      })
    );
  };

  // 삭제 모달 열기
  const openDeleteModal = (item) => {
    setDeleteItemModal(item);
  };

  // 삭제 함수
  const handleDelete = (item) => {
    dispatch(deleteCart(item)); // 삭제 액션 호출
    setDeleteItemModal(null); // 모달 닫기
  };

  return (
    <div className="admin-cart-list">
      <h2>관리자 장바구니 조회</h2>

      <div className="cart-section">
        <h3>회원 장바구니</h3>
        {usersCart.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr>
                <th>이미지</th>
                <th>사용자 이메일</th>
                <th>카테고리</th>
                <th>상품명</th>
                <th>수량</th>
                <th>가격</th>
                <th>총 금액</th>
                <th>추가 시간</th> {/* 추가 시간 컬럼 */}
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {usersCart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img} alt={item.title} className="cart-img" />
                  </td>
                  <td>{item.userEmail}</td>
                  <td>{item.category}</td>
                  <td>{item.title}</td>
                  {/* 수량을 데이터로 표시 */}
                  <td>
                    <span>{item.count}</span> {/* 수량 표시로 변경 */}
                  </td>
                  <td>{item.price} 원</td>
                  <td>{item.price * item.count} 원</td>
                  <td>{new Date(item.createdAt).toLocaleString()} </td>{" "}
                  {/* 추가 시간 출력 */}
                  <td>
                    <button
                      onClick={() => setModalItem(item)}
                      className="update-btn"
                    >
                      수정
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => openDeleteModal(item)}
                      className="delete-btn"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>회원 장바구니가 비어 있습니다.</p>
        )}
      </div>

      <div className="cart-section">
        <h3>비회원 장바구니</h3>
        {guestsCart.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr>
                <th>이미지</th>
                <th>카테고리</th>
                <th>상품명</th>
                <th>수량</th>
                <th>가격</th>
                <th>총 금액</th>
                <th>추가 시간</th> {/* 추가 시간 컬럼 */}
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {guestsCart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img} alt={item.title} className="cart-img" />
                  </td>
                  <td>{item.category}</td>
                  <td>{item.title}</td>
                  {/* 수량을 데이터로 표시 */}
                  <td>
                    <span>{item.count}</span> {/* 수량 표시로 변경 */}
                  </td>
                  <td>{item.price} 원</td>
                  <td>{item.price * item.count} 원</td>
                  <td>{new Date(item.createdAt).toLocaleString()} </td>{" "}
                  {/* 추가 시간 출력 */}
                  <td>
                    <button
                      onClick={() => setModalItem(item)}
                      className="update-btn"
                    >
                      수정
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => openDeleteModal(item)}
                      className="delete-btn"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>비회원 장바구니가 비어 있습니다.</p>
        )}
      </div>

      {modalItem && (
        <AdminCartModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
      {deleteItemModal && (
        <AdminCartModalDelete
          item={deleteItemModal}
          onClose={() => setDeleteItemModal(null)}
          onDelete={handleDelete} // 삭제 함수 전달
        />
      )}
    </div>
  );
};

export default AdminCart;
