"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import apiClient from '../../lib/apiClient';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post('/api/v1/users/reset-password-request/', {
        email: email.trim().toLowerCase(),
      });

      if (response.status !== 200) {
        throw new Error('Failed to send reset email');
      }

      setIsEmailSent(true);
      toast.success('Password reset link has been sent to your email');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ToastContainer position="top-right" theme="light" />

      <div className="w-full max-w-md">
        <Link 
          href="/login" 
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <Card className="w-full shadow-xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            {!isEmailSent ? (
              <p className="text-gray-500">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            ) : (
              <p className="text-gray-500">
                Check your email for the password reset link. The link will expire in 10 minutes.
              </p>
            )}
          </CardHeader>
          <CardContent>
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-orange-700 text-sm">
                    If the email address exists in our system, you'll receive a password reset link shortly.
                    Please also check your spam folder.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail('');
                  }}
                >
                  Send Another Reset Link
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center mt-6 text-sm text-gray-600">
          Remember your password?{' '}
          <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;