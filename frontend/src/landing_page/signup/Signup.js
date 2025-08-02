import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storeTokens, storeUser } from '../../utils/authUtils';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
            const response = await fetch('http://localhost:3002/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store tokens and user data using utility functions
                storeTokens(data.data.tokens.accessToken, data.data.tokens.refreshToken);
                storeUser(data.data.user);
                
                // Show success message
                alert('Account created successfully! Welcome to Ferodha!');
                
                // Redirect to home page after successful signup
                navigate('/');
            } else {
                setApiError(data.message || 'Signup failed. Please try again.');
            }
            
        } catch (error) {
            console.error('Signup error:', error);
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
                                    <h2 className="fw-bold text-primary mb-2">Create Your Account</h2>
                                    <p className="text-muted">Join thousands of traders on Ferodha</p>
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

                                {/* Signup Form */}
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="firstName" className="form-label fw-semibold">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="Enter your first name"
                                            />
                                            {errors.firstName && (
                                                <div className="invalid-feedback">{errors.firstName}</div>
                                            )}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="lastName" className="form-label fw-semibold">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Enter your last name"
                                            />
                                            {errors.lastName && (
                                                <div className="invalid-feedback">{errors.lastName}</div>
                                            )}
                                        </div>
                                    </div>

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
                                        <label htmlFor="phone" className="form-label fw-semibold">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && (
                                            <div className="invalid-feedback">{errors.phone}</div>
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
                                            placeholder="Create a strong password"
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )}
                                        <div className="form-text">
                                            Password must be at least 8 characters long
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label fw-semibold">
                                            Confirm Password *
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                        />
                                        {errors.confirmPassword && (
                                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-check">
                                            <input
                                                className={`form-check-input ${errors.agreeToTerms ? 'is-invalid' : ''}`}
                                                type="checkbox"
                                                id="agreeToTerms"
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="agreeToTerms">
                                                I agree to the{' '}
                                                <Link to="/terms" className="text-primary text-decoration-none">
                                                    Terms of Service
                                                </Link>{' '}
                                                and{' '}
                                                <Link to="/privacy" className="text-primary text-decoration-none">
                                                    Privacy Policy
                                                </Link> *
                                            </label>
                                            {errors.agreeToTerms && (
                                                <div className="invalid-feedback d-block">{errors.agreeToTerms}</div>
                                            )}
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
                                                Creating Account...
                                            </>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="text-center my-4">
                                    <span className="text-muted">or</span>
                                </div>

                                {/* Social Signup Options */}
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

                                {/* Login Link */}
                                <div className="text-center mt-4">
                                    <p className="mb-0">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-primary text-decoration-none fw-semibold">
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="text-center mt-4">
                            <p className="text-muted small">
                                By creating an account, you agree to our{' '}
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

export default Signup;