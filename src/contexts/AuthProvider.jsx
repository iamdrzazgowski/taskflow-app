import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session?.user) {
                setUser(session.user);
                fetchUserData(session.user.id);
            } else {
                setUser(null);
            }

            setLoading(false);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user || null);

                if (session?.user) {
                    fetchUserData(session.user.id);
                } else {
                    setUserData(null);
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
                .single();

            if (error) {
                console.error(
                    'Błąd przy pobieraniu danych użytkownika:',
                    error
                );
            } else {
                setUserData(data);
            }
        } catch (error) {
            console.error('Błąd przy pobieraniu danych użytkownika:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, userData, setUserData }}>
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
