import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';

import './Login.scss';

const Login: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginClickHandler = async () => {
        if (loginRef.current && passwordRef.current) {
            const login = loginRef.current.value;
            const password = passwordRef.current.value;
            //if (1) { // тестовое условие, чтобы логин всегда был успешный и работал без бекенда
            if (login && password && await server.login(login, password)) {
                setPage(PAGES.LOBBY);
            }
        }
    }
    const backClickHandler = () => setPage(PAGES.MAINPAGE);

    return (<div className='login' id='page-login-auth'>
        <h1> Авторизация </h1>
        <div className='login-wrapper'>
            <div className='login-inputs'>
                <h1> Введите   логин </h1>
                <input id='login' ref={loginRef} />
                <h1> Введите пароль </h1>
                <input  id='password' ref={passwordRef} type="password"/>
            </div>
            <div className='login-button1'>
                <button id='b1' onClick={loginClickHandler}> Войти </button>
            </div>
        </div>
        <div className='login-button2'>
            <button  id='b2' onClick={backClickHandler}> На главную </button>
        </div>
    </div>)
}

export default Login;