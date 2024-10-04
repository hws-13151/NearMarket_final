import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { asyncAdminFruitFn, asyncAdminVegetableItemsFn, asyncAdminSnackItemsFn, asyncAdminMeatItemsFn } from '../../slice/adminSlice';

const AdminProductModal = ({ product, type, onClose }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price)
  const [img, setImg] = useState(product.img);
  const dispatch = useDispatch();

  // 상품 업데이트 함수
  const productUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/${type}/${product.id}`, {
        title,
        price,
        img,
        description
      });
      alert('상품 정보가 수정되었습니다.');
      onClose(); 

      // 상품 종류에 따라 데이터 다시 불러오기
      switch (type) {
        case 'fruitItems':
          dispatch(asyncAdminFruitFn());
          break;
        case 'vegetableItems':
          dispatch(asyncAdminVegetableItemsFn());
          break;
        case 'snackItems':
          dispatch(asyncAdminSnackItemsFn());
          break;
        case 'meatItems':
          dispatch(asyncAdminMeatItemsFn());
          break;
        default:
          break;
      }
    } catch (err) {
      alert(err);
    }
  };

  // 상품 삭제 함수
  const productDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/${type}/${product.id}`);
      alert('상품이 삭제되었습니다.');
      onClose(); 

      // 상품 종류에 따라 데이터 다시 불러오기
      switch (type) {
        case 'fruitItems':
          dispatch(asyncAdminFruitFn());
          break;
        case 'vegetableItems':
          dispatch(asyncAdminVegetableItemsFn());
          break;
        case 'snackItems':
          dispatch(asyncAdminSnackItemsFn());
          break;
        case 'meatItems':
          dispatch(asyncAdminMeatItemsFn());
          break;
        default:
          break;
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{`상품 정보 수정 (${type})`}</h2>
        <label>상품명:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <label>이미지 수정:</label>
        <input 
          type="file" 
          onChange={(e) => setImg(e.target.value)} 
        />
        <label>가격:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <label>설명:</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button onClick={productUpdate}>수정</button>
        <button onClick={productDelete}>삭제</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default AdminProductModal;
