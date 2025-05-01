import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SavedResumes() {
  const [savedResumes, setSavedResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/resumes');
        if (!response.ok) {
          throw new Error('Failed to fetch resumes');
        }
        const data = await response.json();
        setSavedResumes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (isLoading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Saved Resumes</h2>
      
      {savedResumes.length === 0 ? (
        <div className="text-center">
          <p className="lead">No resumes saved yet.</p>
          <Link to="/create-resume" className="btn btn-primary">
            Create Your First Resume
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {savedResumes.map((resume) => (
            <div key={resume.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{resume.fullName}</h5>
                  <p className="card-text">
                    <small className="text-muted">
                      <i className="bi bi-envelope"></i> {resume.email}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <i className="bi bi-telephone"></i> {resume.phone}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <Link 
                    to={`/resume/${resume.id}`} 
                    className="btn btn-primary w-100"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedResumes;