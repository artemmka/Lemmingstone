import Rect, {useRef} from 'react';
import { IBasePage, PAGES } from '../PageManager';

import './Settings.scss';

const Settings: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} =props;

    const newNickRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const nickRef = useRef<HTMLInputElement>(null);

    const saveCliclHandler = () => setPage(PAGES.SETTINGS);
    const backClickHandler = () => setPage(PAGES.MAINPAGE);

    return (<div className='settings'>
        <div className='settings-name'> Настройки </div>

        <div className='settings-wapper'>

            <div className='settings-id'>
                <div className='settings-number3'> ID Игрока: </div>
                <input id='idRef' ref={idRef} placeholder='2879'/>
                <div className='settings-text2'> Ник: </div>
                <input id='nickRef' ref={nickRef} placeholder='Хомяк' />
            </div>
            <div className='settings-inputs'>
                <div className='settings-text1'> Изменить ник </div>
                <input id='newNickRef' ref={newNickRef} />
                <div className='settings-number1'> Изменить пароль </div>
                <input id='passwordRef' ref={passwordRef} type='password'/>
                <div className='settings-number2'> Повторить новый пароль </div>
                <input id='newPasswordRef' ref={newPasswordRef} type='password'/>
                <button className='settings-b1' id='settings-button-save' onClick={saveCliclHandler}> Сохранить </button>
            </div>

            <div className='settings-buttons'>
                <button className='settings-b2' id='settings-button-to-the-main-page' onClick={backClickHandler}> На главную </button>
            </div>

        </div>

    </div>)
}

export default Settings;