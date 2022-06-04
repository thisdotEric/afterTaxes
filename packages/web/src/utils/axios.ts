import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.SNOWPACK_PUBLIC_AFTERTAXES_SERVER}`,
});

export default instance;
