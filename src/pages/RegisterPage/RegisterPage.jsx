import { Link } from 'react-router';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import style from './RegisterPage.module.css';

export default function RegisterPage() {
    return (
        <div className={style.container}>
            <section className={style.formContainer}>
                <h1 className={style.headerText}>Sign up</h1>
                <RegisterForm />
                <p className={style.accountLoginText}>
                    Already have an account? <Link to='/login'>Sign in</Link>
                </p>
            </section>
        </div>
    );
}
