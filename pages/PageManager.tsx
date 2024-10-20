import React, {useState} from 'react';
import MainPage from './MainPage/MainPage';
import Account from './Accout/Account';
import Record from './Record/Record';
import Settings from './Settings/Settings';
import GamePage from './Game/Game';

export enum PAGES {
    PRELOADER,
    MAINPAGE,
    GAME,
    SETTINGS,
    ACCOUNT,
    RECORD,
}

export interface IBasePage {
    setPage: (name: PAGES) => void
}

const PageManager: React.FC = () => {
    const [page, setPage] = useState<PAGES>(PAGES.MAINPAGE);

    return (<>
        {page === PAGES.MAINPAGE && <MainPage setPage={setPage}/>}
        {page === PAGES.ACCOUNT && <Account setPage={setPage}/>}
        {page == PAGES.RECORD && <Record setPage={setPage}/>}
        {page == PAGES.SETTINGS && <Settings setPage={setPage}/>}
        {page === PAGES.GAME && <GamePage setPage={setPage} />}
    </>)
};

export default PageManager;