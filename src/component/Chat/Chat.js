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
    const [avatar, setAvatar] = useState(null);
    const [avatarToSend, setAvatarToSend] = useState(null);
    const storedData = localStorage.getItem('loginData');
    let userId = null;
    let updatedAvatarUrl = '';

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

    const handleFileChange = async (e) => {
        const imageUrl = e.target.files[0]; // Get the selected file
        setAvatar(imageUrl); // Set the selected file as the avatar

        if (imageUrl) {
            // Check if an image is selected
            try {
                // Create formData to send the avatar file to the server
                const formData = new FormData();
                formData.append('avatar', imageUrl);

                // Send the avatar file to the API
                const avatarResponse = await fetch(`http://localhost:4000/user/uploadAvatarS3/${userId}`, {
                    method: 'POST',
                    body: formData,
                });

                // Check if the avatar was uploaded successfully
                if (!avatarResponse.ok) {
                    throw new Error('Failed to upload avatar');
                }

                // Get the URL of the uploaded avatar from the API response
                const avatarData = await avatarResponse.json();
                const updatedAvatarUrl = avatarData.avatar;
                console.log('updatedAvatarUrl:', updatedAvatarUrl);

                // Set the updatedAvatarUrl state
                setAvatarToSend(updatedAvatarUrl);
            } catch (error) {
                console.error('Error uploading avatar:', error);
                // Handle error uploading avatar
            }
        }
    };

    console.log('avatar in chat:', updatedAvatarUrl);
    console.log('avatar in chat:', avatar);

    const handleSendMsg = async (msg, toUserId) => {
        try {
            const messageToSend = updatedAvatarUrl ? { message: updatedAvatarUrl } : { message: msg };
            console.log('messageToSend:', messageToSend);
            socket.current.emit('send-msg', {
                to: itemData.id,
                from: userId,
                ...messageToSend,
            });
            await axios.post('http://localhost:4000/addmsg', {
                from: userId,
                to: itemData.id,
                ...messageToSend,
            });
            console.log('image in chat ', updatedAvatarUrl);
            console.log('Message sent:', msg);
            console.log('To:', itemData.id);
            console.log('From:', userId);
            setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    console.log('avatarToSend:', avatarToSend);
    return (
        <div className={cx('wrapper')}>
            <HeaderChat />
            <ContentChat key={reloadToggle} setMessages={messages} />
            <InputChat
                avatarToSend={avatarToSend}
                onSend={(msg, updatedAvatarUrl) => handleSendMsg(msg, updatedAvatarUrl)}
                image={avatar}
                onFileChange={handleFileChange}
            />
            <div ref={scrollRef} />
        </div>
    );
}

export default Chat;
