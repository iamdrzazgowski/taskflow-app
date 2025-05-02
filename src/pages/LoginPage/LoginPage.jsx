import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../contexts/AuthProvider';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useEffect } from 'react';

export default function LoginPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loading) navigate('/app');
    }, [navigate, user, loading]);

    if (loading) return <div>Loading...</div>;

    if (user) return null;

    return (
        <div>
            <h2>Logowanie</h2>
            <LoginForm />
            <p>
                Don't have an account? <Link to='/register'>Sign up</Link>
            </p>
        </div>
    );
}
