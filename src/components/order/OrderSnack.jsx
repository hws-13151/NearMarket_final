import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

const OrderSnack = () => {
  const [snackList, setSnackList] = useState([]);
  const [userInput, setUserInput] = useState("")

  useEffect(() => {
    const axiosSetFn = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/snackItems`);
        setSnackList(res.data);
      } catch (err) {
        alert(err);
      }
    };
    axiosSetFn();
  }, []);

  const navigate = useNavigate();

  const snackDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute("data-id");
    navigate(`/order/snack/detail/${eId}`);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value)
  }
  const filteredSnack = snackList.filter((snack) => {
    return snack.title.toLowerCase().includes(userInput.toLocaleLowerCase())
  })


  return (
    <>
      <div className="order-snack-header">
        <h2>
          신메뉴 <span>Total {snackList.length}</span>
        </h2>
        <span style={{ display: 'block', marginLeft: '20px ' }}><SearchBox handleChange={handleChange} /></span>
      </div>

      <div className="order-snack">
        <div className="order-snack-con">
          <ul>
            {filteredSnack &&
              filteredSnack.map((el, idx) => {
                return (
                  <li key={idx} data-id={el.id} onClick={snackDetailFn}>
                    <div className="top">
                      <img
                        src={`/images/ordersnack/${el.img}`}
                        alt={`${el.title} 이미지`} // alt 속성 추가
                      />
                    </div>
                    <div className="bottom">
                      <span className="title">{el.title}</span>
                      <p className="description">{el.description}</p>
                      <span className="price">{el.price}원</span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderSnack;
