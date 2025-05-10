import React, { useState } from 'react'
import {  createDoctor } from '../api/doctorApi';
import { useNavigate } from 'react-router-dom';
const AddDoctorForm = () => {
  const[formData,setFormData]=useState({
    name:'',speciality:'',experience:'',location:'',price:'',imageUrl:'',about:'',rating:''
  })
  const navigate=useNavigate()
  
  function changeHandler(event) {
  if (event.target.type === 'file') {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.files[0],
    }));
  } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }
}

async function submitHandler(event) {
  event.preventDefault();
  try {
    const response = await createDoctor(formData);
    console.log(response);
    setFormData({
      name: '',
      speciality: '',
      experience: '',
      location: '',
      price: '',
      imageFile: '',
      about: '',
      rating:''
    });
  } catch (error) {
    console.error(error);
  }
  navigate('/specialties/general-physician')
}



  return (
    <div className='form-container'>
      <h2>Add New Doctor</h2>
      <form onSubmit={submitHandler} className='doctor-form'>
        <div className='form-group'> 
          <label htmlFor="name">Full Name:</label>
          <input type="text" id='name' name="name" onChange={changeHandler} value={formData.name}/>
        </div>
        <div className='form-group'>
          <label htmlFor="speciality">Enter Speciality:</label>
          <input type="text" id='speciality' name="speciality" onChange={changeHandler} value={formData.speciality}/>
        </div>
        <div className='form-group'>
          <label htmlFor="experience">Enter Experience:</label>
          <input type="text" id='experience' name="experience" onChange={changeHandler} value={formData.experience}/>
        </div>
        <div className='form-group'>
          <label htmlFor="location">Enter Location:</label>
          <input type="text" id='location' name="location" onChange={changeHandler} value={formData.location}/>
        </div>
        <div className='form-group'>
          <label htmlFor="price">Enter Price:</label>
          <input type="text" id='price' name="price" onChange={changeHandler} value={formData.price}/>
        </div>
        <div className='form-group'>
          <label htmlFor="imageUrl">Enter ImageUrl:</label>
          <input type="file" id='imageUrl' name="imageFile" onChange={changeHandler}/>
        </div>
        <div className='form-group'>
          <label htmlFor="about">About:</label>
          <input type="text" id='about' name="about" onChange={changeHandler} value={formData.about}/>
        </div>
        <div className='form-group'>
          <label htmlFor="rating">Rating:</label>
          <input type="text" id='rating' name="rating" onChange={changeHandler} value={formData.rating}/>
        </div>
        <button className='submit-btn'>Save</button>
      </form>
    </div>
  )
}

export default AddDoctorForm
