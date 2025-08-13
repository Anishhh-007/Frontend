import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setOrders } from '../redux/slice/OrdersSlice';

const Pendingorders = () => {

  const [id, setID] = useState('')


  const [paymentMode, setPaymentMode] = useState('Cash')

  const dispatch = useDispatch();
  // Adjust selector to grab the array
  const orders = useSelector((state) => state.order);

  const pendingOrders = orders.filter((items) => items.status === "pending")



  const fetchOrders = async () => {
    try {
      const orders = await axios.get(
        "http://localhost:8000/order/all",
        { withCredentials: true }
      );
      dispatch(setOrders(orders.data));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    }
  }

  const handelOnClick = async () => {
    console.log(id);
    

    try {
      const res = await axios.post(`http://localhost:8000/order/update/${id}`, {
        paymentMode
      }, {
        withCredentials: true
      })
      console.log(res.data);


    } catch (error) {
      console.log("ERROR : " + error);

    }

  }

  useEffect(() => {
    fetchOrders();
  }, [location.pathname]); // only once on mount



  return (
    <>
      <div className='w-full  h-full flex justify-center items-center relative'>
        {/* CARD */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Status and Payment Method</h3>
            <p>Status : Paid <input type="checkbox" defaultChecked readOnly className="checkbox checkbox-success" />
            </p>

            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}  className="select">
                <option  value="Cash">Cash</option>
                <option value="Card">Card</option>

                <option value="Digital Wallet">Digital Wallet</option>
                <option value="Bank Transfer">Bank Transfer</option>

              </select>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button onClick={handelOnClick} className="btn bg-green-400">Done</button>
              </form>
            </div>
          </div>
        </dialog>

     

        {/* TABLE */}
        
          <table className="table table-xl w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>ORDER ID</th>
                <th>ORDER NAME</th>
                <th>PORTION</th>
                <th>TABLE NO.</th>
                <th>PRICE</th>
                <th>DATE</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center text-green-200 py-4 ">
                    No Pending Orders
                  </td>
                </tr>

              ) : (
                pendingOrders.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <input
                        type="text"
                        className="py-2 outline-none text-sm px-1 w-[80%] outline-zinc-700 outline-[1px]"
                        value={item.orderID}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="py-1 outline-none text-sm px-1 w-full outline-zinc-700 outline-[1px]"
                        value={item.items}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="py-2 outline-none text-sm px-1 w-full outline-zinc-700 outline-[1px]"
                        value={item.portion}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="py-2 outline-none text-sm px-1 w-full outline-zinc-700 outline-[1px]"
                        value={item.tableNumber}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="py-2 outline-none text-sm px-1 w-full outline-zinc-700 outline-[1px]"
                        value={item.totalPrice}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="py-2 outline-none text-sm px-1 w-full outline-zinc-700 outline-[1px]"
                        value={item.createdAt.slice(0, 10)}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="py-2 outline-none text-sm px-1 w-full outline-zinc-700 outline-[1px]"
                        value={item.createdAt.slice(10, 18)}
                        readOnly
                      />
                    </td>


                    <td>
                      <button className="btn bg-green-400 " onClick={() => { document.getElementById('my_modal_1').showModal(); setID(item._id) }}>Edit</button>
                    </td>
                  </tr>
                ))

              )              }
            </tbody>
          </table>
        </div>
     

      <ToastContainer position="top-right" />

    </>
  );
}

export default Pendingorders;
