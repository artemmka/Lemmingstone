import React, { useContext, useRef, useEffect } from 'react';
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
    const repeatNewPasswordRef = useRef<HTMLInputElement>(null);

    

    const saveClicklHandler = async () => {
        if (newNameRef.current && passwordRef.current && newPasswordRef && idRef && nameRef.current && repeatNewPasswordRef.current) {
            const newName = newNameRef.current.value;
            const oldPassword = passwordRef.current.value;
            const newPassword = String(newPasswordRef.current?.value);
            const name = nameRef.current.value;
            const repeatNewPassword = repeatNewPasswordRef.current.value;
            const token = user?.token;
            if (!token) {
                console.log('No token found');
                return;
            }

            if (name !== newName && newName) {
                const nameChanged = await server.changeName(token, newName);
                if (nameChanged) {
                    user.name = newName;
                    nameRef.current.value = newName;
                    newNameRef.current.value = '';
                }
            }

            if (oldPassword !== newPassword && repeatNewPassword === newPassword && newPassword.length >= 8 && newPassword.length <= 21) {
                const passwordChanged = await server.changePassword(token, oldPassword, newPassword);
                if (passwordChanged) {
                    if (newPasswordRef.current) {
                        passwordRef.current.value = '';
                        newPasswordRef.current.value = '';
                        repeatNewPasswordRef.current.value = '';
                    }
                    // Сообщение об успешном изменении пароля
                } else {
                    
                }
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
                <div className='settings-name'>
                    <h1> Изменить ник </h1>
                    <input id='newNickRef' ref={newNameRef} />
                    <h1> Старый пароль </h1>
                    <input id='passwordRef' ref={passwordRef} type='password'/>
                    <h1> Новый пароль </h1>
                    <input id='newPasswordRef' ref={newPasswordRef} type='password'/>
                    <h6> *Пароль должен быть не менее 8 и не более 20 символов. Используемые символы: латинские символы верхнего регистра (A-Z), латинские символы нижнего регистра (a-z), цифры (0-9). </h6>
                </div>
                <div className='settings-password'>
                    <h1> Повторить новый пароль</h1>
                    <input id='repeatNewPassword' ref={repeatNewPasswordRef} type='password'/>
                </div>
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