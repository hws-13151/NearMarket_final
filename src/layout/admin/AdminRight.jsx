import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const AdminRight = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="admin-right">
        <div className="admin-right-con">
          <div className="admin-right-header">
            <p>userName</p>
            <ul>
              <li onClick={()=>{
                navigate('/auth/ditail')
              }}>내정보</li>
              <li onClick={()=>{
                alert('로그아웃 성공! 메인화면으로 이동합니다.')
                navigate('/')
              }}>LOGOUT</li>
            </ul>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminRight