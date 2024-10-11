import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailModal from "./DetailModal";
import { useDispatch, useSelector } from "react-redux"; // useSelector 추가
import { addCart1 } from "../../slice/cartSlice1";
import { updateViewCountInServer } from "../../slice/viewcountSlice";

const meatData = {
  id: 0,
  title: "",
  price: 0,
  img: "",
  description: ""

};

const OrderMeatDetail = (param) => {
  const navigate = useNavigate();
  const [meatItem, setMeatItem] = useState(meatData);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  // 사용자 이메일을 가져옵니다.
  const userEmail = useSelector((state) =>
    state.auth.isLogin ? state.auth.loginUser[0].userEmail : "guest"
  );

  useEffect(() => {
    const ordermeatDetailFn = async () => {
      const meatId = param.param.id;
      dispatch(updateViewCountInServer({ productId: meatId, category: 'meat' }))
      try {
        const res = await axios.get(
          `http://localhost:3001/meatItems?id=${meatId}`
        );
        setMeatItem(res.data[0]);
      } catch (error) {
        alert(error);
      }
    };
    ordermeatDetailFn();
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
      id: meatItem.id,
      title: meatItem.title,
      price: meatItem.price,
      img: `/images/meat/${meatItem.img}`,
      count: count,
      category: "meat",
      userEmail, // 이메일 정보를 추가
    };
    dispatch(addCart1(setItemCart));
  };

  const paymentFn = () => {
    const setItemCart = {
      id: meatItem.id,
      title: meatItem.title,
      price: meatItem.price,
      img: `/images/meat/${meatItem.img}`,
      count: count,
      userEmail,
    };
    dispatch(addCart1(setItemCart));
    navigate("/order/payment");
  };

  return (
    <>
      {isModal && <DetailModal setIsModal={setIsModal} />}
      <div className="order-meat-detail">
        <div className="order-meat-detail-con">
          <div className="left">
            <div className="left-img">
              <img src={`/images/meat/${meatItem.img}`} alt={meatItem.img} />
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <ul>
                <li>NM.K</li>
                <li><span>조회수 {meatItem.viewcount}</span></li>
                <li>
                  <h1>{meatItem.title}</h1>
                </li>
                <li>{meatItem.description}</li>
                <li>
                  <h1>{meatItem.price.toLocaleString()}원</h1>
                </li>
                <li>
                  <h3>상품설명 :</h3>
                  <br />
                  <p>
                    어떻게 먹어도 언제나 맛있는 고기 항상 국내산 최고급만
                    취급하기 때문에 <br /> 안전하고 맛있게 드실 수 있습니다!!{" "}
                    <br /> 저희 가게를 찾아주셔서 감사합니다~ ♡⸜(˶˃ ᵕ ˂˶)⸝♡
                  </p>
                </li>
              </ul>
            </div>
            <div className="right-bottom">
              <div className="bottom">
                <div className="bottom-price">
                  <ul>
                    <li>{meatItem.title}</li>
                    <li>
                      <button onClick={IncrementFn}>+</button>
                      <span>{count}</span>
                      <button onClick={DecrementFn}>-</button>
                      <p>{(meatItem.price * count).toLocaleString()}원</p>
                    </li>
                  </ul>
                </div>
                <div className="bottom-payment">
                  <ul>
                    <li>
                      <p>합계</p>
                      <h1>{(meatItem.price * count).toLocaleString()}원</h1>
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
                      <button onClick={paymentFn}>결제</button>
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

export default OrderMeatDetail;
