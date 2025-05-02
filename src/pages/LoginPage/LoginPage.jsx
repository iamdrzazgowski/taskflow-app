import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../contexts/AuthProvider';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useEffect } from 'react';

import style from './LoginPage.module.css';

export default function LoginPage() {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !isLoading) navigate('/app');
    }, [navigate, user, isLoading]);

    if (user) return null;

    return (
        <div className={style.container}>
            <section className={style.formContainer}>
                <h1 className={style.headerText}>Sign in</h1>
                <LoginForm />
                <p className={style.accountCreateText}>
                    Don't have an account? <Link to='/register'>Sign up</Link>
                </p>
            </section>
        </div>
    );
}
