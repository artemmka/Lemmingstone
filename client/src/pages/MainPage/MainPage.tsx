import React from 'react';
import { IBasePage, PAGES } from '../PageManager';


import './MainPage.scss';

const MainPage: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} = props;

    const registrationClickHandle = () => setPage(PAGES.REGISTRATION);
    const loginonClickHandle = () => setPage(PAGES.LOGIN);



    return (
        <div className='mainPage'>
            <div className='mainPage-img'></div>
            
            <div className='mainPage-buttons'>
                <button className='mainPage-b1' id='test-main_page-button-auth' onClick={loginonClickHandle}> Авторизация </button>
                <button className='mainPage-b2' id='test-main_page-button-registration' onClick={registrationClickHandle}> Регистрация </button>
            </div>



        </div>
    )

}

export default MainPage;