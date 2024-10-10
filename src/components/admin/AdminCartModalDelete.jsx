import React from "react";
import { useDispatch } from "react-redux";
import { deleteCart } from "../../slice/cartSlice1";

const AdminCartModalDelete = ({ item, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deleteCart({
        id: item.id,
        category: item.category,
        userEmail: item.userEmail,
      })
    );
    onClose();
  };

  return (
    <div className="modal">
      <h2>{item.title} 삭제하시겠습니까?</h2>
      <button onClick={handleDelete}>확인</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
};

export default AdminCartModalDelete;
