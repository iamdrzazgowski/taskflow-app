import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../contexts/AuthProvider';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useEffect } from 'react';

export default function LoginPage() {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !isLoading) navigate('/app');
    }, [navigate, user, isLoading]);

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
