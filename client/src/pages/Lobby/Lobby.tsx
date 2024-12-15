import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { TLemming, TMessages } from '../../services/server/types';
import { IBasePage, PAGES } from '../PageManager';
import Button from '../../components/Button/Button';

import './Lobby.scss';

const Lobby: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [lemmings, setLemmings] = useState<TLemming[]>([])
    const [messages, setMessages] = useState<TMessages>([]);
    const [_, setHash] = useState<string>('');
    const messageRef = useRef<HTMLInputElement>(null);
    const user = store.getUser();

    useEffect(() => {
        // Получить леммингов с сервера
        (async () => {
            if (!lemmings.length) {
                const data = await server.getLemmings();
                if (data) {
                    setLemmings(data);
                }
            }
        })();

        const newMessages = (hash: string) => {
            const messages = store.getMessages();
            if (messages?.length) {
                setMessages(messages);
                setHash(hash);
            }
        }

        if (user) {
            server.startChatMessages(newMessages);
        }

        return () => {
            server.stopChatMessages();
        }
    }, [lemmings, server, store, user]);

    const input = useMemo(() => <input ref={messageRef} placeholder='Сообщение' />, []);

    const sendClickHandler = () => {
        if (messageRef.current) {
            const message = messageRef.current.value;
            if (message) {
                server.sendMessage(message);
                messageRef.current.value = '';
            }
        }
    }

    const toGameClickHandler = () => setPage(PAGES.GAME);
    const backClickHandler = () => setPage(PAGES.LOGIN);
    const settingClickHandle = () => setPage(PAGES.SETTINGS);
    const backPageClickHandler = () => setPage(PAGES.LOGIN);

    const selectLemmingHandler = async (lemmingId: number) => {
        const lemming = lemmings.find(lemming => lemming.id === lemmingId);
        if (lemming) {
            store.setLemming(lemming);
            if (await server.startGame(lemmingId)) {
                setPage(PAGES.GAME);
            }
        }
    }

    if (!user) {
        return (<div className='chat'>
            <h1>Чат</h1>
            <h1>Что-то пошло не так =(</h1>
            <Button onClick={toGameClickHandler} text='В игру!' />
            <Button onClick={backClickHandler} text='Назад' />
        </div>)
    }

    if (!lemmings.length) {
        return (<>...Загрузка</>);
    }

    return (<div className='lobby'>
        <h1>Выберите класс лемминга</h1>

        <div className='lobby-page'>
            <button className='lobby-b1' onClick={settingClickHandle}>Настройки</button>
            <button className='lobby-b2' onClick={backPageClickHandler}>Назад</button>
        </div>

        <div className='lobby-wrapper'>
            {lemmings.map((lemming, index) => (
                <div
                    key={index}
                    className='lemming'
                    onClick={() => selectLemmingHandler(lemming.id)}
                >
                    <span>{lemming.name}</span><br />
                    {lemming.image ? (
                        <img src={`data:image/png;base64,${lemming.image}`} alt={lemming.name} className="lemming-img" />
                    ) : (
                        <div className='lobby-img1'></div>
                    )}
                    <br />
                    <span>{`Здоровье: ${lemming.hp}`}</span><br />
                    <span>{`Скорость: ${lemming.speed}`}</span><br />
                    <span>{`Слотов: ${lemming.slots_count}`}</span>
                </div>
            ))}
        </div>

        <div className='lobby-chat'>
            <h1>Чат</h1>
            <div className='chat-user-info'>
                <span>Привет!</span>
                <span>{user.name}</span>
            </div>
            <div className='chat-messages'>
                {messages.reverse().map((message, index) => (
                    <div key={index}>{`${message.author} (${message.created}): ${message.message}`}</div>
                ))}
            </div>
            {input}
            <div className='chat-buttons'>
                <button onClick={sendClickHandler}>Отправить</button>
            </div>
        </div>
    </div>);
}

export default Lobby;
