import React, { useEffect } from 'react';

const Api = () => {
  useEffect(() => {
    // 카카오맵 API 스크립트를 불러오고 맵을 초기화하는 함수
    const initMap = () => {
      // 카카오맵 API를 로드
      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 맵을 그릴 DOM 엘리먼트
        const options = {
          center: new window.kakao.maps.LatLng(37.65718789340028, 127.06228768423125), // 초기 맵의 중심 좌표
          level: 3 // 맵의 확대 수준
        };
        const map = new window.kakao.maps.Map(container, options); // 맵 생성

        // 필요하다면 마커를 추가할 수도 있습니다
        const markerPosition = new window.kakao.maps.LatLng(37.65718789340028, 127.06228768423125); 
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);
      });
    };

    // 카카오맵 API가 로드되면 initMap 함수 실행
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=03bbd3ba17e0e525572e91ca05d086de"; // 여기에서 YOUR_APP_KEY를 실제 앱 키로 바꿔야 해
      script.onload = () => window.kakao.maps.load(initMap); // 'kakao' 대신 'window.kakao'로 수정
      document.head.appendChild(script);
    }
  }, []); // 의존성 배열에 빈 배열을 넣어 컴포넌트가 마운트될 때 한 번만 실행되게 설정

  return (
    <div>
      <h1>카카오 맵 API</h1>
      {/* 카카오 맵이 그려질 div */}
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default Api;
