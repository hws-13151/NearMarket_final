import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  },[])

  const navigate = useNavigate()
  const setDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute('data-id')

    // console.log(eId)
    // console.log(e.currentTarget)

    navigate(`/order/meat/meatdetail/${eId}`)
  }



  return (
    <>
      <div className="order-meat">
        <div className="order-meat-con">
          <div className="order-meat-title">
            <h1>육류코너</h1>
            <div className="title-right">
              <span style={{color:'#ff0000'}}>{meatList.length}</span>
              <span> 개의 상품이 있습니다.</span>
            </div>
          </div>
          <div className="order-meat-item">
            <ul>
              {meatList && meatList.map((el,idx)=>{
                return(
                  <li key={idx} data-id={el.id} onClick={setDetailFn}>
                    <div className="top">
                      <img src={`/images/meat/${el.img}`} alt={el.img} />
                    </div>
                    <div className="bottom">
                      <span style={{fontSize:'20px'}}>{el.title}</span>
                      <span style={{fontSize:'14px'}}>{el.description}</span>
                      <span style={{fontWeight:'bold'}}>{el.price.toLocaleString()}원</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderMeat