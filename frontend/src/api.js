import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

const authHeader = () => {
  const token = localStorage.getItem('travouge_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function loginUser(credentials) {
  const response = await api.post('/auth/login', credentials);
  return response.data;
}

export async function fetchPackages() {
  const response = await api.get('/packages');
  return response.data;
}

export async function fetchPackageById(id) {
  const response = await api.get(`/packages/${id}`);
  return response.data;
}

export async function createPackage(formData) {
  const response = await api.post('/packages', formData, {
    headers: {
      ...authHeader(),
    },
  });
  return response.data;
}

export async function updatePackage(id, formData) {
  const response = await api.put(`/packages/${id}`, formData, {
    headers: {
      ...authHeader(),
    },
  });
  return response.data;
}

export async function deletePackage(id) {
  const response = await api.delete(`/packages/${id}`, { headers: authHeader() });
  return response.data;
}

export async function fetchContent() {
  const response = await api.get('/content');
  return response.data;
}

export async function fetchContentByPage(page) {
  const response = await api.get(`/content/${page}`);
  return response.data;
}

export async function updateContent(page, contentData) {
  const response = await api.put(`/content/${page}`, contentData, { headers: authHeader() });
  return response.data;
}

export async function deleteContent(page) {
  const response = await api.delete(`/content/${page}`, { headers: authHeader() });
  return response.data;
}
