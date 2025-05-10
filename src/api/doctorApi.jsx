
const API_BASE = 'http://localhost:3000/api/v1';

export const fetchDoctors = async (filters = {}, page = 1, limit = 10) => {
  const query = new URLSearchParams({
    ...filters,
    page,
    limit
  }).toString();

  const response = await fetch(`${API_BASE}/doctors/fetch?${query}`);
  if (!response.ok) throw new Error('Failed to fetch doctors');
  return await response.json();
};

export const createDoctor = async (doctorData) => {
  const response = await fetch(`${API_BASE}/doctor/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(doctorData)
  });
  if (!response.ok) throw new Error('Failed to add doctor');
  return await response.json();
};
