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
            <table>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>이메일</th>
                  <th>비밀번호</th>
                  <th>나이</th>
                  <th>이름</th>
                  <th>주소</th>
                  <th>전화번호</th>
                  <th>권한</th>
                  <th>보기</th>
                </tr>
              </thead>
              <tbody>
                {members && members.map((el, idx) => (
                  <tr key={idx} className={el.role === 'ROLE_ADMIN' ? 'role-admin' : ''}>
                    <td>{el.id}</td>
                    <td>{el.userEmail}</td>
                    <td>{el.userPw}</td>
                    <td>{el.age}</td>
                    <td>{el.userName}</td>
                    <td>{el.address}</td>
                    <td>{el.phoneNumber}</td>
                    <td>{el.role}</td>
                    <td>
                      <button onClick={() => handleOpenModal(el)}>보기</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <MemberModal 
          member={selectedMember} 
          onClose={handleCloseModal} 
        />}
    </>
  );
}

export default AdminMember;
