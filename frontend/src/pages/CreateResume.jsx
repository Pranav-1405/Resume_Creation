import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateResume = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    skills: '',
    projects: '',
    certifications: '',
    languages: '',
    linkedin: '',
    github: '',
    achievements: '',
    interests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.phone) errors.phone = 'Phone is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setError('Please fill in all required fields correctly.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create resume');
      }

      const data = await response.json();
      navigate(`/resume/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Create Your Resume</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
        {/* Personal Information */}
        <div className="col-12">
          <h4 className="mb-3">Personal Information</h4>
        </div>
        
        <div className="col-md-6">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone *</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Professional Profiles */}
        <div className="col-12 mt-4">
          <h4 className="mb-3">Professional Profiles</h4>
        </div>

        <div className="col-md-6">
          <label className="form-label">LinkedIn Profile</label>
          <input
            type="url"
            className="form-control"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">GitHub Profile</label>
          <input
            type="url"
            className="form-control"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/yourusername"
          />
        </div>

        {/* Education & Experience */}
        <div className="col-12 mt-4">
          <h4 className="mb-3">Education & Experience</h4>
        </div>

        <div className="col-12">
          <label className="form-label">Education</label>
          <textarea
            className="form-control"
            name="education"
            value={formData.education}
            onChange={handleChange}
            rows="4"
            placeholder="Enter your educational background"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Experience</label>
          <textarea
            className="form-control"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows="4"
            placeholder="Enter your work experience"
          />
        </div>

        {/* Skills & Qualifications */}
        <div className="col-12 mt-4">
          <h4 className="mb-3">Skills & Qualifications</h4>
        </div>

        <div className="col-12">
          <label className="form-label">Skills</label>
          <textarea
            className="form-control"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows="3"
            placeholder="List your technical and soft skills"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Projects</label>
          <textarea
            className="form-control"
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            rows="3"
            placeholder="Describe your notable projects"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Certifications</label>
          <textarea
            className="form-control"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            rows="2"
            placeholder="List your certifications"
          />
        </div>

        {/* Additional Information */}
        <div className="col-12 mt-4">
          <h4 className="mb-3">Additional Information</h4>
        </div>

        <div className="col-md-6">
          <label className="form-label">Languages</label>
          <input
            type="text"
            className="form-control"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="Languages you know"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Achievements</label>
          <textarea
            className="form-control"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            rows="2"
            placeholder="List your achievements"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Interests</label>
          <textarea
            className="form-control"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            rows="2"
            placeholder="Your hobbies and interests"
          />
        </div>

        {/* Submit Button */}
        <div className="col-12 mt-4">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creating...
              </>
            ) : (
              'Create Resume'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateResume;
