import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const detailData={
    id:0,
    title:'',
    price:'',
    memo:'',
    img:'',
    rocket:''

}

const OrderVegetableDetail = (param) => {


    const [vegetableDetail,setVegetableDetail]= useState(detailData)
    const [vegetableCount,setVegetableCount]=useState(1)

    const navigate=useNavigate()




    useEffect(()=>{

        const axiosFn = async ()=>{
            const vegetableId=param.param.id

            try{
                const res =await axios.get(`http://localhost:3001/vegetableItems?id=${vegetableId}`)
                setVegetableDetail(res.data[0])
            }catch(error){
                alert(error)
            }
        };
        axiosFn()
    },[])


    const vegetableIncrementFn=()=>{
        setVegetableCount(vegetableCount +1)
    }

    const vegetableDecrementFn = ()=>{
        vegetableCount <=1 ? setVegetableCount(1) : setVegetableCount(vegetableCount -1)
    }











  return (
   <>
   <div className="order-vegetable-detail">
    <div className="order-vegetable-detail-con">
        <div className="left">
            <img src={`/images/vegetable/${vegetableDetail.img}`} alt={vegetableDetail.img} />
            
        </div>
        <div className="right">
            <div className="vegetable-detail-item">
                <ul>
                    <li>
                        <span>NM.K </span>
                    </li>
                    <li>
                        <h1>{vegetableDetail.title}</h1>
                    </li>
                    <li>
                        로켓배송
                    </li>
                    <li>{vegetableDetail.memo}</li>
                    <li>
                        상품가격 : {vegetableDetail.price*vegetableCount}
                    </li>
                    <li>
                        <button onClick={vegetableIncrementFn}>+</button>
                        <span>{vegetableCount}</span>
                        <button onClick={vegetableDecrementFn}>-</button>
                    </li>
                </ul>
                <div className="order-go">
                    <button onClick={()=>{
                        navigate(-1)
                    }}>이전페이지</button>
                    <button>장바구니</button>
                    <button>결제</button>
                </div>
            </div>
        </div>
    </div>
    <div className="detail-page">
        상세설명

    </div>
   </div>
   </>
  )
}

export default OrderVegetableDetail