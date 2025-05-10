
import  { useState, useEffect } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDoctors } from '../api/doctorApi';
import DoctorCard from '../components/DoctorCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

const SpecialitiesPage = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    rating: '',
    speciality: speciality || '',
    consultationFee: ''
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1
  });

  // Initialize filters when speciality param changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      speciality: speciality || ''
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [speciality]);

  // Fetch doctors when filters or page changes
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
  }, [filters, pagination.page, pagination.limit]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
    navigate(`/specialties/${newFilters.speciality || 'all'}, { replace: true }`);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle doctor click
  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <div className="specialties-page">
      <div className="page-header">
        <h1>{filters.speciality ? `${filters.speciality} Doctors` : 'All Doctors'}</h1>
        <p>Find and book appointments with the best specialists</p>
      </div>

      <div className="page-content">
        <aside className="filters-section">
          <Filters 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />
        </aside>

        <main className="doctors-list">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">
              <p>Failed to load doctors. {error}</p>
              <button className="retry-btn" onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          ) : doctors.length === 0 ? (
            <div className="no-results">
              <p>No doctors found matching your criteria</p>
              <button 
                className="clear-btn" 
                onClick={() => handleFilterChange({
                  location: '',
                  experience: '',
                  rating: '',
                  speciality: '',
                  consultationFee: ''
                })}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="results-info">
                <p>Showing {doctors.length} of {pagination.total} doctors</p>
                <div className="sort-options">
                  <span>Sort by:</span>
                  <select 
                    className="sort-option" 
                    value={filters.sortBy || 'rating'}
                    onChange={(e) => handleFilterChange({
                      ...filters, 
                      sortBy: e.target.value
                    })}
                  >
                    <option value="rating">Rating</option>
                    <option value="experience">Experience</option>
                    <option value="consultationFee">Consultation Fee</option>
                  </select>
                </div>
              </div>

              <div className="doctors-grid">
                {doctors.map(doctor => (
                  <div 
                    key={doctor._id} 
                    className="doctor-card-wrapper"
                    onClick={() => handleDoctorClick(doctor._id)}
                  >
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SpecialitiesPage;
