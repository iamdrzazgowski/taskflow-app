import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            try {
                setIsLoading(true);
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (session?.user) {
                    setUser(session.user);
                    await fetchUserData(session.user.id);
                } else {
                    setUser(null);
                    setProfile(null);
                }
            } catch (error) {
                console.error('Nieoczekiwany błąd w getSession:', error);
                setUser(null);
                setProfile(null);
            } finally {
                setIsLoading(false);
            }
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                const newUserId = session?.user?.id;

                setUser(session?.user || null);

                if (newUserId) {
                    fetchUserData(newUserId);
                } else {
                    setProfile(null);
                }
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (error && !data) {
                console.error(
                    'Błąd przy pobieraniu danych użytkownika:',
                    error
                );
                setProfile(null);
            } else {
                setProfile(data);
            }
        } catch (error) {
            console.error('Błąd przy pobieraniu danych użytkownika:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                profile,
                setProfile,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
