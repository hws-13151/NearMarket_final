import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const OrderVegetable = () => {

  const [vegetable,setVgetable]=useState([])

  const navigate=useNavigate()


  useEffect(()=>{
    const axiosFn =async ()=>{

      try{
        const res= await axios.get(`http://localhost:3001/vegetableItems`)
        setVgetable(res.data)
      }catch(error){
        alert(error)
      }
    };
    axiosFn()
  },[])



    // const orderVegetableDetailFn=(e)=>{


    // const eId=e.currentTarget.getAttribute('data-id')

    

    // navigate(`/order/vegetable/detail/${eId}`) };


  

  

  return (
    <>
    <div className="order-vegetable">
      <div className="order-vegetable-con">
        <div className="title">신선한 채소</div>
        <span>Total{vegetable.length}</span>
        
        <ul>
          {vegetable && vegetable.map((el,id)=>{
            return(
              <li key={id}> 
              {/* data-id={el.id} onClick={orderVegetableDetailFn} */}

                <div className="top">
                  <img src={`/images/vegetable/${el.img}`} alt={el.img} />
                </div>
                <div className="bottom">
                  <span>{el.title}</span>
                  <span className="delivery-order">
                    <img src="/images/vegetable/deliveryicon" alt='배송주문' />
                  </span>
                  <span>{el.memo}</span>
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

export default OrderVegetable
