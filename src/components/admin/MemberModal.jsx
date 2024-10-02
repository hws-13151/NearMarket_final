import React, { useState } from 'react';
import axios from 'axios';
import { asyncAuthMemberFn } from '../../slice/authSlice';
import { useDispatch } from 'react-redux';

const MemberModal = ({ member, onClose }) => {
  const [userEmail, setUserEmail] = useState(member.userEmail);
  const [userPw, setUserPw] = useState(member.userPw);
  const [age, setAge] = useState(member.age);
  const [userName, setUserName] = useState(member.userName); 
  const [address, setAddress] = useState(member.address);
  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber); 
  const [role, setRole] = useState(member.role);
  const dispatch = useDispatch()

  const userUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/members/${member.id}`, {
        userEmail,
        userPw,
        age,
        userName,
        address,
        phoneNumber,
        role,
      });
      alert('회원 정보가 수정되었습니다.');
      onClose(); 
      dispatch(asyncAuthMemberFn()); 
    }
     catch (err) {
      alert(err);
    }
  };

  const userDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/members/${member.id}`);
      alert('회원 정보가 삭제되었습니다.');
      onClose(); 
      dispatch(asyncAuthMemberFn()); 
    } catch (err) {
     alert(err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>회원 정보 수정</h2>
        <label>이메일:</label>
        <input 
          type="email" 
          value={userEmail} 
          onChange={(e) => setUserEmail(e.target.value)} 
        />
        <label>비밀번호:</label>
        <input 
          type="text" 
          value={userPw} 
          onChange={(e) => setUserPw(e.target.value)} 
        />
        <label>나이:</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
        <label>이름:</label> 
        <input 
          type="text" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
        />
        <label>주소:</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
        <label>전화번호:</label> 
        <input 
          type="text" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
        />    
        <label>권한:</label>
        <input 
          type="text" 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
        />
        <button onClick={userUpdate}>수정</button>
        <button onClick={userDelete}>삭제</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default MemberModal;
