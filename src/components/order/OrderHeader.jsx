import React from "react";
import { Link } from "react-router-dom";

const OrderHeader = () => {
  return (
    <>
      <div className="order-header">
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
                </Link>
              </li>
              <li>
                <Link to={"/"}>메인메뉴</Link>
              </li>
              <li>
                <Link to={"/order/vegetable"}>
                  <img src="/images/orderheader/vegetable.png"></img>
                  채소
                </Link>
              </li>
              <li>
                <Link to={"/order/meet"}>
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
              <li>
                <Link to={"/order/snack"}>
                  <img src="/images/orderheader/snack.png"></img>
                  과자
                </Link>
              </li>

              <li>
                <Link to={"/auth"}>로그인</Link>
              </li>
              <li>
                <Link to={"/auth/join"}>회원가입</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHeader;
