import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAdminSnackItemsFn } from '../../slice/adminSlice';
import AdminProductModal from './AdminProductModal'; 

const AdminSnack = () => {
  const snackItems = useSelector(state => state.admin.snackItems); // 수정된 부분
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncAdminSnackItemsFn());
  }, []);

  // 모달 열기 함수
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="admin-meat">
      <div className="admin-meat-con">
        {snackItems && snackItems.length > 0 ? ( // snackItems로 수정
          snackItems.map((el, idx) => (
            <ul key={idx} onClick={() => openModal(el)}> 
              <li>{el.id}</li>
              <li>{el.title}</li>
              <li><img src={`/images/ordersnack/${el.img}`} alt={el.img} /></li>
              <li>{el.price}원</li>
              <li>{el.description}</li>
            </ul>
          ))
        ) : (
          <p>상품 정보가 없습니다.</p>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <AdminProductModal 
          product={selectedProduct} 
          type="snackItems" // snackItems로 수정
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default AdminSnack;
