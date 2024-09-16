import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/slices/authSlice';

export default function Home() {
    const authInitialData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getUserData());
      console.log(authInitialData.data);
    }, [authInitialData.isLoggedIn]);
  return (
    <>
      <div className="w-full h-screen flex justify-center  items-center px-3 ">
      </div>
    </>
  )
}
