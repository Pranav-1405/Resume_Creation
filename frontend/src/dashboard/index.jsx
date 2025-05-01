import React from 'react';
import AddResume from './components/AddResume';


// console.log("✅ Dashboard component is rendering"); 
function Dashboard() {
  return (
    <div className="p-4 px-md-5 px-lg-6">
      <h2 className="p-2 px-md-5 px-lg-2">MY Resume</h2>
      <p className="fw-bold fs-6">Start Creating AI Resume to yourvnext job role</p>
      <div className="row mt-5">
  <div className="col-6 col-md-4 col-lg-2">
    <AddResume />
    </div>
  {/* <div className="col-6 col-md-4 col-lg-2">
    <AddResume />
  </div>
  <div className="col-6 col-md-4 col-lg-2">
    <AddResume />
  </div>
  <div className="col-6 col-md-4 col-lg-2">
    <AddResume />
  </div>
  <div className="col-6 col-md-4 col-lg-2">
    <AddResume /> */}
  {/* </div>  */}
</div>

    </div>
  )
}

export default Dashboard;
