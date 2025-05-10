
import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ 
      ...filters, 
      [name]: value 
    });
  };

  return (
    <div className="filter-container">
      <h2 className="filter-head">Filters</h2>
      
      <div className="filter-option">
        <div className='option-field'>
          <label>Speciality</label>
          <select
            name="speciality"
            value={filters.speciality || ''}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="">All Specialities</option>
            <option value="general-physician">General Physician</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="dermatologist">Dermatologist</option>
          </select>
        </div>
        
        <div className='option-field'>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={filters.location || ''}
            onChange={handleInputChange}
            placeholder="City or area"
            className="input-field"
          />
        </div>
        
        <div className='option-field'>
          <label>Experience</label>
          <select
            name="experience"
            value={filters.experience || ''}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="">Any experience</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
            <option value="15">15+ years</option>
          </select>
        </div>
        
        <div className='option-field'>
          <label>Rating</label>
          <select
            name="rating"
            value={filters.rating || ''}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="">Any rating</option>
            <option value="4">4+ stars</option>
            <option value="4.5">4.5+ stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;

