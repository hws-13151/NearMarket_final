import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

const OrderSnack = () => {
  const [snackList, setSnackList] = useState([]);
  const [userInput, setUserInput] = useState("")
  const [limit, setLimit] = useState(6)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit

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

  const paginatedSnacks = filteredSnack.slice(offset, offset + limit)

  const totalPages = Math.ceil(filteredSnack.length / limit)


  return (
    <>
      <div className="order-snack-header">
        <h2>
          신메뉴 <span>Total {filteredSnack.length}</span>
        </h2>
        <span style={{ display: 'block', marginLeft: '20px ' }}><SearchBox handleChange={handleChange} /></span>
      </div>

      <div className="order-snack">
        <div className="order-snack-con">
          <ul>
            {paginatedSnacks.map((el, idx) => {
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
          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSnack;
