import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';


const  createApiClient =():AxiosInstance => {
   const apiClient = axios.create({
   baseURL:  'http://localhost:8086/api',
   timeout :10000,
   headers:{
    'Content-Type':'application/json'
   },
   });

    apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/signin';
      }
      return Promise.reject(error);
    }
  )

   return apiClient;

  }


  const apiClient = createApiClient()
  export default apiClient;