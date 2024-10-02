import React from 'react'
import AdminLeft from './AdminLeft'
import AdminRight from './AdminRight'

const AdminLayout = () => {
  return (
    <>
      <div className="admin">
        <div className="admin-con">
          <AdminLeft />
          <AdminRight />
        </div>
      </div>
    </>
  )
}

export default AdminLayout