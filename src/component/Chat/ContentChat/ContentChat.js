import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faMessage, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentChat.module.scss';
import { emitter } from '../../BoxChat/ListChat/ItemChat';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';

const cx = classNames.bind(styles);

function ContentChat({}) {
    const [itemData, setItemData] = useState({ id: '', avatar: '' });
    const storedData = localStorage.getItem('loginData');
    const [messages, setMessage] = useState([]);
    let userId = null;
    if (storedData) {
        try {
            userId = JSON.parse(storedData).foundUser._id;
        } catch (error) {
            console.error('Error parsing loginData:', error);
        }
    }

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
        const fetchData = async () => {
            try {
                if (storedData && itemData.id) {
                    const response = await axios.post('http://localhost:4000/getmsg', {
                        from: userId,
                        to: itemData.id,
                    });
                    // Sort messages by createdAt field
                    const sortedMessages = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    // Update state
                    setMessage(sortedMessages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchInterval = setInterval(() => {
            fetchData();
        }, 500); // Fetch data every 0.5 seconds

        return () => clearInterval(fetchInterval); // Clear interval on unmount
    }, [storedData, itemData.id, userId]);

    const handleContextMenu = (event) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của chuột phải
    };
    // setTimeout(() => {
    //     console.log('messages:', messages);
    // }, 2000);

    const handleDeleteMessage = async (index, messageId) => {
        try {
            // Gọi API để xóa tin nhắn với ID cụ thể
            await axios.delete(`http://localhost:4000/deletemsg/${messageId}`);

            // Xóa tin nhắn khỏi mảng messages
            const updatedMessages = messages.filter((message) => message.id !== messageId);
            updatedMessages.splice(index, 1);
            console.log('updatedMessages:', updatedMessages);
            // Cập nhật lại state messages
            setMessage(updatedMessages);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };
    const handleRecallMessage = async (messageId) => {
        try {
            await axios.put(`http://localhost:4000/retrievemsg/${messageId}/${userId}`);

            // Update the messages array without changing the order or index of the recalled message
            setMessage(
                messages.map((message) => {
                    if (message.id === messageId) {
                        return { ...message, isHidden: true };
                    }
                    return message;
                }),
            );
        } catch (error) {
            console.error('Error recalling message:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('containerMessage')}>
                {messages.map((message, index) => (
                    <div className={cx('boxMessage')} key={index}>
                        {!message.fromSelf && (
                            <img className={cx('avatarImg')} src={itemData.avatar.props.src} alt="avatar" />
                        )}
                        <Tippy
                            interactive
                            placement="top"
                            trigger="contextmenu"
                            render={(attrs) => (
                                <div className={cx('wrapOption')} tabIndex="-1" {...attrs}>
                                    <div
                                        className={cx('wrapOptionDelete')}
                                        onClick={() => handleDeleteMessage(index, message.id)}
                                    >
                                        <FontAwesomeIcon className={cx('icon')} icon={faTrashCan} />
                                        <h3 className={cx('title')}>Xóa</h3>
                                    </div>
                                    <div>
                                        {message.fromSelf && !message.isHidden && (
                                            <div
                                                className={cx('wrapOptionRecall')}
                                                onClick={() => handleRecallMessage(message.id)}
                                            >
                                                <FontAwesomeIcon className={cx('icon')} icon={faArrowRotateRight} />
                                                <h3 className={cx('title')}>Gở ở phía tôi</h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        >
                            <div
                                className={cx('message', {
                                    fromSelf: message.fromSelf,
                                    hidden: message.isHidden && message.fromSelf, // Ẩn tin nhắn nếu là từ người gửi và isHidden là true
                                })}
                                onContextMenu={handleContextMenu}
                            >
                                {message.message}
                            </div>
                        </Tippy>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentChat;
