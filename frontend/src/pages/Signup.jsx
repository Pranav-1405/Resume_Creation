import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
 

  const[formValues,setFormValues]=useState({
     username :'',
     email :'',
     password : ''
  });

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setFormValues({...formValues,[name] : value});
    
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formValues);
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register-user", formValues);
      console.log(response, 'res');

      if (response.data.success) {
          toast.success(response.data.message || 'Registration successful!');
          setFormValues({username:"",email:"",password:""});
          setFormErrors("");
      } else {
          toast.error(response.data.message || 'Registration failed!');
      }
  } catch (error) {
      console.error('Error during registration:', error);
      toast.error(error.response.data.error.message || error.response.data.message || "Something went wrong. Please try again later.");
  }
  }

  return (
    <div className="container-fluid vh-100 d-flex flex-column p-0">

<nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <Link className="navbar-brand fw-bold" to="/">
          Resume Builder
        </Link>
        <div className="ms-auto">
          <Link to="/login" className="btn btn-outline-primary me-2">
            Login
          </Link>
          <Link to="/signin" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>


    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formValues.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formValues.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>

    <footer className="bg-dark text-center text-white py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} Resume Builder. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Register;