import axios from 'axios';



export function callLogout() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('api/user/logout', config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}
