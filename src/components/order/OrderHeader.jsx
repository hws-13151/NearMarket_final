import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "../auth/LogoutModal";

const OrderHeader = () => {
  const [isGnbVisible, setGnbVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;
  const [logout, setLogout] = useState(false);

  const loginUser = useSelector((state) => state.auth.loginUser);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const userRole = isLogin && loginUser.length > 0 ? loginUser[0].role : null;

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleGnb = () => {
    setGnbVisible((prev) => !prev); // gnb의 표시 상태 토글
  };

  const handleClickOutside = (e) => {
    // gnb 외부 클릭 시 gnb 숨기기
    const gnbElement = document.querySelector(".gnb");
    const buttonElement = document.querySelector(".button");
    // gnb 외부 클릭 시 gnb 숨기기
    if (window.innerWidth <= 1030) {
      if (
        gnbElement &&
        !gnbElement.contains(e.target) &&
        !buttonElement.contains(e.target)
      ) {
        setGnbVisible(false);
      }
    }
  };

  // 화면 크기 변화 감지
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1030) {
        setGnbVisible(true); // 너비가 1400px 이상일 때 gnb 보이기
      }
    };

    handleResize(); // 초기 렌더링 시 호출
    window.addEventListener("resize", handleResize); // 이벤트 리스너 추가
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize); // 이벤트 리스너 정리
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logoutModalFn = () => {
    setLogout(true);
  };

  return (
    <>
      {logout && <LogoutModal setLogout={setLogout} />}
      <div className="order-header">
        <div className="order-header-nav">
          <h1 className="logo" onClick={() => navigate("/main")}>
            <span className="nm">NM</span>
            <span className="jum">.</span>
            <span className="k">K</span>
          </h1>
          <div className={`gnb ${isGnbVisible ? 'visible' : ''}`}>
            {" "}
            {/* gnb 표시 여부 */}
            <ul>
              <li>
                <Link to={"/order/cart"}>
                  <img src="/images/orderheader/Ordercart.png" alt="cart" />
                  {cartItemCount > 0 && ( // 장바구니에 아이템이 있으면 알림 배지 표시
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/index" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/index"}>추천상품</Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/vegetable" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/vegetable"}>
                  <img src="/images/orderheader/vegetable.png"></img>
                  채소
                </Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/meat" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/meat"}>
                  <img src="/images/orderheader/meat.png"></img>
                  고기
                </Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/fruit" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/fruit"}>
                  <img src="/images/orderheader/fruit.png"></img>
                  과일
                </Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/snack" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/snack"}>
                  <img src="/images/orderheader/snack.png"></img>
                  과자
                </Link>
              </li>

              <li>
                {!isLogin ? (
                  <Link to={"/auth/login"}>로그인</Link>
                ) : (
                  <Link
                    onClick={() => {
                      // e.preventDefault();
                      // dispatch(logOutFn());
                      logoutModalFn();
                    }}
                  >
                    로그아웃
                  </Link>
                )}
              </li>
              <li>
                {!isLogin ? (
                  <Link to={"/auth/join"}>회원가입</Link>
                ) : (
                  <Link to={"/order/detail"}>{loginUser[0].userName}님</Link>
                )}
              </li>
              {isLogin && userRole === "ROLE_ADMIN" && (
                <li>
                  <Link to={`/admin`}>ADMIN</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="button" onClick={toggleGnb}>
            〓
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHeader;
