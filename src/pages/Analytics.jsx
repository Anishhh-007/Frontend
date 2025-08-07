import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addAnalytics } from '../redux/slice/AnalyticsSlice';
 import LineGraph from '../components/LineGraph';

const Analytics = () => {

  const dispatch = useDispatch()
  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(" http://localhost:8000/admin/analytics", { withCredentials: true })

     
      
      dispatch(addAnalytics(res.data))
      console.log(res.data);
      

    } catch (error) {
      console.log("ERROR : " + error.message);

    }
  }


  useEffect(() =>{
    fetchAnalytics()
  } , [])

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <LineGraph />

    </div>
  )
}

export default Analytics
