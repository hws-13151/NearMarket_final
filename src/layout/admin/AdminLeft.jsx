import React from 'react'
import { Link } from 'react-router-dom'
const AdminLeft = () => {
  return (
    <>
    <div className="admin-left">
      <div className="admin-lef-con">
        <h1><Link to={'/'}> 
        <span className="mark">NM.k</span> 
        </Link></h1>
        <div className="menu">
          <ul>
            <li>
            <img src="/images/admin/user.png" alt="user" />
              <Link to={'/admin/members'}>회원</Link>             
            </li>
            
            <li>
            <img src="/images/admin/vegetable.png" alt="vegetable" />
              <Link to={'/admin/vegetable'}>채소</Link>
            </li>
            <li>
            <img src="/images/admin/meat.png" alt="meat" />
              <Link to={'/admin/meat'}>고기</Link>
            </li>
            <li>
            <img src="/images/admin/fruit.png" alt="fruit" />
              <Link to={'/admin/fruit'}>과일</Link>
            </li>
            <li>
            <img src="/images/admin/snack.png" alt="snack" />
              <Link to={'/admin/snack'}>과자</Link>
            </li>

            <li>
            <img src="/images/admin/produtcsInsert.png" alt="productsInsert" />
              <Link to={'/admin/produtcsInsert'}>상품등록</Link>
            </li>
            
            <li>
              <Link to={'/admin'}>ADMIN-HOME</Link>
            </li>
            {/* <li>
            <img src="/images/admin/ordercart.png" alt="cart" />
              <Link to={'/admin/carts'}>장바구니</Link>
            </li> */}
            {/* <li>
            <img src="/images/admin/faq.png" alt="productsInsert" />
              <Link to={'/admin/faq'}>고객지원</Link>
            </li> */}
          </ul>
          <div className="address">
            
            배고프조
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default AdminLeft