import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { asyncAdminShopFn } from '../../slice/adminSlice';


const ShopModal = ({shop, onClose}) => {
    const  [title, setTitle] = useState(shop.title);
    const  [address, setAddress] = useState(shop.address);
    const  [postNum, setPostNum] = useState(shop.postNum);
    const  [phoneNum, setPhoneNum] = useState(shop.phoneNum);
    const  [lat, setLat] = useState(shop.lat);
    const  [lng, setLng] = useState(shop.lng);
    const dispatch = useDispatch()

    const shopUpdate = async () =>{
        try{
            await axios.put(`http://localhost:3001/api/${shop.id}`,{
                title,
                address,
                postNum,
                phoneNum,
                lat,
                lng
            })
            alert('주문처 정보가 수정되었습니다.')
            onClose();
            dispatch(asyncAdminShopFn())
        }
        catch(err){
            alert(err)
        }
    
    }

    const shopDelete = async()=>{
        const isConfirmed = window.confirm("정말로 주문처 정보를 삭제하시겠습니까?")
        if(isConfirmed){
            try{
                await axios.delete(`http://localhost:3001/api/${shop.id}`)
                alert("주문처가 삭제되었습니다.")
                onClose()
                dispatch(asyncAdminShopFn())
            }
            catch(err){
                alert(err)
            }
        }
    }

    

  return (
    <>
        <div className="modal">
      <div className="modal-con">
        <h2>주문처 정보 수정</h2>
        <label>주문처 이름</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <label>주소</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
        <label>우편번호</label>
        <input 
          type="number" 
          value={postNum} 
          onChange={(e) => setPostNum(e.target.value)} 
        />
        <label>전화번호</label> 
        <input 
          type="text" 
          value={phoneNum} 
          onChange={(e) => setPhoneNum(e.target.value)} 
        />
        <label>위도</label>
        <input 
          type="num" 
          value={lat} 
          onChange={(e) => setLat(Number(e.target.value))} 
        />
        <label>경도</label> 
        <input 
          type="num" 
          value={lng} 
          onChange={(e) => setLng(Number(e.target.value))} 
        />    
        
        
        <div className="btn1-con">
        <button onClick={shopUpdate} className="update-btn">수정</button>
        <button onClick={shopDelete} className="delete-btn">삭제</button>
        </div>
        <button onClick={onClose} className='close'>X</button>
      </div>
    </div>
    </>
  )
}

export default ShopModal