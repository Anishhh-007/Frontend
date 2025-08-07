import React from 'react'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const PaidOrders = () => {

  const orders = useSelector(store => store.order)

  const paidOrders = orders.filter(item => item.status === "paid")



  return (
    <>

      <ToastContainer position="top-right" />
      <div className="overflow-x-auto">
        <table className="table table-xl w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>ORDER ID</th>
              <th>ORDER NAME</th>
              <th>PORTION</th>
              <th>TABLE NO.</th>
              <th>PRICE</th>
              <th>PAYMENT MODE</th>
              <th>DATE</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>

            {
              paidOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className='text-center text-red-200'>No Orders yet</td>
                </tr>
              ) :
                (
                  paidOrders.map((item, index) => (
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
                          value={item.status}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="py-2 outline-none text-sm px-1 w-full outline-zinc-700 outline-[1px]"
                          value={item.paymentMode}
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
                    </tr>

                  ))

                )


            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PaidOrders
