// Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import HeaderChat from './HeaderChat/HeaderChat';
import ContentChat from './ContentChat/ContentChat';
import InputChat from './InputChat/InputChat';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { emitter } from '../BoxChat/ListChat/ItemChat';

const cx = classNames.bind(styles);

function Chat({ isOpenInfo }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [reloadToggle, setReloadToggle] = useState(false); // State để kích hoạt render lại

    const storedData = localStorage.getItem('loginData');
    let userId = null;
    if (storedData) {
        try {
            userId = JSON.parse(storedData).foundUser._id;
        } catch (error) {
            console.error('Error parsing loginData:', error);
        }
    }
    const socket = useRef(io('http://localhost:4000'));
    const [itemData, setItemData] = useState({ id: '' });

    useEffect(() => {
        const handler = (data) => {
            setItemData(data);
        };

        emitter.on('itemClick', handler);

        return () => {
            emitter.off('itemClick', handler);
        };
    }, []);

    useEffect(() => {
        socket.current.on('msg-recieve', (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
            setReloadToggle((prev) => !prev); // Kích hoạt render lại khi có tin nhắn mới
        });
        return () => socket.current.disconnect();
    }, []);

    useEffect(() => {
        if (arrivalMessage) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, reloadToggle]);

    const handleSendMsg = async (msg, toUserId) => {
        try {
            socket.current.emit('send-msg', {
                to: itemData.id,
                from: userId,
                msg,
            });
            await axios.post('http://localhost:4000/addmsg', {
                from: userId,
                to: itemData.id,
                message: msg,
            });
            console.log('Message sent:', msg);
            console.log('To:', itemData.id);
            console.log('From:', userId);
            setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <HeaderChat />
            <ContentChat key={reloadToggle} setMessages={setMessages} />
            <InputChat onSend={(msg) => handleSendMsg(msg)} />
            <div ref={scrollRef} />
        </div>
    );
}

export default Chat;
