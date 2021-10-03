import axios from 'axios';
import { showAlert } from './alert';
export const updateSettings = async (data, type) => {
  try {
    const url = type === 'password' ? 'update-password' : 'update-self';
    const res = await axios(`/api/v1/users/${url}`, {
      method: 'PUT',
      withCredentials: true,
      credentials: 'include',
      data: data,
    });
    if (res.data.status == 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
