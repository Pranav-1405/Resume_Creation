import { Link } from "react-router-dom";

export default function Home() {
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
      
      <div
        className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          background: "url('https://media.istockphoto.com/id/895298410/photo/business-concept.jpg?s=612x612&w=0&k=20&c=Mdi-lVBKQbu408LjI5ZWmjZJOCbsPPDK_2Eaa7bj5uc=') center/cover",
          color: "#fff",
        }}
      >
        <h1 className="display-4 fw-bold text-primary">Create Your Professional Resume</h1>
        <p className="lead mb-4 text-primary">Quick, easy, and free resume building.</p>
        <div className="d-flex gap-3">
          <Link to="/signin" className="btn btn-success btn-lg">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-light btn-lg">
            Login
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-center text-white py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} Resume Builder. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
