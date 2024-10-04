import React from 'react'
import AdminFruit from '../../components/admin/AdminFruit'
import { useParams } from 'react-router-dom'

const AdminFruitPage = () => {
  const param = useParams()
  return (
    <>
    <AdminFruit param={param}/>
    </>
  )
}

export default AdminFruitPage