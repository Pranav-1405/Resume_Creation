import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand/logo */}
        <Link to="/" className="navbar-brand">
          Resume Builder
        </Link>

        {/* Hamburger button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                to="/" 
                className="nav-link" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/create-resume" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Resume
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/saved-resumes" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Saved Resumes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;