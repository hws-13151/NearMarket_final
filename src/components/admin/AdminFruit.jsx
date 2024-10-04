import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAdminFruitFn } from '../../slice/adminSlice';
import AdminProductModal from './AdminProductModal';

const AdminFruit = () => {
  const fruitItems = useSelector(state => state.admin.fruitItems);
  const dispatch = useDispatch(); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    dispatch(asyncAdminFruitFn());
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
    <div className="admin-fruit">
      <div className="admin-fruit-con">
        {fruitItems && fruitItems.length > 0 ? (
          fruitItems.map((el, idx) => (
            <ul key={idx} onClick={() => openModal(el)}> 
              <li>{el.id}</li>
              <li>{el.title}</li>
              <li><img src={`/images/fruit/${el.img}`} alt={el.img} /></li>
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
          type="fruitItems" 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default AdminFruit;
