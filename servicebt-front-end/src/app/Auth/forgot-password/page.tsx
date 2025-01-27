"use client";
import { initiatePasswordReset, confirmPasswordReset } from '@/app/lib/apiClient';


const UnifiedPasswordResetPage = () => {
  const handleEmailSubmit = async (e) => {
    try {
      const data = await initiatePasswordReset(email);
      setResetToken(data.token);
      setStage('password');
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to send reset link');
    }
  };

  const handlePasswordReset = async (e) => {
    try {
      await confirmPasswordReset(resetToken, password);
      setStage('success');
    } catch (error) {
      setError(error.response?.data?.detail || 'Password reset failed');
    }
  };
};