// src/pages/DoctorsPage/DoctorsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDoctors } from '../api/doctorApi';
import DoctorCard from '../components/DoctorCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
//import AddDoctorForm from '../components/AddDoctorForm';
//import './DoctorsPage.css';

const DoctorsPage = () => {
  const { speciality } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [showAddForm, setShowAddForm] = useState(false);
  
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    rating: '',
    speciality: speciality || ''
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  // Fetch doctors
  useEffect(() => {
    const getDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDoctors(filters, pagination.page, pagination.limit);
        setDoctors(data.doctors);
        setPagination(prev => ({
          ...prev,
          total: data.total,
          totalPages: Math.ceil(data.total / pagination.limit)
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, [filters, pagination.page]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  

  return (
    <div className="doctors-page">
      <h1>{speciality || 'All'} Doctors</h1>
      
      {/* <button 
        className="add-doctor-btn"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? 'Cancel' : 'Add New Doctor'}
      </button>

      {showAddForm && (
        <AddDoctorForm 
          onSubmit={handleAddDoctor} 
          specialties={['General Physician', 'Cardiologist', 'Dermatologist']} 
        />
      )} */}

      <div className="content-container">
        <Filters 
          filters={filters} 
          onChange={handleFilterChange} 
        />
        
        <div className="doctors-list">
          {loading ? (
            <div className="loading">Loading doctors...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : doctors.length === 0 ? (
            <div className="no-results">No doctors found matching your criteria</div>
          ) : (
            <>
              <div className="results-count">
                Showing {doctors.length} of {pagination.total} doctors
              </div>
              
              {doctors.map(doctor => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
              
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
