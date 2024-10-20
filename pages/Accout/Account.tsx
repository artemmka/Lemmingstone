import React, {useRef} from 'react';
import { PAGES, IBasePage } from '../PageManager';
import './Account.css';

const Account: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} = props;
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef =useRef<HTMLInputElement>(null);

    const loginClickHandler = async () => {
        if (loginRef.current && passwordRef.current) {
            const login = loginRef.current.value;
            const password = passwordRef.current.value;
            if (1) { // тестовое условие, чтобы логин всегда был успешный и работал без бекенда
            //if (login && password && await server.login(login, password)) {
                setPage(PAGES.GAME);
            }
        }
    }
    const backClickHandler = () => setPage(PAGES.MAINPAGE);

    return (<div className='account'>
        <div className='accuont-name'> Авторизация </div>
        <div className='account-wrapper'>
            <div className='account-inputs'>
                <div className='text-login'> Введите логин </div>
                <input id='login' ref={loginRef}/>
                <div className='text-password'> Введите пароль </div>
                <input id='password' ref={passwordRef} type='password'/>
            </div>
            <div className='accout-button'>
                <button className='button-ac' onClick={loginClickHandler}> Войти </button>
                <button className='button-acBack' onClick={backClickHandler}> На главную </button>

            </div>
        </div>
    </div>)
};

export default Account;