import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="header">
        <div className="nav">
          <div className="logo" onClick={navigate('/')}>
            <img src="/" alt="logo"/>
          </div>
          <div className="gnb">
            <ul>
              <li>
                <Link  k to={"/order"}>메뉴</Link>
              </li>
              <li>
                <Link  k to={"/api"}>매장찾기</Link>
              </li>
              <li>
                <Link  k to={"/login"}>로그인</Link>
              </li>
              <li>
                <Link  k to={"/join"}>회원가입</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
