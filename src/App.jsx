import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    quantity: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [inquiries, setInquiries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Please enter a valid name (at least 3 characters).';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.product) {
      newErrors.product = 'Please select a product category.';
    }

    const qty = parseInt(formData.quantity);
    if (isNaN(qty) || qty < 1 || qty > 10) {
      newErrors.quantity = 'Please enter a quantity between 1 and 10.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (validateForm()) {
      const newEntry = {
        id: Date.now(),
        ...formData
      };

      setInquiries([...inquiries, newEntry]);
      setSuccessMessage('Inquiry submitted and validated successfully!');
      setFormData({ name: '', email: '', product: '', quantity: '' });
      setErrors({});

      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold text-dark">React Craft Inquiry Portal</h2>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Submit Inquiry</h4>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Select Craft Type</label>
                <select
                  className={`form-select ${errors.product ? 'is-invalid' : ''}`}
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="Terracotta Vase">Terracotta Vase</option>
                  <option value="Handloom Cotton Throw">Handloom Cotton Throw</option>
                  <option value="Bamboo Basket">Bamboo Basket</option>
                </select>
                {errors.product && <div className="invalid-feedback">{errors.product}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  max="10"
                />
                {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
              </div>

              <button type="submit" className="btn btn-dark w-100">Submit Inquiry</button>
              {successMessage && <div className="alert alert-success mt-3 text-center py-2 mb-0">{successMessage}</div>}
            </form>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Stored React State Records</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Product</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">No records added yet.</td>
                    </tr>
                  ) : (
                    inquiries.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.product}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;