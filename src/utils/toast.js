import toast from 'react-hot-toast';

// Success toast
export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    style: {
      background: '#10b981',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

// Error toast
export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    style: {
      background: '#ef4444',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

// Info toast
export const showInfo = (message) => {
  toast(message, {
    duration: 3000,
    style: {
      background: '#3b82f6',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

// Warning toast
export const showWarning = (message) => {
  toast(message, {
    duration: 4000,
    style: {
      background: '#f59e0b',
      color: '#fff',
      fontWeight: '500',
    },
    icon: '⚠️',
  });
};

// Loading toast
export const showLoading = (message = 'Loading...') => {
  return toast.loading(message, {
    style: {
      background: '#6b7280',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

// Dismiss toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Custom toast with custom styling
export const showCustomToast = (message, type = 'default', options = {}) => {
  const defaultOptions = {
    duration: 4000,
    style: {
      background: '#363636',
      color: '#fff',
      fontWeight: '500',
      borderRadius: '8px',
      padding: '12px 16px',
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  switch (type) {
    case 'success':
      return toast.success(message, mergedOptions);
    case 'error':
      return toast.error(message, mergedOptions);
    case 'loading':
      return toast.loading(message, mergedOptions);
    default:
      return toast(message, mergedOptions);
  }
};

// API response toast helper
export const handleApiResponse = (response, successMessage = 'Operation successful') => {
  if (response.success) {
    showSuccess(successMessage);
    return true;
  } else {
    showError(response.message || 'Something went wrong');
    return false;
  }
};

// Form validation toast helper
export const showValidationError = (errors) => {
  if (typeof errors === 'string') {
    showError(errors);
  } else if (Array.isArray(errors)) {
    errors.forEach(error => showError(error));
  } else if (typeof errors === 'object') {
    Object.values(errors).forEach(error => {
      if (error) showError(error);
    });
  }
}; 