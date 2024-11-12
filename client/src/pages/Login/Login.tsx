import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
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
                setPage(PAGES.CHAT);
            }
        }
    }
    const backClickHandler = () => setPage(PAGES.MAINPAGE);

    return (<div className='login'>
        <div className='login-name'> Авторизация </div>
        <div className='login-wrapper'>
            <div className='login-inputs'>
                <div className='login-text1'> Введите логин </div>
                <input id='login' ref={loginRef} />
                <div className='login-text2'> Введите пароль </div>
                <input id='password' ref={passwordRef} type="password"/>
            </div>
            <div className='login-buttons'>
                <button id='b1' onClick={loginClickHandler}> Войти </button>
                <button id='b2' onClick={backClickHandler}> На главную </button>
            </div>
        </div>
    </div>)
}

export default Login;