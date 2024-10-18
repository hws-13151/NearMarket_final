import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteCartAll } from "../../slice/cartSlice1";
import PaymentGoModal from "./PaymentGoModal";
import PaymentApiModal from "./PaymentApiModal";

const payData = {
  paymentMethod: "",
  shopVal: "",
  orderMethod: "",
  addressMessage: "",
};

const Payment = () => {
  const paymentItems = useSelector((state) => state.cart.items);
  const loginUser = useSelector((state) => state.auth.loginUser);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [onPayment, setOnPayment] = useState(payData);
   //주문처 추가
   const [shop, setShop] = useState([])
   const [paymentGo, setPaymentGo] = useState(false)
   const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
   const [selectedShop, setSelectedShop] = useState(null); // 선택된 주문처 정보

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const selectedProduct = location.state?.selectedProduct

  const itemsTopay = selectedProduct ? [selectedProduct] : paymentItems

  let totalPrice = 0;

  itemsTopay.forEach((item) => {
    totalPrice += item.price * item.count;
  });

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
    else {
      fetchShop();
    }
  }, []);
// 선택한 주문처 모달오픈
useEffect(() => {
  if (onPayment.shopVal) {
    const selectedShopInfo = shop.find((shopEl) => shopEl.title === onPayment.shopVal);
    if (selectedShopInfo) {
      setSelectedShop(selectedShopInfo); 
      setIsModalOpen(true);
    }
  }
}, [onPayment.shopVal, shop]);

  // loginUser가 비어 있거나 존재하지 않을 때 처리
  if (!loginUser || loginUser.length === 0) {
    return <div>유저 정보가 없습니다. 로그인 후 다시 시도하세요.</div>;
  }



  //주문처추가
  const fetchShop = async () => {
    try {
      const res1 = await axios.get('http://localhost:3001/api');
      setShop(res1.data)
    }
    catch (err) {
      alert(err)
    }
  }

  // const paymentAxiosFn = async (e) => {
  //   try {
  //     const res = await axios.post(
  //       `http://localhost:3001/payment`,
  //       JSON.stringify(accoutData)
  //     );
  //     const resData = res.data;
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  const paymentAxiosFn = async () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")} ${String(
      today.getHours()
    ).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}:${String(
      today.getSeconds()
    ).padStart(2, "0")}`;

    const accoutData = {
      paymentMethod: onPayment.paymentMethod,
      shopVal: onPayment.shopVal,
      orderMethod: onPayment.orderMethod,
      addressMessage: onPayment.addressMessage,
      memberEmail: loginUser[0].userEmail,
      orderAddress: loginUser[0].address,
      paymentResult: itemsTopay,
      paymentAmount: totalPrice,
      time: formattedDate,
    };

    try {
      await axios.post(`http://localhost:3001/payment`, accoutData);
      // dispatch(deleteCartAll());
      navigate("/order/detail");
    } catch (err) {
      alert("결제 처리 중 오류가 발생했습니다.");
    }
  };

  const paymentMethodFn = (e) => {
    const selectedPaymentMethod = e.target.options[e.target.selectedIndex].text;
    setOnPayment({ ...onPayment, paymentMethod: selectedPaymentMethod });
  };

  const shopValFn = (e) => {
    const selectedShopVal = e.target.options[e.target.selectedIndex].text;
    setOnPayment({ ...onPayment, shopVal: selectedShopVal });
  };

  const orderMethodFn = (e) => {
    const selectedOrderMethod = e.target.options[e.target.selectedIndex].text;
    setOnPayment({ ...onPayment, orderMethod: selectedOrderMethod });
  };

  const addressMessageFn = (e) => {
    const selectedAddressMessage =
      e.target.options[e.target.selectedIndex].text;
    setOnPayment({ ...onPayment, addressMessage: selectedAddressMessage });
  };

  const paymentSubmitFn = (e) => {

    e.preventDefault();
    setPaymentGo(true)

  };



  const isPaymentReady = onPayment.paymentMethod && onPayment.shopVal && onPayment.orderMethod




  return (
    <>
      {paymentGo && <PaymentGoModal setPaymentGo={setPaymentGo} paymentAxiosFn={paymentAxiosFn} />}
      <div className="payment">
        <h1>주문/결제</h1>
        <div className="payment-con">
          <div className="address">
            <h3>배송지정보</h3>
            <table>
              <thead>
                <tr>
                  <th>배송지명</th>
                  <th>주문자 이메일</th>
                  <th>받는분</th>
                  <th>연락처</th>
                  <th>주소</th>
                </tr>
              </thead>

              <tbody>
                {loginUser &&
                  loginUser.map((el, idx) => {
                    return (
                      <tr key={idx}>
                        <td>집</td>
                        <td>{el.userEmail}</td>
                        <td>{el.userName}</td>
                        <td>{el.phoneNumber}</td>
                        <td>{el.address}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="payment-item">
            <h3>배송상품</h3>
            <div className="payment-item-con">
              {itemsTopay && itemsTopay.map((el, idx) => {
                return (
                  <div className="payment-list" key={idx}>
                    <div className="top">
                      <img src={el.img} alt={el.img} />
                    </div>
                    <div className="bottom">
                      <span>상품명: {el.title}</span>
                      <span>가격: {el.price.toLocaleString()}원</span>
                      <span>갯수: {el.count}</span>
                      <span>
                        총금액: {(el.count * el.price).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="payment-select">
            <h3>결제</h3>
            <table>
              <thead>
                <tr>
                  <th>결제 수단</th>
                  <th>주문처</th>
                  <th>주문방식</th>
                  <th>배송 메시지</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      name="paymentMethod"
                      id="paymentMethod"
                      onChange={paymentMethodFn}
                    >
                      <option value="">결제수단</option>
                      <option value="credit-card">신용카드</option>
                      <option value="kakaopay">카카오페이</option>
                    </select>
                  </td>
                  {/* 주문처 db 연동 */}
                  <td>
                    <select name="shopVal" id="shopVal" onChange={shopValFn}>
                      <option value="">주문처</option>
                      {shop.map((shopEl) => (
                        <option key={shopEl.id} value={shopEl.title}>
                          {shopEl.title}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      name="orderMethod"
                      id="orderMethod"
                      onChange={orderMethodFn}
                    >
                      <option value="">주문방식</option>
                      <option value="pick up">직접방문</option>
                      <option value="delivery">배달</option>
                      <option value="reservation"> 예약주문</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="addressMessage"
                      id="addressMessage"
                      onChange={addressMessageFn}
                    >
                      <option value="">선택하기</option>
                      <option value="1">그냥 문 앞에 놓아 주시면 돼요.</option>
                      <option value="2">직접 받을게요.부재시 문앞</option>
                      <option value="3">벨을 누르지 말아주세요.</option>
                      <option value="4">
                        도착 후 전화주시면 직접 받으러 갈게요.
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
           {/* 모달 창 추가*/}
         {isModalOpen && selectedShop && (
          <PaymentApiModal selectedShop={selectedShop} onClose={closeModal} />
            )}   
          <div className="payment-sub">
            <div className="sum-price">
              총합계: {totalPrice.toLocaleString()} 원
            </div>
            <div className="payment-result">
              <button onClick={paymentSubmitFn} disabled={!isPaymentReady}>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;