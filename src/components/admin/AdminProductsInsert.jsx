import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const itemData = {
  title: "",
  price: 0,
  description: "",
  img: ""

}

const AdminProductsInsert = () => {

  const [formData, setFormData] = useState(itemData)
  const [imgFile, setImgFile] = useState([]);
  const [isTitle, setIsTitle] = useState(false)
  const imgRef = useRef();
  const selectedCategory = formData["order-corner"];
  const navigate = useNavigate()

  const itemAddFn = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? Number(value) : value; // 가격을 숫자로 변환
    setFormData({
      ...formData,
      [name]: newValue
    })
  }

  // 이미지 미리보기
  const saveImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        img: file.name
      })
    }
  };

  const updateItemFn = async () => {
    try {
      if (formData.title === "") {
        alert("상품 이름을 입력해 주세요")
        return
      }
      if (formData.price === 0) {
        alert("상품 가격을 입력해 주세요")
        return
      }
      if (formData.description === "") {
        alert("상품 설명을 입력해 주세요")
        return
      }
      if (formData.img === "") {
        alert("상품 이미지를 등록해 주세요")
        return
      }
      // 상품을 코너별로 db에 저장
      let itemUrl = '';
      switch (selectedCategory) {
        case 'vegetable':
          itemUrl = 'vegetableItems'
          break
        case 'meat':
          itemUrl = 'meatItems'
          break
        case 'fruit':
          itemUrl = 'fruitItems'
          break
        case 'snack':
          itemUrl = 'snackItems'
          break
        case 'best':
          itemUrl = 'indexItems'
          break
        default:
          alert('상품 코너를 선택하세요.');
          return
      }
      const res = await axios.get(`http://localhost:3001/${itemUrl}`)
      const num = res.data.findIndex(el => {
        return el.title === formData.title
      })
      if (num !== -1) {
        alert("이미 등록된 상품입니다.")
        setIsTitle(false)
        console.log(isTitle)
        return
      } else {
        setIsTitle(true)
      }
      await axios.post(`http://localhost:3001/${itemUrl}`, formData)
      alert("상품등록 성공!~ (˶ᵔ ᵕ ᵔ˶)")
      navigate(`/admin/${selectedCategory}`)
    } catch (error) {
      alert('상품 등록 중 오류가 발생했습니다.')
    }
  }

  return (
    <>
      <div className="insert">
        <div className="insert-con">
          <div className="insert-left">
            <div className="insert-left-con">
              <img src={imgFile ? imgFile : "/default-image-path.jpg"} alt="이미지를 첨부해 주세요" />
            </div>
          </div>
          <div className="insert-right">
            <div className="insert-right-con">
              <div className="right-top">
                <h1>상품등록</h1>
                <ul>
                  <li>
                    <p>상품 이름</p>
                    <input type="text" name="title" id="title"
                      onChange={itemAddFn}
                      placeholder='상품 이름을 입력하세요.' />
                  </li>
                  <hr />
                  <li>
                    <p>상품 가격</p>
                    <input type="number" name="price" id="price"
                      onChange={itemAddFn}
                      placeholder='상품 가격을 입력하세요. (숫자만)' />
                  </li>
                  <hr />
                  <li>
                    <p>상품 설명</p>
                    <textarea name="description" id="description"
                      onChange={itemAddFn}
                      placeholder='상품 설명을 입력하세요.'></textarea>
                  </li>
                  <hr />
                  <li>
                    <select name="order-corner" id="order-corner" onChange={itemAddFn}>
                      <option value="">상품코너 선택</option>
                      <option value="best">베스트코너</option>
                      <option value="vegetable">채소코너</option>
                      <option value="meat">고기코너</option>
                      <option value="fruit">과일코너</option>
                      <option value="snack">과자코너</option>
                    </select>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="right-bottom">
                <label htmlFor="img">상품 이미지 선택</label>
                <input multiple type="file" accept='image/jpg, image/png, image/jpeg' name="img" id="img"
                  onChange={saveImgFile}
                  onChangeCapture={itemAddFn}
                  ref={imgRef}
                />
                <button onClick={updateItemFn}>상품등록</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProductsInsert