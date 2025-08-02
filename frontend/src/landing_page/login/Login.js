import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storeTokens, storeUser } from '../../utils/authUtils';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setApiError('');
        
        try {
            const response = await fetch('http://localhost:3002/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store tokens and user data using utility functions
                storeTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken);
                storeUser(data.data.user);
                
                // Show success message
                alert('Login successful! Welcome back to Ferodha!');
                
                // Redirect to home page
                navigate('/');
            } else {
                setApiError(data.message || 'Login failed. Please check your credentials.');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            setApiError('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-lg border-0">
                            <div className="card-body p-5">
                                {/* Header */}
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
                                    <p className="text-muted">Sign in to your Ferodha account</p>
                                </div>

                                {/* API Error Display */}
                                {apiError && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <i className="fa fa-exclamation-triangle me-2"></i>
                                        {apiError}
                                        <button 
                                            type="button" 
                                            className="btn-close" 
                                            onClick={() => setApiError('')}
                                        ></button>
                                    </div>
                                )}

                                {/* Login Form */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-semibold">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email address"
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-semibold">
                                            Password *
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="rememberMe"
                                                />
                                                <label className="form-check-label" htmlFor="rememberMe">
                                                    Remember me
                                                </label>
                                            </div>
                                            <Link to="/forgot-password" className="text-primary text-decoration-none">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-3 fw-semibold"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Signing In...
                                            </>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="text-center my-4">
                                    <span className="text-muted">or</span>
                                </div>

                                {/* Social Login Options */}
                                <div className="d-grid gap-2">
                                    <button className="btn btn-outline-secondary py-2">
                                        <i className="fa fa-google me-2"></i>
                                        Continue with Google
                                    </button>
                                    <button className="btn btn-outline-secondary py-2">
                                        <i className="fa fa-facebook me-2"></i>
                                        Continue with Facebook
                                    </button>
                                </div>

                                {/* Signup Link */}
                                <div className="text-center mt-4">
                                    <p className="mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/signup" className="text-primary text-decoration-none fw-semibold">
                                            Sign up here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="text-center mt-4">
                            <p className="text-muted small">
                                By signing in, you agree to our{' '}
                                <Link to="/terms" className="text-decoration-none">Terms of Service</Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login; 