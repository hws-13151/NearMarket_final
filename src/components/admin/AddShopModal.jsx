import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAdminShopFn } from '../../slice/adminSlice';

const AddShopModal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [postNum, setPostNum] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const dispatch = useDispatch();

    const shopAdd = async () => {
        try {
            await axios.post('http://localhost:3001/api', {
                title,
                address,
                postNum,
                phoneNum,
                lat,
                lng,
            });
            alert('주문처가 추가되었습니다.');
            onClose();
            dispatch(asyncAdminShopFn());
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="modal">
            <div className="modal-con">
                <h2>주문처 추가</h2>
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
                    type="number" 
                    value={lat} 
                    onChange={(e) => setLat(Number(e.target.value))} 
                />
                <label>경도</label> 
                <input 
                    type="number" 
                    value={lng} 
                    onChange={(e) => setLng(Number(e.target.value))} 
                />    

                <button onClick={shopAdd} className="update-btn">추가</button>
                <button onClick={onClose} className='close'>X</button>
            </div>
        </div>
    );
};

export default AddShopModal;
