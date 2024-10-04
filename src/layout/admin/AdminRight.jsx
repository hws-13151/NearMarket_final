import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { logOutFn } from '../../slice/authSlice'

const AdminRight = () => {
  const loginUser = useSelector(state => state.auth.loginUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <>
      <div className="admin-right">
        <div className="admin-right-con">
          <div className="admin-right-header">
            <p>{loginUser[0].userName} 님</p>
            <ul>
              <li onClick={()=>{
                navigate('/auth/detail')
              }}>내정보</li>
              <li onClick={(e)=>{
                e.preventDefault()
                dispatch(logOutFn())
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