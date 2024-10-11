/*global kakao*/ 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = () => {
  const [api, setApi] = useState([]); 

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api');
        setApi(res.data); // API 데이터 설정
      } catch (error) {
        console.error("상점 정보를 가져오는 데 오류가 발생했습니다:", error);
      }
    };

    fetchApi();
  }, []); // API 데이터를 처음 가져올 때만 실행

  useEffect(() => {
    if (api.length > 0) { // api 데이터가 있을 때만 지도 로딩
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=03bbd3ba17e0e525572e91ca05d086de&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
              center: new window.kakao.maps.LatLng(37.65323, 127.061308), // 초기 중심 위치
              level: 5, // 초기 확대 수준
            };

            const map = new window.kakao.maps.Map(container, options);

            // 상점 목록을 기반으로 마커 및 인포윈도우 생성
            api.forEach((shop) => {
              const markerPosition = new window.kakao.maps.LatLng(shop.lat, shop.lng);
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
              });

              marker.setMap(map); // 마커를 지도에 추가

              // 인포윈도우 내용 생성
              const content = `
                <div style="padding:5px; width:150px;">
                  <b>${shop.title}</b><br>
                  주소:${shop.address}<br>
                  전화번호: ${shop.phoneNum}<br>
                  우편번호: ${shop.postNum}
                </div>
              `;

              const infowindow = new window.kakao.maps.InfoWindow({
                content: content,
                removable: true,
              });

              window.kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.open(map, marker);
              });
            });
          });
        }
      };
    }
  }, [api]); // api 데이터가 변경될 때마다 실행

  return <div id="map" style={{ width: "100%", height: "70vh" }}></div>;
};

export default Api;
