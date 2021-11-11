
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
  
export function showWarningMessage(message) {
  console.log('Displaying warning message: ' + message);
  // toast.error('⚠️ ' + message, {
  toast.warning(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function showInfoMessage(message) {
  console.log('Displaying info message: ' + message);
  // toast.error('⚠️ ' + message, {
  toast.info(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

