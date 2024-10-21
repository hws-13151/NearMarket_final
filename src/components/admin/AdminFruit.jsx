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
    <>
      <div className="admin-member">
        <div className="admin-member-con">
          <h1>ADMIN-FRUITS</h1>
          <div className="members">
            <table>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>상품명</th>
                  <th>가격</th>
                  <th>설명</th>
                  <th>보기</th>
                </tr>
              </thead>
              <tbody>
                {fruitItems && fruitItems.length > 0 ? (
                  fruitItems.map((el, idx) => (
                    <tr key={idx}>
                      <td>{el.id}</td>
                      <td>{el.title}</td>
                      <td>{el.price.toLocaleString()}원</td>
                      <td>{el.description}</td>
                      <td>
                        <button onClick={() => openModal(el)}>보기</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">상품 정보가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <AdminProductModal
          product={selectedProduct} // 선택된 상품 데이터
          type="fruitItems" // 모달에서 사용할 타입
          onClose={closeModal} // 모달 닫기 함수
        />
      )}
    </>
  );
};

export default AdminFruit;
