import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";

const AdminFruit = (param) => {
  const [adminFruit,setAdminFruit] = useState(null)
  const dispatch = useDispatch(); 
  useEffect(() => {
    const fetchAdminFruit = async () => {
      const fruitId = param.param.id;
      try {
        const res = await axios.get(`http://localhost:3001/fruitItems/${fruitId}`);
        setAdminFruit(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchAdminFruit();
  }, []);

 
  return (
    <>
    <div className="admin-fruit">
      <div className="admin-fruit-con">

      </div>
    </div>
    </>
  );
};

export default AdminFruit;
