import { Login } from '../components/AuthContainer'
import style from './LoginPage.module.css'

const LoginPage = () => {
    return (
        <div className={style.Container}>
            <Login />
        </div>
    )
}

export { LoginPage }
