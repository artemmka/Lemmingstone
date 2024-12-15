import React, { useRef, useContext } from 'react';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';

import './Registration.scss';

const Registration: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatedPasswordRef = useRef<HTMLInputElement>(null);

    const doRegistrationHandler = async () => {
        if (loginRef.current && passwordRef.current && repeatedPasswordRef && nameRef.current) {
            const login = loginRef.current.value;
            const password = passwordRef.current.value;
            const repeatedPassword = repeatedPasswordRef.current?.value;
            const name = nameRef.current.value
            if (repeatedPassword !== password || repeatedPassword.length < 8 || repeatedPassword.length > 21 || password.length < 8 || password.length > 21 || login.length < 6 || login.length > 17) {
            }
            if (login && password && name && await server.registration(login, password, name)) {
                setPage(PAGES.LOBBY);
            }
        }
    }
    const backClickHandler = () => setPage(PAGES.MAINPAGE);

    return (<div className='registration' id='page-account'>
        <h1> Регистрация </h1>
        <div className='registration-wapper'>
            <div className='registration-inputs'>
                <h1> Введите логин </h1>
                <input id='login' ref={loginRef} />
                <h6> *Логин должен быть не менее 6 и не более 15 символов. Используемые символы: латинские символы верхнего регистра (A-Z), латинские символы нижнего регистра (a-z), цифры (0-9).  </h6>
                <h1> Введите ник </h1>
                <input id='nick' ref={nameRef} />
                <h1> Введите пароль </h1>
                <input id='password' ref={passwordRef} type="password" />
                <h6> *Пароль должен быть не менее 8 и не более 20 символов. Используемые символы: латинские символы верхнего регистра (A-Z), латинские символы нижнего регистра (a-z), цифры (0-9).</h6>
                <h1> Повторите пароль </h1>
                <input id='newPassword' ref={repeatedPasswordRef} type="password" />

                <div className='registration-button1'>
                    <button id='account-registration-button' onClick={doRegistrationHandler}> Зарегистрироваться </button>
                </div>
            </div>

            <div className='registration-button2'>

                <button id='registration-button-to-the-main-page' onClick={backClickHandler}> На главную </button>

            </div>

        </div>
    </div>)
}


export default Registration;