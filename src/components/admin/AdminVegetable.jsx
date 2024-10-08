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
        <ul>
        {vegetableItems && vegetableItems.length > 0 ? (
          vegetableItems.map((el, idx) => (
            <li key={idx} onClick={() => openModal(el)}> 
              <li>{el.id}</li>
              <div className="top">
                  <img src={`/images/vegetable/${el.img}`} alt={el.img} />
                </div>

              <div className="bottom">
                  <span>{el.title}</span>
                  <span className="delivery-order">
                    <img src={`/images/vegetable/${el.rocket}`} alt= {el.rocket}/>로켓배송
                  </span>
                  <span>{el.description}</span>
                  <span>{el.price}원</span>
                </div>
            </li>
          ))
        ) : (
          <p>상품 정보가 없습니다.</p>
        )}
        </ul>
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
