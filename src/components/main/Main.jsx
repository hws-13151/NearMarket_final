import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0); //image index 0번
  const totalImages = 4; //이미지 개수

  // 2초마다 이미지 변경
  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrentIndex((prevIndex)=>(prevIndex + 1) % totalImages)
    },2000)

    return () => clearInterval(interval)
  },[totalImages])

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  return (
    <>
      <div className="main">
        <div className="main-sec">
          <div className="section1">
            {/* 이미지 양 옆 넘기기 버튼 */}
            <div className="bCon">
              <button className="leftBtn" onClick={handleLeftClick}>&lsaquo;</button>
              <button className="rightBtn" onClick={handleRightClick}>&rsaquo;</button>
            </div>
            {/* 자동 넘기기 이미지 */}
            <div className="autoGallery">
              <ul>
                {/* 첫 번째 이미지 */}
                <li
                  className={currentIndex === 0 ? "active" : ""}
                  style={{ display: currentIndex === 0 ? "block" : "none" }}
                >
                </li>
                {/* 두 번째 이미지 */}
                <li
                  className={currentIndex === 1 ? "active" : ""}
                  style={{ display: currentIndex === 1 ? "block" : "none" }}
                >
                </li>
                {/* 세 번째 이미지 */}
                <li
                  className={currentIndex === 2 ? "active" : ""}
                  style={{ display: currentIndex === 2 ? "block" : "none" }}
                >
                </li>
                {/* 네 번째 이미지 */}
                <li
                  className={currentIndex === 3 ? "active" : ""}
                  style={{ display: currentIndex === 3 ? "block" : "none" }}
                >
                </li>
              </ul>
            </div>
            {/* 이미지 넘어가면 한 칸씩 넘어가는 하단 바 */}
            <div className="bottomBar">
              <ul>
                <li className={currentIndex === 0 ? "active" : ""}></li>
                <li className={currentIndex === 1 ? "active" : ""}></li>
                <li className={currentIndex === 2 ? "active" : ""}></li>
                <li className={currentIndex === 3 ? "active" : ""}></li>
              </ul>
            </div>
          </div>
          <div className="horizontal">&nbsp;</div>
          {/* grid 작업 LIST */}
          <div className="section2">
            <div className="sec2-con">
              <ul>
                <li onClick={() => navigate('/order/vegetable')}>
                  <div className="top">
                    <img src="/images/orderheader/vegetable.png" alt="vagetable-img" />
                  </div>
                  <div className="bottom">
                    <span>야채코너</span>
                  </div>
                </li>
                <li onClick={() => navigate('/order/meat')}>
                  <div className="top">
                    <img src="/images/orderheader/meat.png" alt="meat-img" />
                  </div>
                  <div className="bottom">
                    <span>육류코너</span>
                  </div>
                </li>
                <li onClick={() => navigate('/order/fruit')}>
                  <div className="top">
                    <img src="/images/orderheader/fruit.png" alt="fruit-img" />
                  </div>
                  <div className="bottom">
                    <span>과일코너</span>
                  </div>
                </li>
                <li onClick={() => navigate('/order/snack')}>
                  <div className="top">
                    <img src="/images/orderheader/snack.png" alt="snack-img" />
                  </div>
                  <div className="bottom">
                    <span>과자코너</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="horizontal">&nbsp;</div>
        </div>
      </div>
    </>
  )
};

export default Main;
