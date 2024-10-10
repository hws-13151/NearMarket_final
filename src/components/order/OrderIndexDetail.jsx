import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailModal from "./DetailModal";
import { useDispatch, useSelector } from "react-redux"; // useSelector 추가
import { addCart1 } from "../../slice/cartSlice1";

const indexData = {
  id: 0,
  title: "",
  price: 0,
  img: "",
  description: "",
};

const OrderIndexDetail = (param) => {
  const navigate = useNavigate();
  const [indexItem, setIndexItem] = useState(indexData);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const userEmail = useSelector((state) =>
    state.auth.isLogin ? state.auth.loginUser[0].userEmail : "guest"
  );

  useEffect(() => {
    const orderindexDetailFn = async () => {
      const indexId = param.param.id;
      try {
        const res = await axios.get(
          `http://localhost:3001/indexItems?id=${indexId}`
        );
        setIndexItem(res.data[0]);
      } catch (error) {
        alert(error);
      }
    };
    orderindexDetailFn();
  }, [param.param.id]); // 의존성 배열에 param.param.id 추가

  const IncrementFn = () => {
    setCount(count + 1);
  };

  const DecrementFn = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  const [isModal, setIsModal] = useState(false);

  const onModalFn = () => {
    setIsModal(true);
  };

  const addCartFn2 = () => {
    const setItemCart = {
      id: indexItem.id,
      title: indexItem.title,
      price: indexItem.price,
      img: `/images/index/${indexItem.img}`,
      count: count,
      category: "index",
      userEmail, // 이메일 정보를 추가
    };
    dispatch(addCart1(setItemCart));
  };

  return (
    <>
      {isModal && <DetailModal setIsModal={setIsModal} />}
      <div className="order-index-detail">
        <div className="order-index-detail-con">
          <div className="left">
            <div className="left-img">
              <img src={`/images/index/${indexItem.img}`} alt={indexItem.img} />
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <ul>
                <li>NM.K</li>
                <li>
                  <h1>{indexItem.title}</h1>
                </li>
                <li>{indexItem.description}</li>
                <li>
                  <h1>{indexItem.price.toLocaleString()}원</h1>
                </li>
                <li>
                  <h3>상품설명 :</h3>
                  <br />
                  <p>좋은 제품입니다. ♡⸜(˶˃ ᵕ ˂˶)⸝♡</p>
                </li>
              </ul>
            </div>
            <div className="right-bottom">
              <div className="bottom">
                <div className="bottom-price">
                  <ul>
                    <li>{indexItem.title}</li>
                    <li>
                      <button onClick={IncrementFn}>+</button>
                      <span>{count}</span>
                      <button onClick={DecrementFn}>-</button>
                      <p>{(indexItem.price * count).toLocaleString()}원</p>
                    </li>
                  </ul>
                </div>
                <div className="bottom-payment">
                  <ul>
                    <li>
                      <p>합계</p>
                      <h1>{(indexItem.price * count).toLocaleString()}원</h1>
                    </li>
                    <hr />
                    <li>
                      <button
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        이전페이지
                      </button>
                      <button onClick={addCartFn2} onClickCapture={onModalFn}>
                        장바구니
                      </button>
                      <button>결제</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderIndexDetail;
