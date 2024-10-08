import React, { useState, useEffect } from "react";

const AdminCartModal = ({
  item,
  onClose,
  onDeleteConfirm,
  onUpdate,
  isDeleteConfirmation,
  handleDeleteConfirmationClose,
  handleDelete,
}) => {
  const [count, setCount] = useState(item.count);

  useEffect(() => {
    setCount(item.count < 1 ? 1 : item.count);
  }, [item]);

  const handleUpdate = () => {
    if (count < 1) {
      setCount(1);
    } else if (count !== item.count) {
      onUpdate(item.id, count);
    }
    onClose(); // 모달 닫기
  };

  const handleCountChange = (e) => {
    const newCount =
      e.target.value === "" ? "" : Math.max(1, Number(e.target.value)); // 빈 값 허용, 1 이상 값으로 설정
    setCount(newCount);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{item.title}</h3>
        <img src={item.img} alt={item.title} width="100" />
        <p>가격: {item.price} 원</p>
        <label>
          수량:
          <input
            type="number"
            value={count}
            onChange={handleCountChange}
            min="1" // 최소값 설정
          />
        </label>

        <div className="modal-actions">
          <button onClick={onDeleteConfirm}>삭제</button>
          <button onClick={handleUpdate}>수정</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>

      {isDeleteConfirmation && (
        <div className="confirm-modal">
          <h3>삭제 확인</h3>
          <p>정말로 이 아이템을 삭제하시겠습니까?</p>
          <button onClick={handleDeleteConfirmationClose}>취소</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default AdminCartModal;
