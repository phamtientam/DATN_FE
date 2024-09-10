// src/services/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Thay đổi URL này thành URL của backend của bạn
  headers: {
    'Content-Type': 'application/json',
    // Thêm các header khác nếu cần
  }
});

export const getData = (endpoint, params) => {
  return apiClient.get(endpoint, { params });
};

export const postData = (endpoint, data) => {
  return apiClient.post(endpoint, data);
};

// Thêm các hàm API khác nếu cần
