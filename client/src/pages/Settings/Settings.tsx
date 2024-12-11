import Rect, { useContext, useRef, useEffect } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { IBasePage, PAGES } from '../PageManager';

import './Settings.scss';



const Settings: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} =props;
    const server = useContext(ServerContext)
    const store = useContext(StoreContext);

    const user = store.getUser();
    const newNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    

    const saveClicklHandler = async () => {
        if (newNameRef.current && passwordRef.current && newPasswordRef && idRef && nameRef.current) {
            const newName = newNameRef.current.value;
            const oldPassword = passwordRef.current.value;
            const newPassword = String(newPasswordRef.current?.value);
            const name = nameRef.current.value;

            if (name != newName && await server.chageName(newName)) {
                store.setUser({
                    
                    name: newName,
                    token: user?.token || "", // Проверяем наличие token
                    id: user?.id || "", // Проверяем наличие id, если его нет, используем пустую строку
                   
                });
                if (nameRef.current) {
                    nameRef.current.value = newName;  // Обновляем реф для текущего компонента
                }
                newNameRef.current.value = '';

                //Тута сделай что успешно поменяно
            }
            if (oldPassword != newPassword && await server.chagePassword(oldPassword, newPassword)) {
                passwordRef.current.value = '';
                if (newPasswordRef.current) {
                    newPasswordRef.current.value = '';
                }
                //И тута сделай что успешно поменяно
            }

        }
    }

    useEffect(() => {
        if (idRef.current && user && nameRef.current) {
            idRef.current.value = user.id; // Записываем ID пользователя
            nameRef.current.value = user.name;
        }
    }, [user]);

    const backClickHandler = () => setPage(PAGES.LOBBY);

    return (<div className='settings'>
        <h1> Настройки </h1>

        <div className='settings-wapper'>

            <div className='settings-id'>
                <h1> ID Игрока: </h1>
                <input id='idRef' ref={idRef} readOnly/> 
                <h1> Ник: </h1>
                <input id='nickRef' ref={nameRef} readOnly /> 
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