import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutFn } from "../../slice/authSlice";

const MainHeader = () => {

  const loginUser = useSelector(state => state.auth.loginUser)
  const isLogin = useSelector(state => state.auth.isLogin)

  const navigate = useNavigate()
  const dispatch =useDispatch()

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
              {!isLogin ?
                  <Link to={'/auth/login'}>로그인</Link> :
                  <Link onClick={(e) => {
                    e.preventDefault()
                    dispatch(logOutFn())
                    alert('로그아웃!!')
                    navigate(0)
                  }}>로그아웃</Link>
                }
              </li>
              <li>
              {!isLogin ?
                <Link to={"/auth/join"}>회원가입</Link> :
                <Link to={'/auth/detail'}>{loginUser[0].userName}님</Link>
                }
              </li>
              {isLogin && <li><Link to={`/admin`}>ADMIN</Link></li>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
