import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAdminMeatItemsFn } from '../../slice/adminSlice';
import AdminProductModal from './AdminProductModal'; 
const AdminMeat = () => {
  const meatItems = useSelector(state => state.admin.meatItems);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncAdminMeatItemsFn());
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
        {meatItems && meatItems.length > 0 ? (
          meatItems.map((el, idx) => (
            <ul key={idx} onClick={() => openModal(el)}> 
              <li>{el.id}</li>
              <li>{el.title}</li>
              <li><img src={`/images/meat/${el.img}`} alt={el.img} /></li>
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
          type="meatItems" 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default AdminMeat;
