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
