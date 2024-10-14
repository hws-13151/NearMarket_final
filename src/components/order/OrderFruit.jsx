import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

const OrderFruit = () => {
  const [fruitList, setFruitList] = useState([]);
  const [userInput, setUserInput] = useState("")
  const [limit, setLimit] = useState(6)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFruitItems = async () => {
      try {
        const res = await axios.get('http://localhost:3001/fruitItems');
        setFruitList(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchFruitItems();
  }, []);

  const fruitDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute('data-id');
    navigate(`/order/fruit/detail/${eId}`);
  };


  const handleChange = (e) => {
    setUserInput(e.target.value)
  }
  const filteredFruit = fruitList.filter((fruit) => {
    return fruit.title.toLowerCase().includes(userInput.toLowerCase())
  })


  const paginatedFruits = filteredFruit.slice(offset, offset + limit)

  const totalPages = Math.ceil(filteredFruit.length / limit)



  return (
    <div className='order-fruit'>
      <div className='order-fruit-header'>
        <h2>과일 Total {filteredFruit.length}</h2>
        <div className="search">
          <span ><SearchBox handleChange={handleChange} /></span>
        </div>
      </div>
      <div className='order-fruit-con'>
        <ul>
          {paginatedFruits.map((el, idx) => (
            <li key={idx} data-id={el.id} onClick={fruitDetailFn}>
              <div className="top">
                <img src={`/images/fruit/${el.img}`} alt={el.img} />
              </div>
              <div className="bottom">
                <h3>{el.title}</h3>
                <p>{el.description}</p>
                <span>{el.price.toLocaleString()}원</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
  );
};

export default OrderFruit;
