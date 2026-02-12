// Centralized API configuration
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper function to build API endpoints
export const getApiUrl = (endpoint) => {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${API_URL}${cleanEndpoint}`;
};

export default API_URL;
