import { useNavigate } from 'react-router';
import supabase from '../../utils/supabaseClient';
import { useAuth } from '../../contexts/AuthProvider';
import { useEffect } from 'react';

export default function DashboardPage() {
    const { user, loading, userData, setUserData } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate, loading]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (!error) {
            setUserData(null);
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
