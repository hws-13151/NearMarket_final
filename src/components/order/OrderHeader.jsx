import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutFn } from "../../slice/authSlice";

const OrderHeader = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  const cartItemCount = cartItems.length; // 장바구니 아이템 수cartItems
  const [selectedItem, setSelectedItem] = useState(null)

  const loginUser = useSelector((state) => state.auth.loginUser);
  const isLogin = useSelector((state) => state.auth.isLogin);


  const userRole = isLogin && loginUser.length > 0 ? loginUser[0].role : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();






  return (
    <>
      <div className="order-header" >
        <div className="order-header-nav">
          <h1 className="logo">
            <Link to={"/"}>
              <span className="nm">NM</span>
              <span className="jum">.</span>
              <span className="k">K</span>
            </Link>
          </h1>
          <div className="gnb">
            <ul>
              <li>
                <Link to={"/order/cart"}>
                  <img src="/images/orderheader/Ordercart.png" alt="cart" />
                  {cartItemCount > 0 && ( // 장바구니에 아이템이 있으면 알림 배지 표시
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </Link>
              </li>
              <li>
                <Link to={"/order/index"}>추천상품</Link>
              </li>
              <li>
                <Link to={"/order/vegetable"}>
                  <img src="/images/orderheader/vegetable.png"></img>
                  채소
                </Link>
              </li>
              <li>
                <Link to={"/order/meat"}>
                  <img src="/images/orderheader/meat.png"></img>
                  고기
                </Link>
              </li>
              <li>
                <Link to={"/order/fruit"}>
                  <img src="/images/orderheader/fruit.png"></img>
                  과일
                </Link>
              </li>
              <li >
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
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(logOutFn());
                      alert("로그아웃 합니다");
                      navigate(0);
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
        </div>
      </div>
    </>
  );
};

export default OrderHeader;
