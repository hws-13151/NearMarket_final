// OrderSnackDetail.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart1 } from "../../slice/cartSlice1";
import { useNavigate } from "react-router-dom";
import DetailModal from "./DetailModal";

const orderData = {
  title: "",
  price: 0,
  img: "",
  description: "",
};

const OrderSnackDetail = (param) => {
  const [snackItem, setSnackItem] = useState(orderData);
  const [snackCount, setSnackCount] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector((state) =>
    state.auth.isLogin ? state.auth.loginUser[0].userEmail : "guest"
  );

  useEffect(() => {
    const orderDetailFn = async () => {
      const orderId = param.param.id; // Accessing param.param.id directly
      try {
        const res = await axios.get(
          `http://localhost:3001/snackItems?id=${orderId}`
        );
        setSnackItem(res.data[0]);
      } catch (err) {
        alert(err);
      }
    };
    orderDetailFn();
  }, [param.param.id]); // 의존성 배열에 param.param.id 추가

  const incrementCount = () => {
    setSnackCount(snackCount + 1);
  };

  const decrementCount = () => {
    if (snackCount > 1) {
      setSnackCount(snackCount - 1);
    }
  };

  const addCartFn2 = () => {
    const setItemCart = {
      title: snackItem.title,
      price: snackItem.price,
      img: `/images/ordersnack/${snackItem.img}`,
      count: snackCount,
      category: "snack",
      userEmail,
    };
    dispatch(addCart1(setItemCart)); // 장바구니에 추가
    setSnackCount(1); // 수량 초기화
    setIsModal(true); // 모달 열기
  };

  return (
    <>
      {isModal && <DetailModal setIsModal={setIsModal} />}
      <div className="order-snack-detail">
        <div className="order-snack-detail-con">
          <div className="left">
            <div className="left-img">
              <img
                src={`/images/ordersnack/${snackItem.img}`}
                alt={snackItem.title}
              />
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <ul>
                <li>NM.K</li>
                <li>
                  <h1>{snackItem.title}</h1>
                </li>
                <li>
                  <h1>{snackItem.price}원</h1>
                </li>
                <li>
                  <h3>상품설명:</h3>
                  <p>{snackItem.description}</p>
                </li>
              </ul>
            </div>
            <div className="right-bottom">
              <div className="bottom">
                <div className="bottom-price">
                  <ul>
                    <li>{snackItem.title}</li>
                    <li>
                      <button onClick={incrementCount}> + </button>
                      <span>{snackCount}</span>
                      <button onClick={decrementCount}> - </button>
                      <p>{snackItem.price * snackCount}원</p>
                    </li>
                  </ul>
                </div>
                <div className="bottom-payment">
                  <ul>
                    <li>
                      <p>합계</p>
                      <h1>{snackItem.price * snackCount}원</h1>
                    </li>
                    <hr />
                    <li>
                      <button onClick={() => navigate(-1)}>이전페이지</button>
                      <button onClick={addCartFn2}>장바구니</button>
                      <button>결제</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSnackDetail;
