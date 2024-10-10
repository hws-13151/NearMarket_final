import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector 추가
import { useNavigate } from "react-router-dom";
import { addCart1 } from "../../slice/cartSlice1";
import DetailModal from "./DetailModal";

const detailData = {
  id: 0,
  title: "",
  price: "",
  description: "",
  img: "",
  rocket: "",
  slideImage: [],
};

const OrderVegetableDetail = (param) => {
  const [vegetableDetail, setVegetableDetail] = useState(detailData);
  const [vegetableCount, setVegetableCount] = useState(1);
  const [slide, setSlide] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 사용자 이메일을 가져옵니다.
  const userEmail = useSelector((state) =>
    state.auth.isLogin ? state.auth.loginUser[0].userEmail : "guest"
  );

  useEffect(() => {
    const axiosFn = async () => {
      const vegetableId = param.param.id;

      try {
        const res = await axios.get(
          `http://localhost:3001/vegetableItems?id=${vegetableId}`
        );
        setVegetableDetail(res.data[0]);
      } catch (error) {
        alert(error);
      }
    };
    axiosFn();
  }, [param.param.id]);

  const vegetableIncrementFn = () => {
    setVegetableCount(vegetableCount + 1);
  };

  const vegetableDecrementFn = () => {
    vegetableCount <= 1
      ? setVegetableCount(1)
      : setVegetableCount(vegetableCount - 1);
  };

  useEffect(() => {
    const slideEffect = setInterval(() => {
      setSlide((prevSlide) =>
        prevSlide === vegetableDetail.slideImage.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(slideEffect);
  }, [vegetableDetail.slideImage.length]);

  const addVegetableCartFn = () => {
    const vegetableCart = {
      id: vegetableDetail.id,
      title: vegetableDetail.title,
      price: vegetableDetail.price,
      img: `/images/vegetable/${vegetableDetail.img}`,
      count: vegetableCount,
      category: "vegetable",
      userEmail, // 이메일 추가
    };
    dispatch(addCart1(vegetableCart));
  };

  const paymentFn = () => {
    const vegetableCart = {
      id: vegetableDetail.id,
      title: vegetableDetail.title,
      price: vegetableDetail.price,
      img: `/images/vegetable/${vegetableDetail.img}`,
      count: vegetableCount,
      userEmail, // 이메일 추가
    };
    dispatch(addCart1(vegetableCart));
    navigate("/order/payment");
  };

  const onModalFn = () => {
    setIsModal(true);
  };

  const previousSlideFn = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? vegetableDetail.slideImage.length - 1 : prevSlide - 1
    );
  };

  const nextSlideFn = () => {
    setSlide((prevSlide) =>
      prevSlide === vegetableDetail.slideImage.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <>
      {isModal && <DetailModal setIsModal={setIsModal} />}
      <div className="order-vegetable-detail">
        <div className="order-vegetable-detail-con">
          <div className="left">
            {vegetableDetail.slideImage.length > 0 && (
              <img
                className="slide"
                src={`/images/vegetable/${vegetableDetail.slideImage[slide]}`}
                alt={vegetableDetail.slideImage[slide]}
              />
            )}
            <div className="imagebutton">
              <button onClick={previousSlideFn}>&lsaquo;</button>
              <button onClick={nextSlideFn}>&rsaquo;</button>
            </div>
          </div>
          <div className="right">
            <div className="vegetable-detail-item">
              <div className="top">
                <ul>
                  <li>
                    <span>NM.K </span>
                  </li>
                  <li>
                    <h1>{vegetableDetail.title}</h1>
                  </li>
                  <li>
                    <h1>{vegetableDetail.price.toLocaleString()}원</h1>
                  </li>
                  <li>
                    <div className="rocket">로켓배송</div>
                    <div className="sale">세일</div>
                    <div className="coupon">쿠폰</div>
                  </li>
                  <li>
                    <div className="review">고객리뷰</div>
                  </li>
                  <li>{vegetableDetail.description}</li>
                </ul>
              </div>
              <div className="bottom">
                <div className="count">
                  <ul>
                    <li>
                      <span>구매수량</span>
                    </li>
                    <li>
                      <button onClick={vegetableIncrementFn}>+</button>
                      <span>{vegetableCount}</span>
                      <button onClick={vegetableDecrementFn}>-</button>
                    </li>
                  </ul>
                </div>
                <div className="counttotal">
                  <span>상품금액 합계</span>
                  <span>
                    {(vegetableDetail.price * vegetableCount).toLocaleString()}{" "}
                    원
                  </span>
                </div>
              </div>
            </div>
            <div className="order-go">
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                이전페이지
              </button>
              <button onClick={addVegetableCartFn} onClickCapture={onModalFn}>
                장바구니
              </button>
              <button onClick={paymentFn}>결제</button>
              <button>좋아요</button>
            </div>
          </div>
        </div>
        <div className="detail-page">상세설명</div>
      </div>
    </>
  );
};

export default OrderVegetableDetail;
