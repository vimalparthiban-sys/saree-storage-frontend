// API Client for Spring Boot Backend Integration
const BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Products
  getProducts: async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      if (!res.ok) throw new Error('Network response was not ok');
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, using fallback mock product data:', err.message);
      return null;
    }
  },

  // Orders
  createOrder: async (orderData) => {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, saved locally:', err.message);
      return null;
    }
  },

  // Auth
  login: async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  }
};

export default api;
