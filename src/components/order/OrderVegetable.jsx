import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

const OrderVegetable = () => {

  const [vegetable, setVgetable] = useState([])
  const [userInput, setUserInput] = useState("")

  const navigate = useNavigate()


  useEffect(() => {
    const axiosFn = async () => {

      try {
        const res = await axios.get(`http://localhost:3001/vegetableItems`)
        setVgetable(res.data)
      } catch (error) {
        alert(error)
      }
    };
    axiosFn()
  }, [])

  const handleChange = (e) => {
    setUserInput(e.target.value)
  }
  const filteredVegetable = vegetable.filter((vege) => {
    return vege.title.toLowerCase().includes(userInput.toLowerCase())
  })




  const orderVegetableDetailFn = (e) => {


    const eId = e.currentTarget.getAttribute('data-id')



    navigate(`/order/vegetable/detail/${eId}`)
  };






  return (
    <>
      <div className="order-vegetable">
        <div className="order-vegetable-con">
          <div className="title">신선한 채소</div>
          <span>Total {vegetable.length}</span>
          <span>

            <SearchBox handleChange={handleChange} />
          </span>

          <ul>
            {filteredVegetable && filteredVegetable.map((el) => {
              return (
                <li key={el.id} data-id={el.id} onClick={orderVegetableDetailFn}>
                  <div className="top">
                    <img src={`/images/vegetable/${el.img}`} alt={el.img} />
                  </div>
                  <div className="bottom">
                    <span>{el.title}</span>
                    <span className="delivery-order">
                      <img src={`/images/vegetable/${el.rocket}`} alt={el.rocket} />로켓배송
                    </span>
                    <span>{el.description}</span>
                    <span>{el.price}원</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default OrderVegetable
