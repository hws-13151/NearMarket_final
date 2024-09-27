import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const meatData ={
  id:0,
  title:'',
  price:0,
  img:'',
  explanation:''
}

const OrderMeatDetail = (param) => {
  const navigate = useNavigate()
  const [meatItem,setMeatItem] = useState(meatData)
  const [count,setCount] = useState(1)

  useEffect(()=>{
    const ordermeatDetailFn = async () =>{
      const meatId = param.param.id
      try {
        const res = await axios.get(`http://localhost:3001/meatItems?id=${meatId}`)
        setMeatItem(res.data[0])
      } catch (error) {
        alert(error)
      }
    }
    ordermeatDetailFn()
  },[])

  const IncrementFn = () =>{
    setCount(count + 1)
  }

  const DecrementFn = () =>{
    if(count === 1){
      setCount(1)
    }else{
      setCount(count - 1)
    }
  }



  return (
    <>
      <div className="order-meat-detail">
        <div className="order-meat-detail-con">
          <div className="left">
            <div className="left-img">
              <img src={`/images/meat/${meatItem.img}`} alt={meatItem.img} />
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <ul>
                <li>
                  NM.K
                </li>
                <li>
                  <h1>{meatItem.title}</h1>
                </li>
                <li>
                  {meatItem.explanation}
                </li>
                <li>
                  <h1>{meatItem.price}원</h1>
                </li>
                <li>
                  <p>상품 설명: <br /></p>
                </li>
              </ul>
            </div>
            <div className="right-bottom">
              <div className="bottom">
                <div className="bottom-price">
                  <ul>
                    <li>{meatItem.title}</li>
                    <li>
                      <button onClick={IncrementFn}>+</button>
                      <span>{count}</span>
                      <button onClick={DecrementFn}>-</button>
                      <p>{meatItem.price * count}원</p>
                    </li>
                  </ul>
                </div>
                <div className="bottom-payment">
                  <ul>
                    <li>
                      <h1>{meatItem.price * count}원</h1>
                    </li>
                    <hr />
                    <li>
                      <button onClick={()=>{navigate(-1)}}>이전페이지</button>
                      <button>장바구니</button>
                      <button>결제</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderMeatDetail