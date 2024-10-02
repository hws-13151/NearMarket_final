import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAuthMemberFn } from '../../slice/authSlice';
import MemberModal from './MemberModal'; 

const AdminMember = () => {
  const dispatch = useDispatch();
  
  const members = useSelector((state) => state.auth.memberList); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(); 

  useEffect(() => {
    dispatch(asyncAuthMemberFn());
  },[]); 

  const handleOpenModal = (member) => {
    setSelectedMember(member); 
    setModalOpen(true); 
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMember(null); 
  };

  return (
    <>
      <div className="admin-member">
        <div className="admin-member-con">
          <h1>ADMIN-MEMBERS</h1>
          <div className="members">
            <div className="title">
              <span>아이디</span>
              <span>이메일</span>
              <span>비밀번호</span>
              <span>나이</span>
              <span>이름</span>
              <span>주소</span>
              <span>전화번호</span>
              <span>권한</span>
              <span>보기</span>
            </div>
            <ul>
              {members && members.map((el, idx) => (
                <li key={idx}>
                  <span>{el.id}</span>
                  <span>{el.userEmail}</span>
                  <span>{el.userPw}</span>
                  <span>{el.age}</span>
                  <span>{el.userName}</span>
                  <span>{el.address}</span>
                  <span>{el.phoneNumber}</span>
                  <span>{el.role}</span>
                  <span>
                    <button onClick={() => handleOpenModal(el)}>보기</button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isModalOpen &&<MemberModal 
          member={selectedMember} 
          onClose={handleCloseModal} 
        />
      }
    </>
  );
}

export default AdminMember;
