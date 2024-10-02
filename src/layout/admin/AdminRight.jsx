import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminRight = () => {
  return (
    <>
      <div className="admin-right">
        <div className="admin-right-con">
          <div className="admin-right-header">
            <ul>
              <li>유저정보</li>
              <li>LOGOUT</li>
            </ul>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminRight