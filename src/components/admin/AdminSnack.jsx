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
    <>
      <div className="admin-snack-all">
        <div className="admin-snack-header">
          <h2>
            신메뉴 <span>Total {snackItems.length}</span>
          </h2>
        </div>
        <div className="admin-snack">
          <div className="admin-snack-con">
            <ul>
              {snackItems && snackItems.length > 0 ? ( // snackItems로 수정
                snackItems.map((el, idx) => {
                  return(
                    <li key={idx} onClick={() => openModal(el)}>
                        <div className="top">
                          <img
                            src={`/images/ordersnack/${el.img}`}
                            alt={`${el.title} 이미지`} // alt 속성 추가
                          />
                        </div>
                        <div className="bottom">
                          <span className="title">{el.title}</span>
                          <p className="description">{el.description}</p>
                          <span className="price">{el.price}원</span>
                        </div>
                      </li>
                  )
                })
              ) : (
                <p>상품 정보가 없습니다.</p>
              )}
            </ul>
          </div>

          {isModalOpen && selectedProduct && (
            <AdminProductModal 
              product={selectedProduct} 
              type="snackItems" // snackItems로 수정
              onClose={closeModal} 
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSnack;
=======
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminProductModal from './AdminProductModal';
import { asyncAdminMeatItemsFn, asyncAdminSnackItemsFn } from '../../slice/adminSlice';

const AdminBest = () => {
  const indexItems = useSelector(state => state.admin.snackItems);
  const dispatch = useDispatch(); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    dispatch(asyncAdminSnackItemsFn());
  }, [dispatch]); 

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
    <div className="admin-product">
      <div className="admin-product-con">
        <h1>과자 상품 목록</h1>
        <div className="products">
          <table>
            <thead>
              <tr>
                <th>아이디</th>
                <th>제목</th>
                <th>이미지</th>
                <th>가격</th>
                <th>설명</th>
                <th>보기</th>
              </tr>
            </thead>
            <tbody>
              {indexItems && indexItems.length > 0 ? (
                indexItems.map((el, idx) => (
                  <tr key={idx}>
                    <td>{el.id}</td>
                    <td>{el.title}</td>
                    <td><img src={`/images/ordersnack/${el.img}`} alt={el.title} style={{ width: '50px' }} /></td>
                    <td>{el.price.toLocaleString()}원</td>
                    <td>{el.description}</td>
                    <td><button onClick={() => openModal(el)}>보기</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">상품 정보가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <AdminProductModal
          product={selectedProduct} 
          type="snackItems" 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default AdminBest;
