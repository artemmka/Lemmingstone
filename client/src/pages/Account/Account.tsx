import React, { useRef } from 'react';
import { IBasePage, PAGES } from '../PageManager';

import './Account.scss';

const Account: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const newLoginRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const loginClickHandle = () => setPage(PAGES.GAME);
    const backClickHandle = () => setPage(PAGES.MAINPAGE);


    return (<div className='account' id='page-account'>
        <div className='account-name' > Регистрация </div>


        <div className='account-wapper'>
            <div className='account-inputs'>
                <div className='account-text1'> Введите логин </div>
                <input id='login' ref={loginRef} />
                <div className='account-nick'> Введите ник </div>
                <input id='nick' ref={passwordRef} />
                <div className='account-number1'> Введите пароль </div>
                <input id='password' ref={newLoginRef} type="password" />
                <div className='account-number2'> Повторите пароль </div>
                <input id='newPassword' ref={newPasswordRef} type="password" />
            </div>

            <div className='account-buttons'>

                <button className='account-b1' id='account-registration-button' onClick={loginClickHandle}> Зарегистрироваться </button>
                <button className='account-b2' id='registration-button-to-the-main-page' onClick={backClickHandle}> На главную </button>

            </div>

        </div>
    </div>)
}


export default Account;