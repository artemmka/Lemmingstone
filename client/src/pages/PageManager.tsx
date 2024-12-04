import React, { useState } from 'react';

import Preloader from './Preloader/Preloader';
import Login from './Login/Login';
import Chat from './Chat/Chat';
import GamePage from './Game/Game';
import NotFound from './NotFound/NotFound';
import MainPage from './MainPage/MainPage';
import Account from './Account/Account';
import Settings from './Settings/Settings';
import Lobby from './Lobby/Lobby';


export enum PAGES {
    PRELOADER,
    MAINPAGE,
    ACCOUNT,
    SETTINGS,
    LOGIN,
    CHAT,
    GAME,
    NOT_FOUND,
    LOBBY
}

export interface IBasePage {
    setPage: (name: PAGES) => void
}

const PageManager: React.FC = () => {
    const [page, setPage] = useState<PAGES>(PAGES.PRELOADER);

    return (
        <>
            {page === PAGES.PRELOADER && <Preloader setPage={setPage} />}
            {page === PAGES.LOGIN && <Login setPage={setPage} />}
            {page === PAGES.CHAT && <Chat setPage={setPage} />}
            {page === PAGES.GAME && <GamePage setPage={setPage} />}
            {page === PAGES.NOT_FOUND && <NotFound setPage={setPage} />}
            {page === PAGES.MAINPAGE && <MainPage setPage={setPage} />}
            {page === PAGES.ACCOUNT && <Account setPage={setPage}/> }
            {page === PAGES.SETTINGS && <Settings setPage={setPage}/>}
            {page === PAGES.LOBBY && <Lobby setPage={setPage}/>}
        </>
    );
}

export default PageManager;