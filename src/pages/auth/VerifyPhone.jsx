import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useAuthStore } from '../../stores/authStore';

const verifySchema = z.object({
  phone: z.string().min(1, 'Please select a phone number'),
  method: z.enum(['sms', 'whatsapp'], {
    required_error: 'Please select verification method'
  })
});

const confirmSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits')
});

const VerifyPhone = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('select'); // 'select' | 'sent' | 'verified'
  const [selectedPhone, setSelectedPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user, verifyPhone, confirmPhoneVerification } = useAuthStore();

  const phoneOptions = [
    { value: user?.profile?.phone, label: `Primary: ${user?.profile?.phone}` }
  ];

  if (user?.profile?.alternativePhone) {
    phoneOptions.push({
      value: user.profile.alternativePhone,
      label: `Alternative: ${user.profile.alternativePhone}`
    });
  }

  const methodOptions = [
    { value: 'sms', label: 'SMS Text Message' },
    { value: 'whatsapp', label: 'WhatsApp Message' }
  ];

  const {
    register: registerVerify,
    handleSubmit: handleSubmitVerify,
    formState: { errors: verifyErrors }
  } = useForm({
    resolver: zodResolver(verifySchema)
  });

  const {
    register: registerConfirm,
    handleSubmit: handleSubmitConfirm,
    formState: { errors: confirmErrors }
  } = useForm({
    resolver: zodResolver(confirmSchema)
  });

  const handleSendCode = async (data) => {
    try {
      setError('');
      await verifyPhone(data.phone, data.method);
      setSelectedPhone(data.phone);
      setStep('sent');
      setSuccess(`Verification code sent to ${data.phone} via ${data.method.toUpperCase()}`);
    } catch (err) {
      setError(err.message || 'Failed to send verification code');
    }
  };

  const handleConfirmCode = async (data) => {
    try {
      setError('');
      await confirmPhoneVerification(selectedPhone, data.code);
      setStep('verified');
      setSuccess('Phone number verified successfully!');

      // Navigate to appropriate dashboard after 2 seconds
      setTimeout(() => {
        const redirectPath = user.type === 'client' ? '/client/dashboard' : '/rep/dashboard';
        navigate(redirectPath);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Invalid verification code');
    }
  };

  const handleSkip = () => {
    const redirectPath = user.type === 'client' ? '/client/dashboard' : '/rep/dashboard';
    navigate(redirectPath);
  };

  if (step === 'verified') {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <Card.Content className="text-center py-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Phone Verified!</h2>
            <p className="text-green-600 mb-4">{success}</p>
            <p className="text-gray-600">Redirecting to your dashboard...</p>
          </Card.Content>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <Card.Header>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Verify Phone Number</h2>
            <p className="text-gray-600 mt-2">
              {step === 'select'
                ? 'Choose which phone number to verify'
                : 'Enter the verification code sent to your phone'
              }
            </p>
          </div>
        </Card.Header>

        <Card.Content>
          {/* Phone verification status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Primary Phone:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{user?.profile?.phone}</span>
                  <Badge variant={user?.phone_verified ? 'success' : 'warning'} size="sm">
                    {user?.phone_verified ? 'Verified' : 'Not Verified'}
                  </Badge>
                </div>
              </div>
              {user?.profile?.alternativePhone && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Alternative Phone:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{user.profile.alternativePhone}</span>
                    <Badge variant="warning" size="sm">Not Verified</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-4">
              {error}
            </div>
          )}

          {success && step === 'sent' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm mb-4">
              {success}
            </div>
          )}

          {step === 'select' && (
            <form onSubmit={handleSubmitVerify(handleSendCode)} className="space-y-4">
              <Select
                label="Select Phone Number"
                required
                options={phoneOptions}
                placeholder="Choose phone to verify"
                {...registerVerify('phone')}
                error={verifyErrors.phone?.message}
              />

              <Select
                label="Verification Method"
                required
                options={methodOptions}
                placeholder="Choose verification method"
                {...registerVerify('method')}
                error={verifyErrors.method?.message}
              />

              <Button type="submit" className="w-full">
                Send Verification Code
              </Button>
            </form>
          )}

          {step === 'sent' && (
            <form onSubmit={handleSubmitConfirm(handleConfirmCode)} className="space-y-4">
              <Input
                label="Verification Code"
                placeholder="123456"
                maxLength={6}
                required
                {...registerConfirm('code')}
                error={confirmErrors.code?.message}
                helperText="Enter the 6-digit code sent to your phone"
              />

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep('select')}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Verify Code
                </Button>
              </div>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSendCode({ phone: selectedPhone, method: 'sms' })}
                >
                  Resend Code
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleSkip}
              className="text-sm"
            >
              Skip for now (Limited functionality)
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default VerifyPhone;