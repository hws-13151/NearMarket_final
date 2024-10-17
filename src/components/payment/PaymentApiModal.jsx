import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { kakao } = window;

const PaymentApiModal = ({ selectedShop, onClose }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (selectedShop) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=03bbd3ba17e0e525572e91ca05d086de&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
              center: new kakao.maps.LatLng(selectedShop.lat, selectedShop.lng),
              level: 5, // 확대 수준
            };

            const newMap = new kakao.maps.Map(container, options);
            setMap(newMap);

            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(selectedShop.lat, selectedShop.lng),
            });
            marker.setMap(newMap);

            const infowindow = new kakao.maps.InfoWindow({
              content: `<div><b>${selectedShop.title}</b><br/>${selectedShop.address}</div>`,
              removable: true,
            });
            infowindow.open(newMap, marker);
          });
        }
      };
    }
  }, [selectedShop]);

  if (!selectedShop) {
    return null;
  }

  return (
    <div className="paymentApi-modal">
      <div className="paymentApi-modal-con">
      <button className="close" onClick={onClose}>X</button>
        <h3>{selectedShop.title}의 위치</h3>
        <div id="map" style={{ width: '400px', height: '400px' }}></div>
      </div>
    </div>
  );
};

export default PaymentApiModal;
