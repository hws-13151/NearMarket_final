import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncPaymentFn } from "../../slice/paymentSlice";

const PaymentDetail = () => {
  const loginUser = useSelector((state) => state.auth.loginUser);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const paymentInformation = useSelector((state) => state.payment.paymentInformation);
  //   console.log(paymentInformation, "s");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPaymentFn());
  }, []);

  if (!isLogin) {
    return <div>로그인 되지 않았습니다. 로그인 후 다시 시도하세요.</div>;
  }

  return (
    <div className="paymentDetail">
      <div className="paymentDetail-con">
        <div className="myinfo">
          <div className="myinfo-con">
            <h2>내 정보</h2>
            <ul>
              {loginUser.map((el, idx) => (
                <li key={idx}>
                  <div>이메일: {el.userEmail}</div>
                  <div>이름: {el.userName}</div>
                  <div>나이: {el.age}</div>
                  <div>주소: {el.address}</div>
                  <div>핸드폰번호: {el.phoneNumber}</div>
                  <div>권한: {el.role}</div>
                </li>
              ))}
            </ul>
            <button>내 정보 수정</button>
          </div>
        </div>
        <div className="paymentlist"></div>
        <div className="paymentlist-con">
          <h2>주문/배송 조회</h2>
          <table>
            <thead>
              <tr>
                <th>주문일자</th>
                <th>상품상세내역</th>
                <th>주문금액</th>
                <th>주문처</th>
                <th>주문방식</th>
                <th>주소</th>
                <th>배송메시지</th>
              </tr>
            </thead>
            <tbody>
              {paymentInformation && paymentInformation.length > 0 ? (
                paymentInformation
                  .filter((el) => el.memberEmail === loginUser[0].userEmail) // 이메일이 같은 결제 정보만 필터링
                  .map((el, idx) => (
                    <tr key={idx}>
                      <td>{el.time}</td>
                      <td>
                        {el.paymentResult.map((el2, idx2) => (
                          <div key={idx2}>
                            <div>{el2.title}</div>
                            <div>
                              <img src={el2.img} alt={el2.img} />
                            </div>
                            <div>가격: {el2.price.toLocaleString()}원</div>
                            <div>수량: {el2.count}개</div>
                          </div>
                        ))}
                      </td>
                      <td>{el.paymentAmount.toLocaleString()}원</td>
                      <td>{el.shopVal}</td>
                      <td>{el.orderMethod}</td>
                      <td>{el.orderAddress}</td>
                      <td>{el.addressMessage}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="no">주문 내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;

