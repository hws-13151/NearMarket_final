import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

const OrderFruit = () => {
  const [fruitList, setFruitList] = useState([]);
  const [userInput, setUserInput] = useState("")
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



  return (
    <div className='order-fruit'>
      <div className='order-fruit-header'>
        <h2>과일 Total {fruitList.length}</h2>
        <div className="search">
          <span ><SearchBox handleChange={handleChange} /></span>
        </div>
      </div>
      <div className='order-fruit-con'>
        <ul>
          {filteredFruit && filteredFruit.map((el) => (
            <li key={el.id} data-id={el.id} onClick={fruitDetailFn}>
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
    </div>
  );
};

export default OrderFruit;
