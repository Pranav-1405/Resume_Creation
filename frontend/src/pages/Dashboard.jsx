import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column p-0">

<nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <Link className="navbar-brand fw-bold" to="/">
          Resume Builder
        </Link>
        <div className="ms-auto">
        <Link to="/" className="btn btn-danger">Logout</Link>
        </div>
      </nav>


    <div className="container mt-5">
      <h2 className="text-center">Welcome to Your Dashboard</h2>
      <p className="text-muted text-center">Start building your professional resume now.</p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/create-resume" className="btn btn-primary btn-lg">
          Create Resume
        </Link>
        <Link to="/saved-resumes" className="btn btn-secondary btn-lg">
          View Saved Resumes
        </Link>
      </div>

    </div>

    <footer className="bg-dark text-center text-white py-3 mt-auto">
        <p className="mb-0">&copy; {new Date().getFullYear()} Resume Builder. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;