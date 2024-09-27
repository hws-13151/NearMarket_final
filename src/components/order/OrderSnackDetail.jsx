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
  const [orderItem, setOrderItem] = useState(orderData);

  useEffect(() => {
    const orderDetailFn = async () => {
      const orderId = param.param.id; // param.param.id로 접근
      console.log(orderId);

      try {
        const res = await axios.get(
          `http://localhost:3001/snackItems?id=${orderId}` // id로 데이터 요청
        );
        console.log(res.data, " data");
        setOrderItem(res.data[0]);
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
      id: orderItem.id,
      title: orderItem.title,
      price: orderItem.price,
      img: `/images/ordersnack/${orderItem.img}`,
    };
    dispatch(addCart1(setItemCart));
    alert("장바구니로 이동합니다.");
    navigate("/order/cart");
  };

  return (
    <>
      {console.log(orderItem)}
      <img src={`/images/ordersnack/${orderItem.img}`} alt={orderItem.title} />
      <h2>{orderItem.title}</h2>
      <p>{orderItem.description}</p>
      <span>{orderItem.price}원</span>
      <button onClick={addCartFn2}>장바구니</button>
    </>
  );
};

export default OrderSnackDetail;
