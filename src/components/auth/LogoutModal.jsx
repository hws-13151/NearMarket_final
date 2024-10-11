import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutModal = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="logoutmodal">
                <div className="logoutmodal-con">
                    <p>로그아웃 합니다 <br /> 메인페이지로 이동합니다</p>
                    <button onClick={() => {
                        navigate('/')
                    }}>확인</button>
                </div>
            </div>
        </>
    )
}

export default LogoutModal