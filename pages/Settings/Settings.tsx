import React, {useRef} from 'react';
import { PAGES, IBasePage } from '../PageManager';
import './Settings.css';

const Settings: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} = props;
    const editNickRef = useRef<HTMLInputElement>(null);
    const editPasswordRef = useRef<HTMLInputElement>(null);
    const repeatNewPasswordRef = useRef<HTMLInputElement>(null);
    const idUserRef = useRef<HTMLInputElement>(null);
    const nickUserRef = useRef<HTMLInputElement>(null);
 

    const saveClickHandler = () => setPage(PAGES.SETTINGS);
    const backClickHndler = () => setPage(PAGES.MAINPAGE);

    return (<div className='settings'>
        <div className='settings-name'> Настройки </div>
        <div className='settings-wrapper'>
            <div className='id-inputs'> 
                <div className='text-id'> ID Игрока: </div>
                <input id='idUser' ref={idUserRef} placeholder='2879' />
                <div className='text-NickUser'> Ник: </div>
                <input id='nickUser' ref={nickUserRef} placeholder='Хомяк' />
            </div>
            <div className='sattings-inputs'>
                <div className='text-nick'> Изменить ник </div>
                <input id='nick' ref={editNickRef} />
                <div className='newPasword'> Изменить пароль </div>
                <input id='password-new' ref={editPasswordRef} />
                <div className='reapNewPas'> Повторить новый пароль </div>
                <input id='reapPassNew' ref={repeatNewPasswordRef} />
                <button className='save-button' onClick={saveClickHandler}> Сохранить </button>
            </div> 

            <div className='button-settings'>
                <button className='backButton-set' onClick={backClickHndler}> На главную </button>
            </div>
          
        </div>
       

    </div>)
}

export default Settings;