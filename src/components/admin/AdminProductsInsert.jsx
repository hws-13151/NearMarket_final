import React, { useRef, useState } from 'react'

const itemData ={
  title: "",
  price: 0,
  discription: "",
  img: ""
}

const AdminProductsInsert = () => {

  const [formData,setFormData] = useState(itemData)

  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
	const file = imgRef.current.files[0];
	const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImgFile(reader.result);
  };
};

  return (
    <>
      <div className="insert">
        <div className="insert-con">
          <div className="insert-left">
            <div className="insert-left-con">
              <img src={imgFile ? imgFile : "none"} alt="이미지를 첨부해 주세요" />
            </div>
          </div>
          <div className="insert-right">
            <div className="insert-right-con">
              <div className="right-top">
                <h1>상품등록</h1>
                <ul>
                  <li>
                    <p>상품 이름</p>
                    <input type="text" name="title" id="title" placeholder='상품 이름을 입력하세요.'/>
                  </li>
                  <hr />
                  <li>
                    <p>상품 가격</p>
                    <input type="number" name="price" id="price" placeholder='상품 가격을 입력하세요. (숫자만)' />
                  </li>
                  <hr />
                  <li>
                    <p>상품 설명</p>
                  </li>
                  <li>
                    <textarea name="description" id="description" placeholder='상품 설명을 입력하세요.'></textarea>
                  </li>
                  <hr />
                  <li>
                    <select name="order-corner" id="order-corner">
                      <option value="">상품코너 선택</option>
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
                <input type="file" accept='image/*' name="img" id="img"
                onChange={saveImgFile}
                ref={imgRef}
                />
                <button>상품등록</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProductsInsert