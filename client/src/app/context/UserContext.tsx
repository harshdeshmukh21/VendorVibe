"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
    userId: string | null;
    shopId: string | null;
    setUserId: (id: string | null) => void;
    setShopId: (id: string | null) => void;
    clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state from localStorage if available
    const [userId, setUserIdState] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            const savedUserId = localStorage.getItem('userId');
            console.log('📝 Initializing userId from localStorage:', savedUserId);
            return savedUserId;
        }
        return null;
    });

    const [shopId, setShopIdState] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            const savedShopId = localStorage.getItem('shopId');
            console.log('🏪 Initializing shopId from localStorage:', savedShopId);
            return savedShopId;
        }
        return null;
    });

    // Wrapper functions to update both state and localStorage
    const setUserId = (id: string | null) => {
        console.log('👤 Setting userId:', id);
        setUserIdState(id);
        if (id) {
            localStorage.setItem('userId', id);
        } else {
            localStorage.removeItem('userId');
        }
    };

    const setShopId = (id: string | null) => {
        console.log('🏬 Setting shopId:', id);
        setShopIdState(id);
        if (id) {
            localStorage.setItem('shopId', id);
        } else {
            localStorage.removeItem('shopId');
        }
    };

    // Function to clear all user data
    const clearUserData = () => {
        console.log('🧹 Clearing all user data');
        setUserId(null);
        setShopId(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('shopId');
    };

    // Log context state changes
    useEffect(() => {
        console.log('🔄 Context state updated:', { userId, shopId });
    }, [userId, shopId]);

    // Sync with localStorage on window focus
    useEffect(() => {
        const handleFocus = () => {
            const storedUserId = localStorage.getItem('userId');
            const storedShopId = localStorage.getItem('shopId');

            if (storedUserId !== userId) {
                console.log('♻️ Syncing userId from localStorage:', storedUserId);
                setUserIdState(storedUserId);
            }

            if (storedShopId !== shopId) {
                console.log('♻️ Syncing shopId from localStorage:', storedShopId);
                setShopIdState(storedShopId);
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [userId, shopId]);

    const value = {
        userId,
        shopId,
        setUserId,
        setShopId,
        clearUserData
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// Optional: Export a hook for checking if user is authenticated
export const useIsAuthenticated = () => {
    const { userId, shopId } = useUser();
    return Boolean(userId && shopId);
};