import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const loginData={
  userEmail:"",
  userPw:""
}

const Login = () => {

  const [login,setLogin]=useState(loginData)
  const navigate =useNavigate()
  const dispatch =useDispatch()


  const loginChangeFn= (e)=>{
    const name =e.target.name
    const value=e.target.value

    setLogin({
      ...login,
      [name]:value
    })
  }


  const loginFn =(e)=>{
    
    const loginAxiosFn = async(e)=>{
      try{
        const res=await axios.get(`http://localhost:3001/members`)
        const num =res.data.findIndex(el=>{
          return el.userEmail === login.userEmail && el.userPw === login.userPw
        })

        
      }catch(err){
        alert(err)
      }
    }
    loginAxiosFn()
  }







  return (
    <>
         <div className="login">
        <div className="login-con">
          <h1>로그인</h1>
          <ul>
            <li>
              <input type="text" name="userEmail" id="userEmail" placeholder='이메일'
                value={login.userEmail}
                onChange={loginChangeFn} />
            </li>
            <li>
              <input type="password" name="userPw" id="userPw" placeholder='비빌번호'
                value={login.userPw}
                onChange={loginChangeFn} />
            </li>
            <li>
              <button onClick={loginFn}>로그인</button>
              <button onClick={() => {
                navigate('/auth/join')
              }}>회원가입</button>
              <button onClick={() => {
                navigate('/order')
              }}>HOME</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Login