import React, { useEffect } from 'react'
import {toast} from "react-toastify";
const Dashboard = () => {

  useEffect(()=>{
  toast.success("Welcome Back!!")

},[]);
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
