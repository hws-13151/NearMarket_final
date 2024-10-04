import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { asyncAdminFruitFn } from '../../slice/adminSlice';

const AdminFruit = () => {
  const fruitItems = useSelector(state => state.admin.fruitItems)
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(asyncAdminFruitFn())
  }, []);

 
  return (
    <>
    <div className="admin-fruit">
      <div className="admin-fruit-con">
        {fruitItems && fruitItems.map((el,idx)=>{
          return(
            <ul key={idx}>
              <li>{el.id}</li>
              <li>{el.title}</li>
              <li>{el.id}</li>
            </ul>
          )
        })}
      </div>
    </div>
    </>
  );
};

export default AdminFruit;
