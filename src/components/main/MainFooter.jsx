import React from 'react'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const OrderFooter = () => {
  return (
    <>
      <div className="main-footer">
        <div className="main-footer-con">
          <div className="information">
            <div className="information-con">
              <h4>NM.K</h4>
              <ul>
                <li>About us</li>
                <li>Our services</li>
                <li>Privacy policy</li>
              </ul>
            </div>
            <div className="information-con">
              <h4>Get help</h4>
              <ul>
                <li>FAQ</li>
                <li>Shipping</li>
                <li>Return</li>
                <li>Order status</li>
              </ul>
            </div>
            <div className="information-con">
              <h4>Online shop</h4>
              <ul>
                <li><Link to={"/order/vegetable"}>Vegetable</Link></li>
                <li><Link to={"/order/meat"}>Meat</Link></li>
                <li><Link to={"/order/fruit"}>Fruit</Link></li>
                <li><Link to={"/order/snack"}>Snack</Link></li>
              </ul>
            </div>
            <div className="information-con">
              <h4>follow us</h4>
              <div className="social-links">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-linkedin-in"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default OrderFooter
