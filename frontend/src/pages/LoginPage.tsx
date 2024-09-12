import { Login } from '../components';
import style from './LoginPage.module.css';

const LoginPage = () => {
    return (
        <div className={style.Container}>
            <Login />
        </div>
    );
};

export { LoginPage };
