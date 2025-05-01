import { useEffect, useState } from "react";  // useEffect and useState: React hooks for side effects and state management
import { useParams, useNavigate, Link } from "react-router-dom";  // useParams: Gets URL parameters 
import jsPDF from "jspdf";  // jsPDF: Library for PDF generation

function ResumeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const lineHeight = 10;

    // Title
    doc.setFontSize(20);
    doc.text(resume.fullName, 105, yPos, { align: 'center' });
    yPos += lineHeight * 2;

    // Contact Information
    doc.setFontSize(12);
    doc.text(`Email: ${resume.email}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Phone: ${resume.phone}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`Address: ${resume.address}`, 20, yPos);
    yPos += lineHeight * 1.5;

    // Professional Profiles
    if (resume.linkedin || resume.github) {
      doc.setFontSize(16);
      doc.text('Professional Profiles', 20, yPos);
      yPos += lineHeight;
      doc.setFontSize(12);
      if (resume.linkedin) {
        doc.text(`LinkedIn: ${resume.linkedin}`, 20, yPos);
        yPos += lineHeight;
      }
      if (resume.github) {
        doc.text(`GitHub: ${resume.github}`, 20, yPos);
        yPos += lineHeight;
      }
      yPos += lineHeight * 0.5;
    }

    // Main Sections
    const addSection = (title, content) => {
      if (content) {
        doc.setFontSize(16);
        doc.text(title, 20, yPos);
        yPos += lineHeight;
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(content, 170);
        doc.text(lines, 20, yPos);
        yPos += (lines.length * lineHeight) + (lineHeight * 0.5);

        // Add new page if needed
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }
      }
    };

    addSection('Education', resume.education);
    addSection('Experience', resume.experience);
    addSection('Skills', resume.skills);
    addSection('Projects', resume.projects);
    addSection('Certifications', resume.certifications);
    addSection('Languages', resume.languages);
    addSection('Achievements', resume.achievements);
    addSection('Interests', resume.interests);

    doc.save(`${resume.fullName}_Resume.pdf`);
  };

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
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center py-3">
              <h2 className="mb-0">{resume.fullName}</h2>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-4">
                  <p><strong><i className="bi bi-envelope"></i> Email:</strong><br/>{resume.email}</p>
                </div>
                <div className="col-md-4">
                  <p><strong><i className="bi bi-telephone"></i> Phone:</strong><br/>{resume.phone}</p>
                </div>
                <div className="col-md-4">
                  <p><strong><i className="bi bi-geo-alt"></i> Address:</strong><br/>{resume.address}</p>
                </div>
              </div>

              {(resume.linkedin || resume.github) && (
                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Professional Profiles</h4>
                  <div className="row">
                    {resume.linkedin && (
                      <div className="col-md-6">
                        <p>
                          <i className="bi bi-linkedin"></i>
                          <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="ms-2">
                            LinkedIn Profile
                          </a>
                        </p>
                      </div>
                    )}
                    {resume.github && (
                      <div className="col-md-6">
                        <p>
                          <i className="bi bi-github"></i>
                          <a href={resume.github} target="_blank" rel="noopener noreferrer" className="ms-2">
                            GitHub Profile
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h4 className="border-bottom pb-2">Education</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{resume.education}</p>
              </div>

              <div className="mb-4">
                <h4 className="border-bottom pb-2">Experience</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{resume.experience}</p>
              </div>

              <div className="mb-4">
                <h4 className="border-bottom pb-2">Skills</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{resume.skills}</p>
              </div>

              {resume.projects && (
                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Projects</h4>
                  <p style={{ whiteSpace: 'pre-line' }}>{resume.projects}</p>
                </div>
              )}

              {resume.certifications && (
                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Certifications</h4>
                  <p style={{ whiteSpace: 'pre-line' }}>{resume.certifications}</p>
                </div>
              )}

              {resume.languages && (
                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Languages</h4>
                  <p>{resume.languages}</p>
                </div>
              )}

              {resume.achievements && (
                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Achievements</h4>
                  <p style={{ whiteSpace: 'pre-line' }}>{resume.achievements}</p>
                </div>
              )}

              {resume.interests && (
                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Interests</h4>
                  <p style={{ whiteSpace: 'pre-line' }}>{resume.interests}</p>
                </div>
              )}
            </div>

            <div className="card-footer bg-light d-flex justify-content-center gap-3 py-3">
              <button 
                className="btn btn-primary"
                onClick={downloadPDF}
              >
                <i className="bi bi-download me-2"></i>Download PDF
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
    </div>
  );
}

export default ResumeDetails;