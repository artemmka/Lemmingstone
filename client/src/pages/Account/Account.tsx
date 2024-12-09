import React, { useRef, useContext } from 'react';
import { ServerContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';

import './Account.scss';

const Account: React.FC<IBasePage> = (props: IBasePage) => {
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
        <div className='account-name' > Регистрация </div>
        <div className='account-wapper'>
            <div className='account-inputs'>
                <div className='account-text1'> Введите логин </div>
                <input id='login' ref={loginRef} />
                <div className='account-nick'> Введите ник </div>
                <input id='nick' ref={nameRef} />
                <div className='account-number1'> Введите пароль </div>
                <input id='password' ref={passwordRef} type="password" />
                <div className='account-number2'> Повторите пароль </div>
                <input id='newPassword' ref={repeatedPasswordRef} type="password" />
            </div>

            <div className='account-buttons'>

                <button className='account-b1' id='account-registration-button' onClick={doRegistrationHandler}> Зарегистрироваться </button>
                <button className='account-b2' id='registration-button-to-the-main-page' onClick={backClickHandler}> На главную </button>

            </div>

        </div>
    </div>)
}


export default Account;