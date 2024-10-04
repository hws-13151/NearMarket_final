import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUserFn } from '../../slice/authSlice'

const Payment = () => {

    const paymentItems = useSelector((state) => state.cart.items)
    const loginUser =useSelector((state) => state.auth.loginUser)
    const isLogin = useSelector((state) => state.auth.isLogin)

    const navigate =useNavigate()
    const dispatch =useDispatch()

    let totalPrice =0;

    paymentItems.forEach((item) =>{
        totalPrice += item.price * item.count;
    })



    
    // useEffect(() => {
    //     dispatch(loginUserFn()) 
    // }, [dispatch])
    
    
        if(!isLogin){
            return <div>로그인 되지 않았습니다. 로그인 후 다시 이용해주세요.</div>
        }



  return (
    
    <div className="payment">
            <h1>주문/결제</h1>
        <div className="payment-con">
            <div className="address">
                <h3>배송지정보</h3>
                <table>
                    <thead>
                        
                            <tr>
                            <th>배송지명</th>
                            <th>주문자 이메일</th>
                            <th>받는분</th>
                            <th>연락처</th>
                            <th>주소</th>
                            <th>배송 메시지</th>
                        </tr>
                        
                    </thead>

                    <tbody>
                       
                        {loginUser && loginUser.map((el,idx)=>{
                            return(
                        <tr key={idx}>
                        <td>집</td>
                        <td>{el.userEmail}</td>
                        <td>{el.userName}</td>
                        <td>{el.phoneNumber}</td>
                        <td>{el.address}</td>
                        <td><select name="addressMessage" id="addressMessage">
                            <option value="1">그냥 문 앞에 놓아 주시면 돼요.</option>
                            <option value="2">직접 받을게요.부재시 문앞</option>
                            <option value="3">벨을 누르지 말아주세요.</option>
                            <option value="4">도착 후 전화주시면 직접 받으러 갈게요.</option>
                            </select>
                            
                        </td>
                        </tr>
                        )
                        })}
                    
                       
                    </tbody>
                </table>
            </div>
            <div className="payment-item">
                <h3>배송상품</h3>
                <div className="payment-item-con">   
                {paymentItems && paymentItems.map((el, idx) => {
                    return (
                        <div className="payment-list" key={idx}>
                  <div className="top">
                    <img src={el.img} alt={el.img} />
                  </div>
                  <div className="bottom">
                    <span>상품명: {el.title}</span>
                    <span>가격: {el.price.toLocaleString()}원</span>
                    <span>갯수: {el.count}</span>
                    <span>총금액: {(el.count * el.price).toLocaleString()}원</span>
                    
                  </div>
                </div>
              )
            })} 
                </div>
            </div>
            <div className="payment-select">
                <h3>결제수단 선택</h3>
                <table>
                    <thead>
                        <tr>
                            <th>결제 수단</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><select name="payment" id="payment">
                                <option value="credit-card">신용카드</option>
                                <option value="kakaopay">카카오페이</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {paymentItems.length > 0 ?
            <div className="payment-sub">
                <div className="sum-price">
                    총합계: {totalPrice.toLocaleString()} 원
                </div>
                <div className="payment-result">
                    <button onClick={()=>{
                        navigate("/order/payment")
                    }}>결제하기</button>
                </div>
            </div>:
            <div className="payment-null">
                <h1 onClick={()=>{
                    navigate('/order')
                }}>결제할 상품이 없습니다!</h1>
            </div>
           }
        </div>
        
    </div>
    
    
  )
}

export default Payment