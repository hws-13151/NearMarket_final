import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart1 } from "../../slice/cartSlice1";
import DetailModal from "./DetailModal";
import { updateViewCountInServer } from "../../slice/viewcountSlice";

const detailData = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  img: "",
  rocket: "",
  slideImage: [],
  viewcount: 1
};

const OrderVegetableDetail = (param) => {
  const [vegetableDetail, setVegetableDetail] = useState(detailData);
  const [vegetableCount, setVegetableCount] = useState(1);
  const [slide, setSlide] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector((state) =>
    state.auth.isLogin ? state.auth.loginUser[0]?.userEmail : "guest"
  );

  useEffect(() => {
    const axiosFn = async () => {
      const vegetableId = param.param.id;
      dispatch(updateViewCountInServer(vegetableId));
      try {
        const res = await axios.get(
          `http://localhost:3001/vegetableItems?id=${vegetableId}`
        );
        setVegetableDetail(res.data[0] || detailData); // 데이터가 없으면 기본값 설정
      } catch (error) {
        alert(error);
      }
    };
    axiosFn();
  }, []);

  const vegetableIncrementFn = () => {
    setVegetableCount((prevCount) => prevCount + 1);
  };

  const vegetableDecrementFn = () => {
    setVegetableCount((prevCount) =>
      prevCount <= 1 ? 1 : prevCount - 1
    );
  };

  useEffect(() => {
    if (Array.isArray(vegetableDetail.slideImage) && vegetableDetail.slideImage.length > 0) {
      const slideEffect = setInterval(() => {
        setSlide((prevSlide) =>
          prevSlide === vegetableDetail.slideImage.length - 1 ? 0 : prevSlide + 1
        );
      }, 3000);

      return () => clearInterval(slideEffect);
    }
  }, [vegetableDetail.slideImage]);

  const addVegetableCartFn = () => {
    const vegetableCart = {
      id: vegetableDetail.id,
      title: vegetableDetail.title,
      price: vegetableDetail.price,
      img: `/images/vegetable/${vegetableDetail.img}`,
      count: vegetableCount,
      category: "vegetable",
      userEmail,
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
      userEmail,
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
            {Array.isArray(vegetableDetail.slideImage) && vegetableDetail.slideImage.length > 0 ? (
              <>
                <img
                  className="slide"
                  src={`/images/vegetable/${vegetableDetail.slideImage[slide]}`}
                  alt={vegetableDetail.slideImage[slide]}
                />
                <div className="imagebutton">
                  <button onClick={previousSlideFn}>&lsaquo;</button>
                  <button onClick={nextSlideFn}>&rsaquo;</button>
                </div>
              </>
            ) : (
              <img src={`/images/vegetable/${vegetableDetail.img}`} alt={vegetableDetail.img} />
            )}
          </div>
          <div className="right">
            <div className="vegetable-detail-item">
              <div className="top">
                <ul>
                  <li>
                    <span>NM.K </span>
                  </li>
                  <li><span>조회수 {vegetableDetail.viewcount}</span></li>
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
                    {(vegetableDetail.price * vegetableCount).toLocaleString()} 원
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