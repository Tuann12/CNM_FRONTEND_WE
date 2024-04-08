import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client'; // Thay đổi tên biến từ 'socket' thành 'io'
import HeaderChat from './HeaderChat/HeaderChat';
import ContentChat from './ContentChat/ContentChat';
import InputChat from './InputChat/InputChat';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { emitter } from '../BoxChat/ListChat/ItemChat'; // Import emitter from ItemChat

const cx = classNames.bind(styles);

function Chat({ currentChat, selectedItem, isOpenInfo }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const storedData = localStorage.getItem('loginData');
    // const userId = JSON.parse(storedData).foundUser._id;
    const socket = useRef(io('http://localhost:4000'));

    const [itemData, setItemData] = useState({ id: '' }); // Thêm id vào itemData
    useEffect(() => {
        const handler = (data) => {
            setItemData(data);
        };

        emitter.on('itemClick', handler);

        return () => {
            emitter.off('itemClick', handler);
        };
    }, []);
    // console.log('userId in Chat:', userId);
    console.log('ID in Chat:', itemData.id); // Log id của ItemChat được chọn từ localStorage

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             let response;
    //             if (currentChat.checkgroup) {
    //                 response = await axios.post('http://localhost:4000/user/addmsg', {
    //                     from: userId,
    //                     to: currentChat.chat._id, // Thay đổi id đích của cuộc trò chuyện
    //                 });
    //             }
    //             setMessages(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, [currentChat]);

    useEffect(() => {
        socket.current.on('msg-recieve', (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
        });
        return () => socket.current.disconnect(); // Clean up socket connection
    }, []);

    useEffect(() => {
        if (arrivalMessage) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // const handleSendMsg = async (msg) => {
    //     try {
    //         socket.current.emit('send-msg', {
    //             to: currentChat.chat._id,
    //             from: userId,
    //             msg,
    //         });
    //         await axios.post('http://localhost:4000/user/addmsg', {
    //             from: userId,
    //             to: currentChat.chat._id,
    //             message: msg,
    //         });
    //         setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // };

    const handleShowInfo = (isOpen, currentChat) => {
        isOpenInfo(isOpen, currentChat);
    };

    return (
        <div className={cx('wrapper')}>
            <HeaderChat selectedItem={selectedItem} />
            <ContentChat messages={messages} />
            <InputChat />
            <div ref={scrollRef} />
        </div>
    );
}

export default Chat;
