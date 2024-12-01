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
            <div className='mainPage-img' id='img'></div>
            
            <div className='mainPage-buttons'>
                <button className='mainPage-b1' id='b1' onClick={loginonClickHandle}> Авторизация </button>
                <button className='mainPage-b2' id='b2' onClick={accountonClickHandle}> Регистрация </button>
                
            </div>



        </div>
    )

}

export default MainPage;