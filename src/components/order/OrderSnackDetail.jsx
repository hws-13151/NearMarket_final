import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart1 } from "../../slice/cartSlice1";
import { useNavigate } from "react-router-dom";
import DetailModal from "./DetailModal";

const orderData = {
  id: 0,
  title: "",
  price: 0,
  img: "",
  description: "",
};

const OrderSnackDetail = (param) => {
  const [snackItem, setSnackItem] = useState(orderData);
  const [snackcount, setSnackCount] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  }, []);

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

  const onModalFn = () => {
    setIsModal(true);
  };

  const addCartFn2 = () => {
    const setItemCart = {
      id: snackItem.id,
      title: snackItem.title,
      price: snackItem.price,
      img: `/images/ordersnack/${snackItem.img}`,
      count: snackcount,
      category: "snackItems",
    };
    dispatch(addCart1(setItemCart));
    onModalFn();
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
                      <p>합계</p>
                      <h1>{snackItem.price * snackcount}원</h1>
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
