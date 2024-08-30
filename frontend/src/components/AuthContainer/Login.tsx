import style from './Login.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { ILogin } from '../../interfaces'
import { joiResolver } from '@hookform/resolvers/joi'
import { loginValidator } from '../../validators'

const Login = () => {
    const [checkPassword, setCheckPassword] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>({
        mode: 'onBlur',
        resolver: joiResolver(loginValidator),
    })

    const handleLogin: SubmitHandler<ILogin> = async (value) => {
        console.log(value)
        let deviceId = localStorage.getItem('deviceId')
        if (!deviceId) {
            deviceId = uuidv4()
            localStorage.setItem('deviceId', deviceId)
        }
        console.log(deviceId)
    }
    return (
        <div
            className={
                'd-flex justify-content-center align-items-center min-vh-100'
            }
        >
            <div className={`p-4 ${style.LoginCard}`}>
                <h3 className={`text-lg-start text-white mb-4`}>
                    Login
                    <hr />
                </h3>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className={`form-control ${style.Input}`}
                            placeholder="Email"
                            required
                            {...register('email')}
                        />
                        {errors.email && (
                            <div className="form-text top-0">
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    <div className={`mb-3 ${style.PasswordContainer}`}>
                        <input
                            type={checkPassword ? 'text' : 'password'}
                            className={`form-control ${style.Input}`}
                            placeholder="Password"
                            required
                            {...register('password')}
                        />
                        <span onClick={() => setCheckPassword(!checkPassword)}>
                            <FontAwesomeIcon
                                icon={checkPassword ? faEye : faEyeSlash}
                            />
                        </span>
                        {errors.password && (
                            <div className="form-text">
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <button type="submit" className={`btn ${style.Button}`}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export { Login }
