import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Edit2, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './Profile.css';

const Profile = () => {
    const { user, updateProfile, loading } = useAuth();
    const { success, error } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await updateProfile(formData);
            success('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            error(err.message || 'Failed to update profile');
        }
    };

    if (loading && !user) {
        return <LoadingSpinner fullPage text="Loading profile..." />;
    }

    return (
        <div className="profile-page">
            <div className="container container-sm">
                <motion.div
                    className="profile-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="profile-avatar">
                        <User size={48} />
                    </div>
                    <h1>{user?.name}</h1>
                    <p>{user?.email}</p>
                </motion.div>

                <motion.div
                    className="profile-content card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="profile-section-header">
                        <h2>Personal Information</h2>
                        {!isEditing ? (
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit2 size={16} />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="edit-actions">
                                <button
                                    className="btn btn-outline btn-sm"
                                    onClick={() => {
                                        setIsEditing(false);
                                        // Reset form
                                        setFormData({
                                            name: user.name || '',
                                            email: user.email || '',
                                            phone: user.phone || '',
                                            address: user.address || ''
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    <Save size={16} />
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="profile-fields">
                        <div className="field-group">
                            <label className="field-label">
                                <User size={18} />
                                Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="field-value">{user?.name || 'Not provided'}</p>
                            )}
                        </div>

                        <div className="field-group">
                            <label className="field-label">
                                <Mail size={18} />
                                Email Address
                            </label>
                            <p className="field-value">{user?.email}</p>
                            <span className="field-note">Email cannot be changed</span>
                        </div>

                        <div className="field-group">
                            <label className="field-label">
                                <MapPin size={18} />
                                Phone Number
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />
                            ) : (
                                <p className="field-value">{user?.phone || 'Not provided'}</p>
                            )}
                        </div>

                        <div className="field-group">
                            <label className="field-label">
                                <MapPin size={18} />
                                Address
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="address"
                                    className="form-textarea"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your address"
                                />
                            ) : (
                                <p className="field-value">{user?.address || 'Not provided'}</p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
