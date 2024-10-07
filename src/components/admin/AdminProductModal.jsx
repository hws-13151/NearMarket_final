import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  asyncAdminFruitFn,
  asyncAdminVegetableItemsFn,
  asyncAdminSnackItemsFn,
  asyncAdminMeatItemsFn
} from '../../slice/adminSlice';

const AdminProductModal = ({ product, type, onClose }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [img, setImg] = useState(product.img); // img 파일 이름 사용
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState([])

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setImg(file.name); // 이미지 파일 이름 저장
    }
  };

  const preview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    }
    if(file && file.type.match('image.*')){
      reader.readAsDataURL(file);
    }
  }


  // 상품 업데이트 함수
  const productUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/${type}/${product.id}`, {
        title,
        price,
        img, // img 파일 이름 전송
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
    const isConfirmed = window.confirm("정말로 상품 정보를 삭제하시겠습니까?");
    if (isConfirmed) {
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
          accept="image/jpg, image/png, image/jpeg" 
          name="img" 
          id="img"
          onChange={uploadFile} 
          onChangeCapture={preview}
        />
        {img && <img src={previewImg ? previewImg : "/default-image-path.jpg"} alt="미리보기" style={{ width: '100px', height: '100px' }} />}
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
