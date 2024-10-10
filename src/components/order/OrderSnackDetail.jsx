// OrderSnackDetail.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart1Async } from "../../slice/cartSlice1";
import { useNavigate } from "react-router-dom";
import DetailModal from "./DetailModal";

const orderData = {
  id: "",
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

  const addCartFn2 = async () => {
    const setItemCart = {
      id: snackItem.id,
      title: snackItem.title,
      price: snackItem.price,
      img: `/images/ordersnack/${snackItem.img}`,
      count: snackCount,
      category: "snack",
      userEmail,
    };

    // 기존에 장바구니에 있는지 확인하기 위한 GET 요청
    const existingCartItem = await axios.get(
      `http://localhost:3001/cart?userEmail=${userEmail}&id=${snackItem.id}&category=snack`
    );

    if (existingCartItem.data.length > 0) {
      // 아이템이 이미 존재할 경우 수량 업데이트
      const existingItem = existingCartItem.data[0];
      const updatedItem = {
        ...existingItem,
        count: existingItem.count + snackCount,
      };

      // PUT 요청으로 수량 업데이트
      await axios.put(
        `http://localhost:3001/cart/${existingItem.id}`,
        updatedItem
      );
    } else {
      // 아이템이 없으면 새로 추가
      await dispatch(addCart1Async(setItemCart));
    }

    setSnackCount(1); // 수량 초기화
    setIsModal(true); // 모달 열기
    console.log(setItemCart);
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
