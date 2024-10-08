import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPaymentFn } from "../../slice/paymentSlice";
import { asyncAuthMemberFn } from "../../slice/authSlice";

const AdminPayment = () => {

  const paymentInformation = useSelector((state) => state.payment.paymentInformation)
  // const memberList =useSelector((state)=> state.auth.memberList)

  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(asyncPaymentFn());
  }, []);

  // useEffect(()=>{
  //   dispatch(asyncAuthMemberFn())
  // },[])


  return (
    <>
      <div className="admin-payment">
        <div className="admin-payment-con">
          <h1>회원 결제내역</h1>
          <table>
            <thead>
              <tr>
                <th>회원아이디/이름</th>
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
              {paymentInformation && paymentInformation.map((el, idx) => (
                <tr key={idx}>
                  <td>{el.memberEmail}</td>
                  <td>{el.time}</td>
                  <td>
                    {/* el.paymentResult가 객체일 경우 */}
                    {Array.isArray(el.paymentResult) ? (
                      el.paymentResult.map((item, index) => (
                        <div key={index}>
                          {/* item 객체의 개별 속성 렌더링 */}
                          {item.title} - {item.count}개
                        </div>
                      ))
                    ) : (
                      "상품 정보가 없습니다."
                    )}
                  </td>
                  <td>{el.paymentAmount.toLocaleString()}원</td>
                  <td>{el.shopVal}</td>
                  <td>{el.orderMethod}</td>
                  <td>{el.orderAddress}</td>
                  <td>{el.addressMessage}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </>
  )

};

export default AdminPayment;
