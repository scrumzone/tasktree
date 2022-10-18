import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json'
  }
});

export function authHeader(token: string | undefined): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}
