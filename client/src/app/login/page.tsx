"use client"
import { FC, useState } from 'react';
import { supabase } from '../../../lib/SupabaseClient';
import { useRouter } from 'next/navigation';


const SignIn: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
        } else {
            router.push('/dashboard'); // Redirect to a dashboard page or any other page after successful login
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Company Logo and Name */}
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-2xl font-bold text-black ml-3">VendorVibe</h1>
                </div>

                <p className="text-gray-400 text-center mb-4">Sign in today for Supa stuff</p>

                {/* Social Media Sign-In */}
                {/* <div className="flex justify-around mb-4">
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                        onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                    >
                        <img src="/google-icon.svg" alt="Google" className="h-6 w-6 inline" /> Google
                    </button>
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                        onClick={() => supabase.auth.signInWithOAuth({ provider: 'facebook' })}
                    >
                        <img src="/facebook-icon.svg" alt="Facebook" className="h-6 w-6 inline" /> Facebook
                    </button>
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                        onClick={() => supabase.auth.signInWithOAuth({ provider: 'twitter' })}
                    >
                        <img src="/twitter-icon.svg" alt="Twitter" className="h-6 w-6 inline" /> Twitter
                    </button>
                </div> */}

                {/* Form */}
                <form onSubmit={handleSignIn}>
                    <div className="mb-4">
                        <label className="block text-black mb-1" htmlFor="email">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1" htmlFor="password">
                            Your Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Sign in
                    </button>
                </form>

                {/* Forgot Password and Sign Up */}
                <div className="text-center mt-4">
                    <a href="#" className="text-gray-400 hover:text-orange-400">
                        Forgot your password?
                    </a>
                    <br />
                    <a href="#" className="text-gray-400 hover:text-orange-400">
                        Don&apos;t have an account? Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
