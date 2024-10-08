import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderIndex = () => {
  const [indexList, setIndexList] = useState([]);
  const [fruitItem, setFruitItem] = useState({});
  const [vegetableItem, setVegetableItem] = useState({});
  const [snackItem, setSnackItem] = useState({});
  const [meatItem, setMeatItem] = useState({});

  useEffect (()=>{
    const fetchData = async () =>{
      try{
        const [indexRes, fruitRes, vegetableRes, snackRes, meatRes] = await Promise.all([
          axios.get(`http://localhost:3001/indexItems`),
          axios.get(`http://localhost:3001/fruitItems`),
          axios.get(`http://localhost:3001/vegetableItems`),
          axios.get(`http://localhost:3001/snackItems`),
          axios.get(`http://localhost:3001/meatItems`)
        ])
        setIndexList(indexRes.data)
        setFruitItem(fruitRes.data[0])
        setVegetableItem(vegetableRes.data[0])
        setSnackItem(snackRes.data[3])
        setMeatItem(meatRes.data[0])
      }catch(error){
        alert(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='order-index'>
      <div className="order-index-con">
        <div className='order-index-top'>
          <h2>코너별 추천상품</h2>
          <ul>
            <li>
              <div className="top">
                <img src={`/images/fruit/${fruitItem.img}`} alt={fruitItem.title} />
              </div>
              <div className="bottom">
                <h3>{fruitItem.title}</h3>
                <p>{fruitItem.description}</p>
                <span>{fruitItem.price ? fruitItem.price.toLocaleString() : '가격 정보 없음'}원</span>
              </div>
            </li>
            <li>
              <div className="top">
                <img src={`/images/vegetable/${vegetableItem.img}`} alt={vegetableItem.title} />
              </div>
              <div className="bottom">
                <h3>{vegetableItem.title}</h3>
                <p>{vegetableItem.description}</p>
                <span>{vegetableItem.price ? vegetableItem.price.toLocaleString() : '가격 정보 없음'}원</span>
              </div>
            </li>
            <li>
              <div className="top">
                <img src={`/images/ordersnack/${snackItem.img}`} alt={snackItem.title} />
              </div>
              <div className="bottom">
                <h3>{snackItem.title}</h3>
                <p>{snackItem.description}</p>
                <span>{snackItem.price ? snackItem.price.toLocaleString() : '가격 정보 없음'}원</span>
              </div>
            </li>
            <li>
              <div className="top">
                <img src={`/images/meat/${meatItem.img}`} alt={meatItem.title} />
              </div>
              <div className="bottom">
                <h3>{meatItem.title}</h3>
                <p>{meatItem.description}</p>
                <span>{meatItem.price ? meatItem.price.toLocaleString() : '가격 정보 없음'}원</span>
              </div>
            </li>
          </ul>
        </div>
        <div className='order-index-top'>
          <h2>이런 상품 어때요?</h2>
          <ul>
            {indexList && indexList.map((el, idx) => (
              <li key={idx} data-id={el.id}>
                <div className="top">
                  <img src={`/images/orderIndex/${el.img}`} alt={el.img} />
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
    </div>
  );
};

export default OrderIndex;
