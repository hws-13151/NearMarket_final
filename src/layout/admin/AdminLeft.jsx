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
            <img src="/images/admin/user1.png" alt="user" />
              <Link to={'/admin/members'}>회원</Link>             
            </li>
            <li>
            <img src="/images/admin/best.png" alt="best" />
              <Link to={'/admin/best'}>베스트 상품</Link>             
            </li>
            <li>
            <img src="/images/orderheader/vegetable.png" alt="vegetable" />
              <Link to={'/admin/vegetable'}>채소</Link>
            </li>
            <li>
            <img src="/images/orderheader/meat.png" alt="meat" />
              <Link to={'/admin/meat'}>고기</Link>
            </li>
            <li>
            <img src="/images/orderheader/fruit.png" alt="fruit" />
              <Link to={'/admin/fruit'}>과일</Link>
            </li>
            <li>
            <img src="/images/orderheader/snack.png" alt="snack" />
              <Link to={'/admin/snack'}>과자</Link>
            </li>
            <li>
            <img src="/images/admin/Cart.png" alt="cart" />
              <Link to={'/admin/cart'}>장바구니</Link>
            </li>
            <li>
            <img src="/images/admin/produtcsInsert1.png" alt="productsInsert" />
              <Link to={'/admin/produtcsInsert'}>상품등록</Link>
            </li>
            <li>
            <img src="/images/admin/shop.png" alt="shop" />
              <Link to={'/admin/shop'}>주문처</Link>
            </li>
            <li>
            <img src="/images/admin/payment.png" alt="payment" />
              <Link to={'/admin/payment'}>결제</Link>
            </li>
            <li>
              <Link to={'/admin'}>ADMIN-HOME</Link>
            </li>
            
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