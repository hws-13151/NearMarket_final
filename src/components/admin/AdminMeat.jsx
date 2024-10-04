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
        <div className="admin-meat-title">
          <h1>육류코너</h1>
          <div className="title-right">
            <span style={{color:'#ff0000'}}>{meatItems.length}</span>
            <span> 개의 상품이 있습니다.</span>
          </div>
        </div>
        <div className="admin-meat-item">
          <ul>
            {meatItems && meatItems.length > 0 ? (
              meatItems.map((el, idx) => (
                <li key={idx} onClick={() => openModal(el)}> 
                  <div className="top">
                    <img src={`/images/meat/${el.img}`} alt={el.img} />
                  </div>
                  <div className="bottom">
                    <span style={{fontSize:'20px'}}>{el.title}</span>
                    <span style={{fontSize:'14px'}}>{el.description}</span>
                    <span style={{fontWeight:'bold'}}>{el.price.toLocaleString()}원</span>
                  </div>
                </li>
              ))
            ) : (
              <p>상품 정보가 없습니다.</p>
            )}
          </ul>
        </div>
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
