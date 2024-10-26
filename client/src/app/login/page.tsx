"use client";
import { FC, useState } from 'react';
import { supabase } from '../../../lib/SupabaseClient';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

const SignIn: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId, setShopId } = useUser();
    const router = useRouter();

    const fetchShopData = async (userId: string) => {
        try {
            console.log('🔍 Fetching shop data for user:', userId);

            const { data, error } = await supabase
                .from('Shops')
                .select('shop_id')
                .eq('user_id', userId)
                .single();

            if (error) {
                console.error('❌ Error fetching shop data:', error);
                throw error;
            }

            if (!data?.shop_id) {
                console.error('❌ No shop found for user:', userId);
                throw new Error('No shop found for this user');
            }

            console.log('✅ Shop data found:', data);
            return data.shop_id;
        } catch (error) {
            console.error('❌ Error in fetchShopData:', error);
            throw error;
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('🔑 Starting sign in process...');
        console.log('📧 Attempting login for email:', email);

        setIsLoading(true);
        setError('');

        try {
            // 1. Authenticate user
            console.log('🔒 Authenticating with Supabase...');
            const { data: authData, error: authError } = await supabase.auth
                .signInWithPassword({ email, password });

            if (authError) {
                console.error('❌ Authentication error:', authError);
                throw authError;
            }

            if (!authData?.user?.id) {
                console.error('❌ No user data received from authentication');
                throw new Error('No user data received');
            }

            const userId = authData.user.id;
            console.log('✅ Authentication successful. User ID:', userId);
            setUserId(userId);
            console.log('💾 User ID stored in context');

            // 2. Fetch shop data
            console.log('🏪 Fetching shop data...');
            const shopId = await fetchShopData(userId);
            setShopId(shopId);
            console.log('✅ Shop ID stored in context:', shopId);

            // 3. Redirect to dashboard
            console.log('🚀 Redirecting to dashboard...');
            router.push('/dashboard');

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign in';
            console.error('❌ Error during sign in:', errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
            console.log('🏁 Sign in process completed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-2xl font-bold text-black ml-3">VendorVibe</h1>
                </div>

                <p className="text-gray-400 text-center mb-4">Sign in to your account</p>

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
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;