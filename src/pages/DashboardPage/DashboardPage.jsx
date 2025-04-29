import { useNavigate } from 'react-router';
import supabase from '../../utils/supabaseClient';
import { useAuth } from '../../contexts/AuthProvider';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const [userData, setUserData] = useState(null);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate, loading]);

    useEffect(() => {
        if (!user?.id) return;

        const fetchUserData = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user?.id)
                .single();

            if (error) {
                console.error(
                    'Błąd przy pobieraniu danych użytkownika:',
                    error
                );
            } else {
                setUserData(data);
            }
        };

        fetchUserData();
    }, [user]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (!error) {
            navigate('/login');
        }
    };

    return (
        <div>
            <h1>
                {userData?.first_name} {userData?.last_name}
            </h1>
            <button onClick={handleLogout}>XD</button>
        </div>
    );
}
