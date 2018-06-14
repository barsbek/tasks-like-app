import axios from 'axios';

const baseURL = 'http://localhost:9292';

export default axios.create({
  baseURL,
  timeout: 10000
});
