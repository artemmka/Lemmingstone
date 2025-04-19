import { TMessages, TUser, TLemming } from "../server/types";

const TOKEN = 'token';

class Store {
    user: TUser | null = null;
    messages: TMessages = [];
    chatHash: string = 'empty chat hash';
    mapHash: string = 'empty map hash';
    lemming: TLemming = null!

    setToken(token: string): void {
        localStorage.setItem(TOKEN, token);
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN);
    }

    setUser(user: TUser): void {
        const { token } = user;
        this.setToken(token);
        this.user = user;
    }

    getUser(): TUser | null {
        return this.user;
    }

    clearUser(): void {
        this.user = null;
        this.setToken('');
    }

    addMessages(messages: TMessages): void {
        if (messages?.length) {
            this.messages = this.messages.concat(messages);  // Добавление новых сообщений
        }
    }

    getMessages(): TMessages {
        return this.messages;
    }

    clearMessages(): void {
        this.messages = [];
    }

    getChatHash(): string {
        return this.chatHash;
    }

    setChatHash(hash: string): void {
        this.chatHash = hash;
    }
    
    getMapHash(): string {
        return this.mapHash;
    }

    setMapHash(hash: string): void {
        this.mapHash = hash;
    }

    getLemming(): TLemming {
        return this.lemming;
    }
    setLemming(lemming: TLemming): void {
        this.lemming = lemming;
    }
}

export default Store;