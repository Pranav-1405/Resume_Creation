import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditResume() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    skills: '',
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/resumes/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error fetching resume:', error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/resumes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => navigate('/saved-resumes'))
      .catch((error) => console.error('Error updating resume:', error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Edit Resume</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Form fields similar to CreateResume */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other fields similarly */}
        <button type="submit" className="btn btn-primary w-100">
          Update Resume
        </button>
      </form>
    </div>
  );
}

export default EditResume;
