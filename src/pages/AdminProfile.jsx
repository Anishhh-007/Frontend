import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addWorkerData } from '../redux/slice/WorkersDataSlice';

const AdminProfile = () => {
  const data = useSelector(store => store.workerdata)
  const admin = useSelector(store => store.admin)
  const dispatch = useDispatch()

  const handelDelWorker = async (id) => {
    try {
      const res = await axios.post(`/api/workers/delete/${id}`, {}, { withCredentials: true })
      console.log(res.data);

    } catch (error) {
      console.log("Worer delete garda lauda lagyo : " + error);

    }
  }


  const fetchWorkers = async () => {
    try {
      const res = await axios.get("/api/workers/profile", { withCredentials: true })
      console.log(res.data);
      dispatch(addWorkerData(res.data))



    } catch (error) {
      console.log("ERROR WHILE FETCHING WORKERS : ", error);

    }
  }
  useEffect(() => {
    fetchWorkers()
    console.log(data);

  }, [location.pathname])


  return (
    <div className='h-[100vh] w-full flex items-center gap-10 justify-center'>
      <div>
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title">Your's Profile</h2>

            <label className="label">First Name</label>
            <input readOnly type="text" placeholder="Primary" value={admin.firstName} className="input input-primary" />
            <label className="label">Last Name</label>
            <input readOnly type="text" placeholder="Primary" value={admin.lastName} className="input input-primary" />
            <label className="label">Brand</label>
            <input t readOnly ype="text" placeholder="Primary" value={admin.tenant} className="input input-primary" />

            <label className="label">Email</label>
            <input readOnly type="text" placeholder="Primary" value={admin.email} className="input input-primary" />
            <label className="label">Role</label>
            <input readOnly type="text" placeholder="Primary" value={admin.role} className="input input-primary" />


            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      <div  >

        <h2 className="card-title">Users You Have created</h2>

        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">

          <div className="carousel-item">
            {
              data.map((items, index) => {
                if (!data.length) {
                  return <p>No Users Created Yet.</p>
                } else {
                  return (
                    <div className='w-full h-full'>
                      <div className="card-body">
                        <label className="label">User ID</label>
                        <input readOnly type="text" value={items.worker_id} className="input input-primary" />
                        <label className="label"> Name</label>
                        <input readOnly type="text" value={items.nickname} className="input input-primary" />
                        <div className="card-actions justify-end">
                          <div className="tooltip" data-tip="Be sure, beccause once you delete a user, you cannot create another">
                            <button onClick={() => handelDelWorker(items._id)} className="btn btn-primary">Delete User</button>

                          </div>
                          {/* Open the modal using document.getElementById('ID').showModal() method */}

                        </div>
                      </div>
                    </div>
                  )
                }

              })}
          </div>

        </div>





      </div>

    </div>
  )
}

export default AdminProfile
