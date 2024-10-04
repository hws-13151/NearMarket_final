import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAdminVegetableItemsFn } from '../../slice/adminSlice'; 
import AdminProductModal from './AdminProductModal'; 

const AdminVegetable = () => {
  const vegetableItems = useSelector(state => state.admin.vegetableItems);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncAdminVegetableItemsFn()); 
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
    <div className="admin-vegetable">
      <div className="admin-vegetable-con">
        {vegetableItems && vegetableItems.length > 0 ? (
          vegetableItems.map((el, idx) => (
            <ul key={idx} onClick={() => openModal(el)}> 
              <li>{el.id}</li>
              <li>{el.title}</li>
              <li><img src={`/images/vegetable/${el.img}`} alt={el.img} /></li>
              <li>{el.price}원</li>
              <li>{el.des}</li>
            </ul>
          ))
        ) : (
          <p>상품 정보가 없습니다.</p>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <AdminProductModal 
          product={selectedProduct} 
          type="vegetableItems" 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default AdminVegetable;
