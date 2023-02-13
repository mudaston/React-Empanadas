import axios from 'axios'

export const axiosWorker = axios.create({
  baseURL: 'https://react-empanadas-4a06wown3-mudaston.vercel.app/',
  timeout: 10000,
})
