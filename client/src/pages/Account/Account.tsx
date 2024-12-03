import React, {useRef} from 'react';
import { IBasePage, PAGES } from '../PageManager';


import './Account.scss';

const Account: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const loginRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const loginClickHandle = () => setPage(PAGES.CHAT);
    const backClickHandle = () => setPage(PAGES.MAINPAGE);


    return ( <div className='account' id='test-account-page'>
        <h1> Регистрация </h1>

        <div className='account' id='page-account'>
        <div className='account-wapper'>
        <div className='account-inputs'>
            <h1> Введите логин </h1>
            <input className='account-login1' id='login' ref={loginRef} />
            <h1> Введите ник </h1>
            <input id='nick' ref={nameRef}/>
            <h1> Введите пароль </h1>
            <input id='password' ref={passwordRef} type="password"/>
            <h1> Повторите пароль </h1>
            <input id='newPassword' ref={newPasswordRef} type="password"/>

            <div className='account-button1'>
                
            <button id='account-registrarion-button' onClick={loginClickHandle}> Зарегистрироваться </button>

            </div>
        </div>

        </div>

        <div className='account-button2'>

            <button id='registration-button-to-the-main-page' onClick={backClickHandle}> На главную </button>

        </div>
        </div>
    </div>)
}


export default Account;