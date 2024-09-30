import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart1 } from "../../slice/cartSlice1";
import { useNavigate } from "react-router-dom";

const orderData = {
  id: 0,
  title: "",
  price: "",
  img: "",
  description: "",
};

const OrderSnackDetail = (param) => {
  // param을 그대로 받음
  const [snackItem, setSnackItem] = useState(orderData);
  const [snackcount, setSnackCount] = useState(1);

  useEffect(() => {
    const orderDetailFn = async () => {
      const orderId = param.param.id; // param.param.id로 접근
      console.log(orderId);

      try {
        const res = await axios.get(
          `http://localhost:3001/snackItems?id=${orderId}` // id로 데이터 요청
        );
        console.log(res.data, " data");
        setSnackItem(res.data[0]);
      } catch (err) {
        alert(err);
      }
    };

    orderDetailFn(); // 함수 호출
  }, []);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addCartFn2 = () => {
    const setItemCart = {
      id: snackItem.id,
      title: snackItem.title,
      price: snackItem.price,
      description: snackItem.description,
      img: `/images/ordersnack/${snackItem.img}`,
      count: snackcount,
    };
    dispatch(addCart1(setItemCart));
    alert("장바구니로 이동합니다.");
    navigate("/order/cart");
  };

  const IncrementFn = () => {
    setSnackCount(snackcount + 1);
  };

  const DecrementFn = () => {
    if (snackcount === 1) {
      setSnackCount(1);
    } else {
      setSnackCount(snackcount - 1);
    }
  };

  return (
    <>
      {console.log(snackItem)}
      <div className="order-snack-detail">
        <div className="order-snack-detail-con">
          <div className="left">
            <div className="left-img">
              <img
                src={`/images/ordersnack/${snackItem.img}`}
                alt={snackItem.title}
              />
            </div>
            <div className="right">
              <div className="right-top">
                <ul>
                  <li>NM.K</li>
                </ul>
                <li>
                  <h1>{snackItem.title}</h1>
                </li>
                <li>
                  <h1>{snackItem.price}원</h1>
                </li>
                <li>
                  <p>상품 설명: {snackItem.description}</p>
                </li>
              </div>
              <div className="right-bottom">
                <div className="bottom">
                  <div className="bottom-price">
                    <ul>
                      <li>{snackItem.title}</li>
                      <li>
                        <button onClick={IncrementFn}> + </button>
                        <span>{snackcount}</span>
                        <button onClick={DecrementFn}> - </button>
                        <p>{snackItem.price * snackcount}원</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bottom-payment">
                    <ul>
                      <li>
                        <h1>{snackItem.price * snackcount}원</h1>
                      </li>
                      <hr />
                      <li>
                        <button
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          이전페이지
                        </button>
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
      </div>
    </>
  );
};

export default OrderSnackDetail;
