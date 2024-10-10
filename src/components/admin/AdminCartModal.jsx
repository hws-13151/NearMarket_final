import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../../slice/cartSlice1";

const AdminCartModal = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const [newCount, setNewCount] = useState(item.count);

  const handleUpdate = () => {
    dispatch(
      updateCartItem({
        id: item.id,
        category: item.category,
        userEmail: item.userEmail,
        count: newCount,
      })
    );
    onClose();
  };

  return (
    <div className="modal">
      <h2>{item.title} 수정하기</h2>
      <label>
        수량:
        <input
          type="number"
          value={newCount}
          onChange={(e) => setNewCount(Number(e.target.value))}
        />
      </label>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
};

export default AdminCartModal;
