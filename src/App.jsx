import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import DoctorsPage from './components/DoctorsPage';
import SpecialitiesPage from './components/Specialities';
import './App.css';
import Header from './components/Header';
import AddDoctorForm from './components/AddDoctorForm';

function App() {
  return (
    <Router>
      <div className="app">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:speciality" element={<DoctorsPage />} />
          <Route path="/specialties/:specialty" element={<SpecialitiesPage />} />
          <Route path="/addDoctor" element={<AddDoctorForm/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;