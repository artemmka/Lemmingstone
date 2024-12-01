import React from 'react';
import { IBasePage, PAGES } from '../PageManager';


import './MainPage.scss';

const MainPage: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} = props;

    const accountonClickHandle = () => setPage(PAGES.ACCOUNT);
    const loginonClickHandle = () => setPage(PAGES.LOGIN);
    const settingsonClickHandle = () => setPage(PAGES.SETTINGS);



    return (
        <div className='mainPage'>
            <div className='mainPage-img'></div>
            
            <div className='mainPage-buttons'>
                <button className='mainPage-b1' id='test-main_page-button-auth' onClick={loginonClickHandle}> Авторизация </button>
                <button className='mainPage-b2' id='test-main_page-button-registration' onClick={accountonClickHandle}> Регистрация </button>
                <button className='mainPage-b3' id='test-main_page-button-settings' onClick={settingsonClickHandle}> Настройки </button>
            </div>



        </div>
    )

}

export default MainPage;