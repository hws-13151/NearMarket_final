import React from 'react'
import { useNavigate } from 'react-router-dom'

const DetailModal = ({setIsModal}) => {
  const clostFn = () =>{
    setIsModal(false)
}
const navigate = useNavigate()
  return (
    <>
      <div className="modal">
        <div className="modal-con">
          <div className="modal-top">
            <span>알림</span>
            <span className="close" onClick={clostFn}>X</span>
          </div>
          <div className="modal-body">
            <ul>
              <li>장바구니에 추가했습니다.</li>
              <li onClick={()=>{
                navigate(-1)
              }}>계속 쇼핑하기</li>  
              <li onClick={()=>{
                navigate('/order/cart')
              }}>장바구니로 이동하기</li>  
            </ul>  
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailModal