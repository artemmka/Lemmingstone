import Rect, {useContext, useRef} from 'react';
import { IBasePage, PAGES } from '../PageManager';

import './Settings.scss';
import { ServerContext } from '../../App';

const Settings: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} =props;
    const server = useContext(ServerContext)
    const newNickRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const nickRef = useRef<HTMLInputElement>(null);

    const saveCliclHandler = async () => {
        if (newNickRef.current && passwordRef.current && newPasswordRef && idRef && nickRef.current) {
            const newNick = newNickRef.current.value;
            const password = passwordRef.current.value;
            const newPassword = newPasswordRef.current?.value;
            const nick = nickRef.current.value;

            if (password != newPassword && nick != newNick) {
            }
            if (newNick && password && await server.settings(newNick, password)) {
                setPage(PAGES.SETTINGS);
            }

        }
    }
    const backClickHandler = () => setPage(PAGES.GAME);

    return (<div className='settings'>
        <h1> Настройки </h1>

        <div className='settings-wapper'>

            <div className='settings-id'>
                <h1> ID Игрока: </h1>
                <input id='idRef' ref={idRef} placeholder='2879'/>
                <h1> Ник: </h1>
                <input id='nickRef' ref={nickRef} placeholder='Хомяк' />
            </div>
            <div className='settings-inputs'>
                <h1> Изменить ник </h1>
                <input id='newNickRef' ref={newNickRef} />
                <h1> Изменить пароль </h1>
                <input id='passwordRef' ref={passwordRef} type='password'/>
                <h1> Повторить новый пароль </h1>
                <input id='newPasswordRef' ref={newPasswordRef} type='password'/>

                <div className='settings-button1'>
                    <button id='settings-button-save' onClick={saveCliclHandler}> Сохранить </button>
                </div>
            </div>

        </div>

        <div className='settings-button2'>
                <button id='settings-button-to-the-main-page' onClick={backClickHandler}> На главную </button>
            </div>

    </div>)
}

export default Settings;