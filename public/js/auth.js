import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios('/api/v1/users/login', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      // document.cookie = `jwt=${res.data.token}; secure;samesite =none;`;
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const register = async (email, name, password, passwordConfirm) => {
  try {
    const res = await axios('/api/v1/users/signup', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      // document.cookie = `jwt=${res.data.token}; secure;samesite =none;`;
      showAlert('success', 'Register in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
