export const setItem = (key, value) => {
    try {
      if (!key || typeof key !== 'string') {
        throw new Error('Key must be a non-empty string.');
      }
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch {
      // console.error('Error setting item in local storage:', error.message);
    }
  };
  
  export const getItem = (key) => {
    try {
      if (!key || typeof key !== 'string') {
        throw new Error('Key must be a non-empty string.');
      }
      const value = localStorage.getItem(key);
      if (value === null) {
        return null;
      }
      return JSON.parse(value);
    } catch {
      return null;
    }
  };
  