import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAdminShopFn } from '../../slice/adminSlice';

const AdminShop = () => {
  const dispatch = useDispatch();
  const shops = useSelector(state => state.admin.shops); // Redux에서 샵 정보를 가져옴
  const [isLoading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchShops = async () => {
      await dispatch(asyncAdminShopFn()); // 데이터를 가져옴
      setLoading(false); // 데이터 가져오기가 끝나면 로딩 상태를 false로 설정
    };

    fetchShops();
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중 표시
  }

  return (
    <div className="admin-shop">
      <div className="admin-shop-con">
        <h1>주문처</h1>
       
      </div>
    </div>
  );
}

export default AdminShop;
