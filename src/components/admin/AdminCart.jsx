import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPaymentFn } from "../../slice/paymentSlice";

const AdminCart = () => {
  const dispatch = useDispatch();
  const paymentInformation = useSelector(
    (state) => state.payment.paymentInformation
  );
  const status = useSelector((state) => state.payment.status);

  useEffect(() => {
    dispatch(asyncPaymentFn());
  }, [dispatch]);

  return (
    <div className="admin-cart">
      <h2>주문 내역 조회</h2>
      {status === "Pending" && <p>로딩 중...</p>}
      {status === "Fail" && <p>결제 내역을 불러오는데 실패했습니다.</p>}
      {status === "Complete" && paymentInformation.length > 0 ? (
        <div className="order-table-con">
          <table className="order-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>결제 수단</th>
                <th>주문자</th>
                <th>총 금액</th>
                <th>주문 시간</th>
                <th>배송 메시지</th>
                <th>상품 내역</th>
              </tr>
            </thead>
            <tbody>
              {paymentInformation.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.memberEmail}</td>
                  <td>{order.paymentAmount.toLocaleString()}원</td>
                  <td>{order.time}</td>
                  <td>{order.addressMessage}</td>
                  <td>
                    <ul>
                      {order.paymentResult.map((item, idx) => (
                        <li key={idx}>
                          <img
                            src={item.img}
                            alt={item.title}
                            className="product-img"
                          />
                          {item.title} - {item.price.toLocaleString()}원 x{" "}
                          {item.count}개
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>결제 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default AdminCart;
