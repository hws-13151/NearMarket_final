import React from 'react'

const AdminProductsInsert = () => {
  return (
    <>
      <div className="insert">
        <div className="insert-con">
          <div className="insert-left">
            <img src="/" alt="첨부할 이미지" />
          </div>
          <div className="insert-right">
            <div className="insert-right-con">
              <div className="right-top">
                <h1>상품등록</h1>
                <ul>
                  <li>
                    <p>상품 이름</p>
                    <input type="text" name="" id="" placeholder='상품 이름을 입력하세요.'/>
                  </li>
                  <hr />
                  <li>
                    <p>상품 가격</p>
                    <input type="number" name="number" id="number" placeholder='상품 가격을 입력하세요. (숫자만)' />
                  </li>
                  <hr />
                  <li>
                    <p>상품 설명</p>
                  </li>
                  <li>
                    <textarea name="" id="" placeholder='상품 설명을 입력하세요.'></textarea>
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
                <input type="file" name="" id="" />
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