import React from 'react';
import { FaStar, FaRegClock, FaRupeeSign, FaMapMarkerAlt ,FaPhone,FaCalendar} from 'react-icons/fa';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      

    <div className="doctor-info-container">
      <div className="doctor-image-container">
        {doctor.imageUrl ? (
          <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
        ) : (
          <div className="doctor-image-placeholder">
            <span>{doctor.name.charAt(0)}</span>
          </div>
        )}
      </div>
        <div className='doctor-info'>
          <div className="doctor-header">
          <h3 className="doctor-name">{doctor.name}</h3>
          <div className="doctor-specialty">{doctor.speciality}</div>
        </div>

        <div className='doctor-bio'>
            <span>|| {doctor.about}</span>
        </div>

        <div className="doctor-experience">
            <FaRegClock className="icon" />
            <span>Experience: {doctor.experience}+ years</span>
        </div>
        
        <div className="doctor-location">
            <FaMapMarkerAlt className="icon" />
            <span>{doctor.location}</span>
        </div>

        <div className="doctor-meta">
          <div className="doctor-rating">
            <FaStar className="star-icon" />
            <span>{doctor.rating} ({doctor.reviewsCount || 0} reviews)</span>
        </div>
          
        </div>
    </div>

     </div>
     <div className="doctor-actions">
            <div className="consultation-fee">
              <FaRupeeSign />
              <span>{doctor.price} consultation fee</span>
            </div>
            <div className='book-btn-container'>
              <button className='call-btn'><FaPhone/> Call To Book</button>
              <button className="book-btn"><FaCalendar/> Book Appointment</button>
            </div>
          </div>
        
    </div>
  );
};

export default DoctorCard;
