import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PaymentGoModal = () => {

    const navigate = useNavigate()


    return (
        <>
            <div className="payment-go-modal">
                <div className="payment-go-modal">
                    <p>결제 페이지로 이동합니다.</p>
                    <div className="button-con">
                        <button onClick={() => {
                            navigate("/order/detail")
                        }}>확인</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentGoModal