import React from 'react'; 
import { IBasePage, PAGES } from '../PageManager';
import './MainPage.css';

const MainPage: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} = props;

    const authClickHandler = () => setPage(PAGES.ACCOUNT);
    const registClickHandler = () => setPage(PAGES.RECORD);
    const settingClickHandler = () => setPage(PAGES.SETTINGS);

    return (<div className='mainPage'>
        <div className='main-Page'>
        </div>

       <div className='main-wrapper'>
            <div className='main-buttons'>
                
                <button className='b-1' onClick={authClickHandler}> Авторизация </button>
                <button className='b-2' onClick={registClickHandler}> Регистрация </button>
                <button className='b-3' onClick={settingClickHandler}> Настройки </button>
                
            </div>
       </div>

    </div>)
}

export default MainPage;