import axios from 'axios'
import React, { useEffect, useState } from 'react'

const OrderMeat = () => {

  const [meatList,setMeatList]=useState([])

  //가상 db에서 데이터 불러오기(get)
  useEffect(()=>{
    const axiosFn = async ()=>{
      try {
        const res = await axios.get('http://localhost:3001/meatItems')
        setMeatList(res.data)
      } catch (error) {
        alert(error)
      }
    };
    axiosFn();
  })

  return (
    <>
      <div className="order-meat">
        <div className="order-meat-title">
          <h2>육류코너</h2>
          <span>개의 상품이 있습니다.</span>
        </div>
        <div className="order-meat-con">
          <ul>
            {meatList && meatList.map((el,idx)=>{
              return(
                <li key={idx}>
                  <div className="top">
                    <img src={`/images/meat/${el.img}`} alt={el.img} />
                  </div>
                  <div className="bottom">
                    <span>{el.title}</span>
                    <span>{el.explanation}</span>
                    <span>{el.price}원</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default OrderMeat