import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import supabase from '../utils/supabaseClient';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const lastUserIdRef = useRef(null);

    useEffect(() => {
        const getSession = async () => {
            try {
                setIsLoading(true);
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (session?.user) {
                    setUser(session.user);
                    if (lastUserIdRef.current !== session.user.id) {
                        lastUserIdRef.current = session.user.id;
                        await fetchUserData(session.user.id);
                    }
                } else {
                    setUser(null);
                    setProfile(null);
                    lastUserIdRef.current = null;
                }
            } catch (error) {
                console.error('Nieoczekiwany błąd w getSession:', error);
                setUser(null);
                setProfile(null);
                lastUserIdRef.current = null;
            } finally {
                setIsLoading(false);
            }
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                const newUserId = session?.user?.id;

                if (newUserId !== lastUserIdRef.current) {
                    setUser(session?.user || null);

                    if (newUserId) {
                        lastUserIdRef.current = newUserId;
                        fetchUserData(newUserId);
                    } else {
                        setProfile(null);
                        lastUserIdRef.current = null;
                    }
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
