import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PaymentGoModal = () => {

    const navigate = useNavigate()


    return (
        <>
            <div className="payment-go-modal">
                <div className="payment-go-modal-con">
                    <p>결제가 완료되었습니다. <br /> 결제정보 페이지로 이동합니다</p>
                    <button onClick={() => {
                        navigate("/order/detail")
                    }}>확인</button>

                </div>
            </div>
        </>
    )
}

export default PaymentGoModal