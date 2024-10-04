import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart1 } from "../../slice/cartSlice1";

const OrderFruitDetail = (param) => {
  const navigate = useNavigate();
  const [fruitDetail, setFruitDetail] = useState(null);
  const [count, setCount] = useState(1);
  const [isPremium, setIsPremium] = useState(false);
  const [isOrganic, setIsOrganic] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFruitDetail = async () => {
      const fruitId = param.param.id;
      try {
        const res = await axios.get(
          `http://localhost:3001/fruitItems/${fruitId}`
        );
        setFruitDetail(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchFruitDetail();
  }, []);

  const fruitIncrementFn = () => {
    setCount(count + 1);
  };

  const fruitDecrementFn = () => {
    count <= 1 ? setCount(1) : setCount(count - 1);
  };

  const calculateTotalPrice = () => {
    let additionalPrice = 0;
    if (isPremium) additionalPrice += 3000 * count; // 프리미엄 옵션 추가
    if (isOrganic) additionalPrice += 2000 * count; // 유기농 옵션 추가
    return fruitDetail.price * count + additionalPrice;
  };

  const addCartFn3 = () => {
    if (fruitDetail) {
      dispatch(
        addCart1({
          id: fruitDetail.id,
          img: `/images/fruit/${fruitDetail.img}`,
          title: fruitDetail.title,
          price: fruitDetail.price + (isPremium ? 3000 : 0) + (isOrganic ? 2000 : 0),
          count,
          category: "fruitItems",
        })
      );
      alert(`${fruitDetail.title}이(가) 장바구니에 추가되었습니다!`);
      navigate("/order/cart");
    }
  };

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
          <li>{fruitDetail.description}</li>
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
        <button onClick={addCartFn3} >장바구니</button>
        <button>결제</button>
      </div>
    </div>
  );
};

export default OrderFruitDetail;
