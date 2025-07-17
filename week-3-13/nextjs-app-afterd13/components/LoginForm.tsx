'use client';
/***
 * https://github.com/wpcodevo/nextauth-nextjs13-prisma
 */
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';



export const LoginForm = ({ csrfToken }: { csrfToken: string | undefined }) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const { status } = useSession()

  React.useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl])


  const [loading, setLoading] = useState({
    accLoading: false,
    googleLoading: false,
    facebookLoading: false
  });
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');



  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading({
        ...loading,
        accLoading: true,
      });
      setFormValues({ email: 'john@mail.com', password: 'changeme' });

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        csrfToken,
        callbackUrl,
      });

      setLoading({
        ...loading,
        accLoading: false,
      });

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
    } catch (error: any) {
      setLoading({
        ...loading,
        accLoading: false,
      });
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLoginProvider = async (provider: string) => {
    try {
      setLoading({
        ...loading,
        googleLoading: provider === 'google',
        facebookLoading: provider === 'facebook'
      });
      const res = await signIn(provider, { redirect: false, callbackUrl });
      console.log('handleLoginProvider', res);
      //TODO: add new usser Account after then login Provider
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
    } catch (error: any) {
      setLoading({
        ...loading,
        googleLoading: false,
        facebookLoading: false
      });
      setError(error);
    }

  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded text-center">
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

      <h2 className="text-2xl font-semibold text-blue-800 mb-4">Login Form</h2>

      {error && (
        <p className="text-center bg-red-300 text-red-800 font-medium py-3 my-3 rounded">
          {error}
        </p>
      )}

      {/* Email Field */}
      <div className="mb-4 text-left">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-xs text-slate-500 mt-1">Email test: tungnt@softech.vn</p>
      </div>

      {/* Password Field */}
      <div className="mb-4 text-left">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          required
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-xs text-slate-500 mt-1">Password test: 123456789</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading.accLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading.accLoading ? 'Loading...' : 'Sign In'}
      </button>
    </form>

  );
};