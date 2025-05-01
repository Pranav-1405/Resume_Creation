import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Login successful:", data.user);
        
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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


      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Login</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signin">Sign up</Link>
          </p>
        </div>
      </div>


      <footer className="bg-dark text-center text-white py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} Resume Builder. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Login;