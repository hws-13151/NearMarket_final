import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="header">
        <div className="nav">
          <h1 className="logo" onClick={navigate('/')}>
            <span className="nm">NM</span>
            <span className="jum">.</span>
            <span className="k">K</span>
          </h1>
          <div className="gnb">
            <ul>
              <li>
                <Link  k to={"/order"}>메뉴</Link>
              </li>
              <li>
                <Link  k to={"/api"}>매장찾기</Link>
              </li>
              <li>
                <Link  k to={"/auth/login"}>로그인</Link>
              </li>
              <li>
                <Link  k to={"/auth/join"}>회원가입</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
