import React, {useRef} from 'react';
import { PAGES, IBasePage } from '../PageManager';
import './Record.css'

const Record: React.FC<IBasePage> = (props: IBasePage) => {
    const {setPage} = props;
    const loginRef = useRef<HTMLInputElement>(null);
    const nickRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);

    const recordClickHandler = () => setPage(PAGES.GAME);
    const backClickHandler = () => setPage(PAGES.MAINPAGE);

    return (<div className='record'>
        <div className='record-name'> Регистрация </div>
        <div className='record-wapper'>
            <div className='record-inputs'>
                <div className='record-login'> Введите логин </div>
                <input id='recordLogin' ref={loginRef}/>
                <div className='record-nick'> Введите ник </div>
                <input id='recordNick' ref={nickRef} />
                <div className='record-password'> Введите пароль </div>
                <input id='recordPassword' ref={passwordRef} />
                <div className='reapPassword'> Повторите пароль </div>
                <input id='recordReapPas'  ref={repeatPasswordRef}/>
            </div>

            <div className='record-button'>
                <button className='button-rec' onClick={recordClickHandler}> Зарегистрироваться </button>
                <button className='buttony-BackRec' onClick={backClickHandler}> На главную </button>
            </div>

        </div>
    </div>)
}

export default Record;