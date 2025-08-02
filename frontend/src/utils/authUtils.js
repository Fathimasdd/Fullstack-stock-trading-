// JWT Token Management Utilities

// Store tokens in localStorage
export const storeTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

// Get access token from localStorage
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

// Get refresh token from localStorage
export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

// Remove tokens from localStorage
export const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = getAccessToken();
    return !!token;
};

// Get user data from localStorage
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Store user data in localStorage
export const storeUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

// Refresh access token using refresh token
export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch('http://localhost:3002/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken })
        });

        const data = await response.json();

        if (response.ok) {
            storeTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken);
            return data.data.tokens.accessToken;
        } else {
            throw new Error(data.message || 'Token refresh failed');
        }
    } catch (error) {
        console.error('Token refresh error:', error);
        removeTokens();
        throw error;
    }
};

// Create authenticated fetch function
export const authenticatedFetch = async (url, options = {}) => {
    let accessToken = getAccessToken();

    // If no access token, try to refresh
    if (!accessToken) {
        try {
            accessToken = await refreshAccessToken();
        } catch (error) {
            // Redirect to login if refresh fails
            window.location.href = '/login';
            throw error;
        }
    }

    // Add authorization header
    const authOptions = {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(url, authOptions);

        // If token is expired, try to refresh and retry
        if (response.status === 401) {
            try {
                const newAccessToken = await refreshAccessToken();
                authOptions.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return await fetch(url, authOptions);
            } catch (refreshError) {
                removeTokens();
                window.location.href = '/login';
                throw refreshError;
            }
        }

        return response;
    } catch (error) {
        console.error('Authenticated fetch error:', error);
        throw error;
    }
};

// Logout function
export const logout = () => {
    removeTokens();
    window.location.href = '/';
}; 