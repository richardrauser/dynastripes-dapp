
import { toast } from 'react-toastify';

export function showErrorMessage(message) {
    console.log('Displaying error message: ' + message);
    // toast.error('⚠️ ' + message, {
    toast.error(message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  
