import Rect, {useContext, useRef} from 'react';
import { IBasePage, PAGES } from '../PageManager';

import './Settings.scss';
import { ServerContext } from '../../App';

const Settings: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} =props;
    const server = useContext(ServerContext)
    const newNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const saveClicklHandler = async () => {
        if (newNameRef.current && passwordRef.current && newPasswordRef && idRef && nameRef.current) {
            const newName = newNameRef.current.value;
            const password = passwordRef.current.value;
            const newPassword = newPasswordRef.current?.value;
            const name = nameRef.current.value;

            if (name != newName && await server.chageName(newName)) {
                setPage(PAGES.SETTINGS);

            }

        }
    }
    const backClickHandler = () => setPage(PAGES.LOBBY);

    return (<div className='settings'>
        <h1> Настройки </h1>

        <div className='settings-wapper'>

            <div className='settings-id'>
                <h1> ID Игрока: </h1>
                <input id='idRef' ref={idRef} placeholder='2879'/>
                <h1> Ник: </h1>
                <input id='nickRef' ref={nameRef} placeholder='Хомяк' />
            </div>
            <div className='settings-inputs'>
                <h1> Изменить ник </h1>
                <input id='newNickRef' ref={newNameRef} />
                <h1> Старый пароль </h1>
                <input id='passwordRef' ref={passwordRef} type='password'/>
                <h1> Новый пароль </h1>
                <input id='newPasswordRef' ref={newPasswordRef} type='password'/>

                <div className='settings-button1'>
                    <button id='settings-button-save' onClick={saveClicklHandler}> Сохранить </button>
                </div>
            </div>

        </div>

        <div className='settings-button2'>
                <button id='settings-button-to-the-main-page' onClick={backClickHandler}> Назад </button>
            </div>

    </div>)
}

export default Settings;