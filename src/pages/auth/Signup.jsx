import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Card from '../../components/ui/Card';
import { useAuthStore } from '../../stores/authStore';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  alternativePhone: z.string().optional(),
  userType: z.enum(['client', 'rep'], {
    required_error: 'Please select account type'
  }),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuthStore();

  const userTypeOptions = [
    { value: 'client', label: 'Client (I need meeting representation)' },
    { value: 'rep', label: 'Representative (I want to attend meetings)' }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: searchParams.get('type') || ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      await signup(data);
      navigate('/verify-phone');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <Card.Header>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Join Meetings4U today</p>
          </div>
        </Card.Header>

        <Card.Content>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <Select
              label="Account Type"
              required
              options={userTypeOptions}
              placeholder="Select account type"
              {...register('userType')}
              error={errors.userType?.message}
            />

            <Input
              label="Full Name"
              required
              {...register('name')}
              error={errors.name?.message}
            />

            <Input
              label="Email Address"
              type="email"
              required
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              required
              {...register('password')}
              error={errors.password?.message}
              helperText="Must be at least 8 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              required
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <Input
              label="Phone Number"
              type="tel"
              required
              placeholder="+27123456789"
              {...register('phone')}
              error={errors.phone?.message}
            />

            <Input
              label="Alternative Phone (Optional)"
              type="tel"
              placeholder="+27987654321"
              {...register('alternativePhone')}
              error={errors.alternativePhone?.message}
            />

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1"
                {...register('terms')}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Signup;