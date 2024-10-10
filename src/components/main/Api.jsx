import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Api = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // 카카오 맵 API 스크립트 로드
    const loadKakaoMap = () => {
      const script = document.createElement('script');
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=03bbd3ba17e0e525572e91ca05d086de"; // 본인의 API 키로 변경
      script.onload = () => {
        window.kakao.maps.load(initMap);
      };
      document.head.appendChild(script);
    };

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api');
        console.log(response.data, "집에보내줘"); // 응답 데이터 로그 확인
        setLocations(response.data.api); // 데이터가 제대로 들어오는지 확인
        loadKakaoMap(); // 카카오 맵 로드
      } catch (err) {
        alert(err);
      }
    };

    const initMap = () => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.65718789340028, 127.06228768423125), // 초기 위치
        level: 3, // 초기 줌 레벨
      };
      const map = new window.kakao.maps.Map(container, options); // 지도 생성
    };

    fetchData(); // 데이터 fetch
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
      <h1>카카오 맵 API</h1>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </>
  );
};

export default Api;
