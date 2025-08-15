import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Home = () => {
  const [orderID, setOrderID] = useState("")
  const [totalPrice, setTotalPrice] = useState("")
  const [items, setItems] = useState([])
  const [paymentMode, setPaymentMode] = useState("Cash")
  const [tableNumber, setTableNumber] = useState("")
  const [orderBy, setOrderBy] = useState("")
  const [portion, setPortion] = useState("")
  
  const [status2, setStatus2] = useState(true)

 

  const handelCreateOrder = async () => {


    try {
      console.log(orderID  , totalPrice , items  , tableNumber , orderBy , portion , paymentMode);
      

      const  res = await axios.post(
        "/api/orderentry",
        {
          orderID,
          portion,
          status :  status2 ? "paid" : "pending",
          totalPrice,
          items,
          paymentMode : status2 ? paymentMode : null,
          tableNumber,
          orderBy,
        },
        { withCredentials: true }
      )
      console.log(res.data);


    } catch (error) {
      toast.error(error.message)
      console.log(error.message);
      
    }
  }


  


  return (
    <>
    <div className="overflow-x-auto">
      <table className="table table-xl">
        <thead>
          <tr>
            <th></th>
            <th>ORDER ID</th>
            <th>ORDER NAME</th>
            <th>PORTION</th>
            <th>TABLE NUMBER</th>
            <th>PRICE</th>
            <th>ORDER STATUS</th>
            <th className={`${status2 ? "block" : "hidden"}`}>PAYMENT METHOD</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td><input onChange={(e) => setOrderID(e.target.value)}  type="text" className='py-2  text-sm px-1 w-full outline-zinc-700 outline-[1px]' /></td>
            <td><input  onChange={(e) => setItems(e.target.value)} type="text" className='py-1 text-sm  px-1 w-full outline-zinc-700 outline-[1px]' /></td>

            <td><input onChange={(e) => setPortion(e.target.value)}  type="text" className='py-2 text-sm  px-1 w-full outline-zinc-700 outline-[1px]' /></td>

            <td><input onChange={(e) => setTableNumber(e.target.value)}  type="text" className='py-2 text-sm  px-1 w-full outline-zinc-700 outline-[1px]' /></td>

            <td><input onChange={(e) => setTotalPrice(e.target.value)}  type="text" className='py-2  text-sm px-1 w-full outline-zinc-700 outline-[1px]' /></td>

            <td>
              <select
                defaultValue="Paid"
                className="select"
                onChange={(e) => setStatus2(e.target.value === "Paid")}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </td>

            <td className={`${status2 ? "block" : "hidden"}`} >
              <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}  className="select">
                <option value="Cash">Cash</option>

                <option value="Digital Wallet">Digital Wallet</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Card">Card</option>


              </select></td>

          </tr>
        </tbody>



      </table>
    </div>
    <div className='flex justify-center'>
      <div className='flex gap-4'>
        <button onClick={handelCreateOrder} className="btn btn-soft btn-success">Create Order</button>

      </div>
    </div>

    </>
  )
}

export default Home
