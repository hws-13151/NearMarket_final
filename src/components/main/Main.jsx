import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="main">
        <div className="main-sec">
          <div className="section1">
            {/* 이미지 양 옆 넘기기 버튼 */}
            <div className="bCon">
              <button className="leftBtn">&lsaquo;</button>
              <button className="rightBtn">&rsaquo;</button>
            </div>
            {/* 자동 넘기기 이미지 */}
            <div className="autoGallery">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            {/* 이미지 넘어가면 한 칸씩 넘어가는 하단 바 */}
            <div className="bottomBar">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
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
