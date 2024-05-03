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
import socketIOClient from 'socket.io-client';
const cx = classNames.bind(styles);

function Chat({ isOpenInfo }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [reloadToggle, setReloadToggle] = useState(false); // State để kích hoạt render lại
    const [avatar, setAvatar] = useState(null);
    const [avatarToSend, setAvatarToSend] = useState(null);
    const storedData = localStorage.getItem('loginData');
    const parsedData = JSON.parse(storedData);
    let userId = null;
    let updatedAvatarUrl = '';
    const socketRef = useRef();
    const [id, setId] = useState();
    const [mess, setMess] = useState([]);
    const host = 'http://localhost:4000';
    const scrollToBottom = () => {};
    useEffect(() => {
        socketRef.current = socketIOClient.connect(host);

        socketRef.current.on('getId', (data) => {
            setId(data);
        });

        socketRef.current.on('sendDataServer', (dataGot) => {
            setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
            scrollToBottom();
        });
        socketRef.current.on('leaveGroup', () => {
            window.location.reload();
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

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
        if (itemData.type === 'group') {
            try {
                console.log('sen to sock', parsedData.foundUser);
                let avatar = parsedData.foundUser.avatar;
                if (!avatar) {
                    avatar =
                        'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg';
                }
                const messageToSend = updatedAvatarUrl ? { message: updatedAvatarUrl } : { message: msg };
                console.log('messageToSend:', messageToSend);
                await socketRef.current.emit('sendDataClient', {
                    _id: itemData.id,
                    to: itemData.id,
                    from: userId,
                    ...messageToSend,
                    group: itemData.type,
                });
                console.log('image in chat ', parsedData.foundUser);
                await axios.post('http://localhost:4000/sendMessageToGroup', {
                    _id: itemData.id,
                    from: userId,
                    to: itemData.id,
                    group: itemData.id,
                    ...messageToSend,
                    avatar: avatar,
                });
                console.log('image in chat ', updatedAvatarUrl);
                console.log('Message sent:', msg);
                console.log('To:', itemData.id);
                console.log('From:', userId);
                console.log('itemData:', itemData);
                setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        } else {
            try {
                console.log('sen to sock', parsedData.foundUser);
                let avatar = parsedData.foundUser.avatar;
                if (!avatar) {
                    avatar =
                        'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg';
                }
                const messageToSend = updatedAvatarUrl ? { message: updatedAvatarUrl } : { message: msg };
                console.log('messageToSend:', messageToSend);
                await socketRef.current.emit('sendDataClient', {
                    _id: itemData.id,
                    to: itemData.id,
                    from: userId,
                    ...messageToSend,
                });
                await axios.post('http://localhost:4000/addmsg', {
                    _id: itemData.id,
                    from: userId,
                    to: itemData.id,
                    ...messageToSend,
                    avatar: avatar,
                });
                console.log('image in chat ', updatedAvatarUrl);
                console.log('Message sent:', msg);
                console.log('To:', itemData.id);
                console.log('From:', userId);
                console.log('itemData:', itemData);
                setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };
    console.log('avatarToSend:', avatarToSend);
    return (
        <div className={cx('wrapper')}>
            <HeaderChat parsedData={parsedData} />
            <ContentChat key={reloadToggle} to={itemData.id} setMessages={messages} />
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
