import { useParams } from 'react-router-dom';  // useParams: Gets URL parameters
import { useEffect, useState } from 'react'; // useEffect and useState: React hooks for side effects and state management
import { Link } from 'react-router-dom';
import './ResumeTemplate.css';

function ResumeTemplate() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
-
  useEffect(() => {
    fetch(`http://localhost:3000/api/resumes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Resume not found');
        return res.json();
      })
      .then((data) => {
        setResume(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching resume:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center" role="alert">
          {error}
          <div className="mt-3">
            <Link to="/saved-resumes" className="btn btn-primary">Back to Saved Resumes</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* A4 Size Resume Container */}
          <div className="resume-a4 card shadow-lg">
            {/* Header Section */}
            <div className="resume-header bg-primary text-white p-4">
              <h1 className="resume-name text-center mb-0">{resume.fullName}</h1>
              <div className="contact-info text-center mt-2">
                <small>
                  <span className="me-2"><i className="bi bi-envelope-fill"></i> {resume.email}</span>
                  <span className="mx-2"><i className="bi bi-telephone-fill"></i> {resume.phone}</span>
                  <span className="ms-2"><i className="bi bi-geo-alt-fill"></i> {resume.address}</span>
                </small>
              </div>
            </div>

            {/* Main Content */}
            <div className="resume-body p-4">
              <div className="row">
                {/* Left Column */}
                <div className="col-md-4">
                  {/* Skills Section */}
                  <div className="resume-section mb-4">
                    <h3 className="section-title border-bottom border-primary pb-2">
                      <i className="bi bi-tools me-2"></i>Skills
                    </h3>
                    <div className="section-content">
                      <p className="small">{resume.skills}</p>
                    </div>
                  </div>

                  {/* Languages Section */}
                  {resume.languages && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title border-bottom border-primary pb-2">
                        <i className="bi bi-translate me-2"></i>Languages
                      </h3>
                      <div className="section-content">
                        <p className="small">{resume.languages}</p>
                      </div>
                    </div>
                  )}

                  {/* Links Section */}
                  {(resume.linkedin || resume.github) && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title border-bottom border-primary pb-2">
                        <i className="bi bi-link-45deg me-2"></i>Links
                      </h3>
                      <div className="section-content">
                        {resume.linkedin && (
                          <p className="small mb-1">
                            <i className="bi bi-linkedin me-2"></i>
                            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                          </p>
                        )}
                        {resume.github && (
                          <p className="small mb-1">
                            <i className="bi bi-github me-2"></i>
                            <a href={resume.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="col-md-8">
                  {/* Education Section */}
                  <div className="resume-section mb-4">
                    <h3 className="section-title border-bottom border-primary pb-2">
                      <i className="bi bi-mortarboard-fill me-2"></i>Education
                    </h3>
                    <div className="section-content">
                      <p className="small">{resume.education}</p>
                    </div>
                  </div>

                  {/* Experience Section */}
                  <div className="resume-section mb-4">
                    <h3 className="section-title border-bottom border-primary pb-2">
                      <i className="bi bi-briefcase-fill me-2"></i>Experience
                    </h3>
                    <div className="section-content">
                      <p className="small">{resume.experience}</p>
                    </div>
                  </div>

                  {/* Projects Section */}
                  {resume.projects && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title border-bottom border-primary pb-2">
                        <i className="bi bi-code-square me-2"></i>Projects
                      </h3>
                      <div className="section-content">
                        <p className="small">{resume.projects}</p>
                      </div>
                    </div>
                  )}

                  {/* Achievements Section */}
                  {resume.achievements && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title border-bottom border-primary pb-2">
                        <i className="bi bi-trophy me-2"></i>Achievements
                      </h3>
                      <div className="section-content">
                        <p className="small">{resume.achievements}</p>
                      </div>
                    </div>
                  )}

                  {/* Interests Section */}
                  {resume.interests && (
                    <div className="resume-section mb-4">
                      <h3 className="section-title border-bottom border-primary pb-2">
                        <i className="bi bi-heart-fill me-2"></i>Interests
                      </h3>
                      <div className="section-content">
                        <p className="small">{resume.interests}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button 
              className="btn btn-primary"
              onClick={() => window.print()}
            >
              <i className="bi bi-printer-fill me-2"></i>Print Resume
            </button>
            <Link 
              to="/saved-resumes" 
              className="btn btn-secondary"
            >
              <i className="bi bi-arrow-left me-2"></i>Back to Resumes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeTemplate;