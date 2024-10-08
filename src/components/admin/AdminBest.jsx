import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAdminindexItemsFn } from '../../slice/adminSlice';
import AdminProductModal from './AdminProductModal';

const AdminBest = () => {
  const indexItems = useSelector(state => state.admin.indexItems);
  const dispatch = useDispatch(); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    dispatch(asyncAdminindexItemsFn());
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
    <div className="admin-best">
      <div className="admin-best-con">
        {indexItems && indexItems.length > 0 ? (
          indexItems.map((el, idx) => (
            <ul key={idx} onClick={() => openModal(el)}> 
              <li>{el.id}</li>
              <li>{el.title}</li>
              <li><img src={`/images/orderindex/${el.img}`} alt={el.img} /></li>
              <li>{el.price.toLocaleString()}원</li>
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
          type="indexItems" 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default AdminBest;
