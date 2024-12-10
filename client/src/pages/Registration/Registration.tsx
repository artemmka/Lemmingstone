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
            if (repeatedPassword != password) {
            }
            if (login && password && name && await server.registration(login, password, name)) {
                setPage(PAGES.CHAT);
            }
        }
    }
    const backClickHandler = () => setPage(PAGES.MAINPAGE);

    return (<div className='account' id='page-account'>
        <h1> Регистрация </h1>
        <div className='account-wapper'>
            <div className='account-inputs'>
                <h1> Введите логин </h1>
                <input id='login' ref={loginRef} />
                <h1> Введите ник </h1>
                <input id='nick' ref={nameRef} />
                <h1> Введите пароль </h1>
                <input id='password' ref={passwordRef} type="password" />
                <h1> Повторите пароль </h1>
                <input id='newPassword' ref={repeatedPasswordRef} type="password" />

                <div className='account-button1'>
                    <button id='account-registration-button' onClick={doRegistrationHandler}> Зарегистрироваться </button>
                </div>
            </div>

            <div className='account-button2'>

                <button id='registration-button-to-the-main-page' onClick={backClickHandler}> На главную </button>

            </div>

        </div>
    </div>)
}


export default Registration;