"use client";
import { FC, useState, useEffect } from 'react';
import { supabase } from '../../../lib/SupabaseClient';
import { useRouter } from 'next/navigation';

const SignUp: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [preferredLanguage, setPreferredLanguage] = useState('English');
    const [shopName, setShopName] = useState('');
    const [shopType, setShopType] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isShopFormVisible, setIsShopFormVisible] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUserId(user?.id || null);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUserId(session?.user.id || null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) throw signUpError;

            const userId = data.user?.id;
            if (!userId) throw new Error('User ID not found after signup');

            const { error: insertError } = await supabase
                .from('Users')
                .insert([
                    {
                        user_id: userId,
                        email: email,
                        phone_number: phoneNumber,
                        preferred_language: preferredLanguage,
                    },
                ]);

            if (insertError) throw insertError;

            setCurrentUserId(userId);
            setIsShopFormVisible(true);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleShopSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!currentUserId) {
                throw new Error('No user ID found. Please ensure you are signed in.');
            }

            const { error: shopError } = await supabase
                .from('Shops')
                .insert([
                    {
                        user_id: currentUserId,
                        shop_name: shopName,
                        shop_type: shopType,
                        location: location,
                        address: address,
                    },
                ]);

            if (shopError) throw shopError;

            // Redirect to form page after successful shop creation
            router.push('/dashboard');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-2xl font-bold text-black ml-3">VendorVibe</h1>
                </div>

                <p className="text-gray-400 text-center mb-4">Sign up today for Supa stuff</p>

                {!isShopFormVisible ? (
                    <form onSubmit={handleSignUp}>
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
                            <label className="block text-black mb-1" htmlFor="password">
                                Password
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

                        <div className="mb-4">
                            <label className="block text-black mb-1" htmlFor="phone_number">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone_number"
                                className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-black mb-1" htmlFor="preferred_language">
                                Preferred Language
                            </label>
                            <select
                                id="preferred_language"
                                className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                                value={preferredLanguage}
                                onChange={(e) => setPreferredLanguage(e.target.value)}
                            >
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Marathi">Marathi</option>
                            </select>
                        </div>

                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Sign up'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleShopSubmit}>
                        <h2 className="text-xl font-bold mb-4">Shop Information</h2>

                        <div className="mb-4">
                            <label className="block text-black mb-1" htmlFor="shop_name">
                                Shop Name
                            </label>
                            <input
                                type="text"
                                id="shop_name"
                                className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-black mb-1" htmlFor="shop_type">
                                Shop Type
                            </label>
                            <input
                                type="text"
                                id="shop_type"
                                className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                                value={shopType}
                                onChange={(e) => setShopType(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-black mb-1" htmlFor="location">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-black mb-1" htmlFor="address">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                className="w-full px-4 py-2 bg-white text-black border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Creating shop...' : 'Create Shop'}
                        </button>
                    </form>
                )}

                <div className="text-center mt-4">
                    <a href="/signin" className="text-gray-400 hover:text-orange-400">
                        Already have an account? Sign in
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;