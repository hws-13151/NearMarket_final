import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart1 } from "../../slice/cartSlice1";

const OrderFruitDetail = () => {
  const { id } = useParams();
  const [fruitDetail, setFruitDetail] = useState(null);
  const [count, setCount] = useState(1);
  const [isPremium, setIsPremium] = useState(false); // 프리미엄 여부
  const [isOrganic, setIsOrganic] = useState(false); // 유기농 여부
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFruitDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/fruitItems/${id}`);
        setFruitDetail(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchFruitDetail();
  }, [id]);

  const fruitIncrementFn = () => {
    setCount(count + 1);
  };

  const fruitDecrementFn = () => {
    count <= 1 ? setCount(1) : setCount(count - 1);
  };

  const calculateTotalPrice = () => {
    let additionalPrice = 0;
    if (isPremium) additionalPrice += 3000 * count; // 프리미엄 옵션이 선택되면 과일 개수에 따라 추가
    if (isOrganic) additionalPrice += 2000 * count; // 유기농 옵션이 선택되면 과일 개수에 따라 추가
    return fruitDetail.price * count + additionalPrice; // 기본 가격 + 추가 가격
  };

  // const addCartFn = () => {
  //   if (fruitDetail) {
  //     dispatch(
  //       addCart1({
  //         id: fruitDetail.id,
  //         img: fruitDetail.img,
  //         title: fruitDetail.title,
  //         price: fruitDetail.price,
  //         count,
  //         isPremium,
  //         isOrganic,
  //       })
  //     );
  //     setShowPopup(true); // 팝업창 띄우기
  //   }
  // };

  if (!fruitDetail) return <div>Loading...</div>;

  return (
    <div className="fruit-detail">
      <div className="fruit-detail-con">
        <ul>
          <li>
            <h2>{fruitDetail.title}</h2>
          </li>
          <li>
            <img
              src={`/images/fruit/${fruitDetail.img}`}
              alt={fruitDetail.title}
            />
          </li>
          <li>{fruitDetail.des}</li>
          <li>{calculateTotalPrice().toLocaleString()}원</li>
          <li>
            <button onClick={fruitIncrementFn}>+</button>
            <span>{count}</span>
            <button onClick={fruitDecrementFn}>-</button>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
              />
              프리미엄 {fruitDetail.title} (3,000원 추가)
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={isOrganic}
                onChange={(e) => setIsOrganic(e.target.checked)}
              />
              유기농 {fruitDetail.title} (2,000원 추가)
            </label>
          </li>
        </ul>
      </div>
      <div className="order-go">
        <button onClick={() => navigate(-1)}>이전페이지</button>
        <button >장바구니</button>
        <button>결제</button>
      </div>

      {/* 팝업 모달 */}
      {/* {showPopup && (
        <div className="popup-modal">
          <div className="popup-content">
            <p>{fruitDetail.title}이(가) 장바구니에 추가되었습니다!</p>
            <button onClick={() => setShowPopup(false)}>쇼핑 계속하기</button>
            <button onClick={() => navigate("/order/cart")}>
              장바구니로 이동
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default OrderFruitDetail;
