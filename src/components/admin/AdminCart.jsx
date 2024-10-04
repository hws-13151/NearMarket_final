import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCartItem } from "../../slice/cartSlice1";

const AdminCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // 카테고리별로 필터링
  const snackItems = cartItems.filter((item) => item.category === "snackItems");
  const fruitItems = cartItems.filter((item) => item.category === "fruitItems");
  const meatItems = cartItems.filter((item) => item.category === "meatItems");
  const vegetableItems = cartItems.filter(
    (item) => item.category === "vegetableItems"
  );

  const handleUpdate = (item) => {
    const newCount = prompt("수량을 입력하세요:", item.count);
    if (newCount) {
      dispatch(
        updateCartItem({
          id: item.id,
          category: item.category,
          count: Number(newCount),
        })
      );
    }
  };

  const handleDelete = (item) => {
    // 삭제 확인 창을 띄움
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (isConfirmed) {
      dispatch(deleteCart({ id: item.id, category: item.category }));
    }
  };

  return (
    <div className="admin-cart">
      <h2>관리자 장바구니 조회</h2>
      <div className="admin-cart-list">
        {/* 과자 아이템 */}
        {snackItems.length > 0 ? (
          <div>
            <h3>과자 아이템</h3>
            {snackItems.map((item, idx) => (
              <div className="admin-cart-item" key={idx}>
                <img src={item.img} alt={item.title} width="100" />
                <div className="admin-cart-info">
                  <p>상품명: {item.title}</p>
                  <p>가격: {item.price} 원</p>
                  <p>갯수: {item.count}</p>
                  <p>총금액: {item.count * item.price} 원</p>
                  <button onClick={() => handleUpdate(item)}>수정</button>
                  <button onClick={() => handleDelete(item)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>장바구니에 과자 아이템이 없습니다.</p>
        )}

        {/* 과일 아이템 */}
        {fruitItems.length > 0 ? (
          <div>
            <h3>과일 아이템</h3>
            {fruitItems.map((item, idx) => (
              <div className="admin-cart-item" key={idx}>
                <img src={item.img} alt={item.title} width="100" />
                <div className="admin-cart-info">
                  <p>상품명: {item.title}</p>
                  <p>가격: {item.price} 원</p>
                  <p>갯수: {item.count}</p>
                  <p>총금액: {item.count * item.price} 원</p>
                  <button onClick={() => handleUpdate(item)}>수정</button>
                  <button onClick={() => handleDelete(item)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>장바구니에 과일 아이템이 없습니다.</p>
        )}

        {/* 고기 아이템 */}
        {meatItems.length > 0 ? (
          <div>
            <h3>고기 아이템</h3>
            {meatItems.map((item, idx) => (
              <div className="admin-cart-item" key={idx}>
                <img src={item.img} alt={item.title} width="100" />
                <div className="admin-cart-info">
                  <p>상품명: {item.title}</p>
                  <p>가격: {item.price} 원</p>
                  <p>갯수: {item.count}</p>
                  <p>총금액: {item.count * item.price} 원</p>
                  <button onClick={() => handleUpdate(item)}>수정</button>
                  <button onClick={() => handleDelete(item)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>장바구니에 고기 아이템이 없습니다.</p>
        )}

        {/* 채소 아이템 */}
        {vegetableItems.length > 0 ? (
          <div>
            <h3>채소 아이템</h3>
            {vegetableItems.map((item, idx) => (
              <div className="admin-cart-item" key={idx}>
                <img src={item.img} alt={item.title} width="100" />
                <div className="admin-cart-info">
                  <p>상품명: {item.title}</p>
                  <p>가격: {item.price} 원</p>
                  <p>갯수: {item.count}</p>
                  <p>총금액: {item.count * item.price} 원</p>
                  <button onClick={() => handleUpdate(item)}>수정</button>
                  <button onClick={() => handleDelete(item)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>장바구니에 채소 아이템이 없습니다.</p>
        )}

        {/* 전체 장바구니가 비었을 경우 */}
        {snackItems.length === 0 &&
          fruitItems.length === 0 &&
          meatItems.length === 0 &&
          vegetableItems.length === 0 && <p>장바구니가 비어 있습니다.</p>}
      </div>
    </div>
  );
};

export default AdminCart;
