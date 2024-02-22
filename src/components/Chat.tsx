import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Button from 'react-bootstrap/Button';

interface ChatProps{
    room: string | null;
}

interface Messages{
    [key: string]: string | null;
}
export const Chat: React.FC<ChatProps> = ({room}) => {
    const [newMessage, setNewMessage] = useState<string>('');
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState<Messages[]>([])

    useEffect(() => {
        
       const queryMessages = query(messagesRef, where('room', '==', {room}), orderBy("createdAt"))
       const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages: Messages[] = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    },[])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(newMessage === '') return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser?.displayName,
            room: {room}
        });
        setNewMessage('')
    }
    return (
        <div className="chat-app">
            <div className="chat-header">
                <h1>Welcome to: {room?.toUpperCase()}</h1>
            </div>
            <div className="chat-messages">
                {messages.map((message) => (
                <div className="chat-message" key={message.id}>
                    <h2 className="chat-user">{message.user}</h2>
                    <p className="chat-message-text">{message.text}</p>
                </div>
            ))}</div>
            <form onSubmit={handleSubmit} className="chat-newMessage-form">
                <input 
                type="text" 
                className="chat-neMessage-input" 
                placeholder="Type your message here" 
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                />
                <Button type="submit" className="chat-sendButton btn-info"> Send </Button>
            </form>
        </div>
    )
}