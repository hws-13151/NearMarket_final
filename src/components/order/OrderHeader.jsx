import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutFn } from "../../slice/authSlice";

const OrderHeader = () => {

  const loginUser = useSelector(state=> state.auth.loginUser)
  const isLogin = useSelector(state=> state.auth.isLogin)

  const dispatch=useDispatch()
  const navigate=useNavigate()


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
                <Link to={"/order"}>메인메뉴</Link>
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
              <li>
                <Link to={"/order/snack"}>
                  <img src="/images/orderheader/snack.png"></img>
                  과자
                </Link>
              </li>

              <li>
                {!isLogin ? 
                <Link to={"/auth/login"}>로그인</Link> :
                <Link onClick={(e)=>{
                  e.preventDefault()
                  dispatch(logOutFn())
                  alert("로그아웃 합니다")
                  navigate(0)
                }}>로그아웃</Link>
                }
              </li>
              <li>
                {!isLogin ?
                <Link to={"/auth/join"}>회원가입</Link> :
                <></>
                }
              </li>
              {!isLogin ? <></> :
              <li>
                <Link to={'/auth/detail'}>{loginUser[0].userName}님</Link>
              </li>
              }
              {isLogin && <li><Link to={`/admin`}>ADMIN</Link></li>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHeader;
