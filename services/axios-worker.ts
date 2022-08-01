import axios from 'axios'

export const axiosWorker = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 10000,
})
