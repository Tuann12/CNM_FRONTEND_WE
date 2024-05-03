import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faMessage, faShare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentChat.module.scss';
import { emitter } from '../../BoxChat/ListChat/ItemChat';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import ShareMessage from './ShareMessage';

const cx = classNames.bind(styles);

function ContentChat(to) {
    console.log('click 11111');
    console.log('to:', to.to);
    const host = 'https://backend-chatapp-rdj6.onrender.com';

    const selectedID = localStorage.getItem('selectedID');
    const [receivedMessage, setReceivedMessage] = useState(false); // Biến để kiểm tra đã nhận tin nhắn từ server hay chưa
    const [showListFriends, setShowListFriends] = useState(false);
    const socketRef = useRef();
    const [itemData, setItemData] = useState({ id: '', avatar: '' });
    const storedData = localStorage.getItem('loginData');
    const [messages, setMessage] = useState([]);
    const [sharedMessage, setSharedMessage] = useState(''); // Tin nhắn được chia sẻ
    const [, forceUpdate] = React.useState();

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

    const fetchDataFromServer = async () => {
        if (itemData.type === 'group') {
            try {
                // Gửi yêu cầu POST để lấy tin nhắn mới từ server
                const response = await axios.post('https://backend-chatapp-rdj6.onrender.com/getGroupMessages', {
                    from: userId,
                    groupId: to.to,
                });
                console.log('response:', response);
                // Sắp xếp tin nhắn theo thời gian tạo
                const sortedMessages = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setMessage(sortedMessages);

                // Cập nhật state messages với các tin nhắn mới
                console.log('userId:', userId);
                console.log('selectedID:', selectedID);
                console.log('sortedMessages:', sortedMessages);
                // Đánh dấu rằng đã nhận tin nhắn từ server
                setReceivedMessage(true);
            } catch (error) {
                console.error('Error receiving message:', error);
            }
        } else {
            try {
                // Gửi yêu cầu POST để lấy tin nhắn mới từ server
                const response = await axios.post('https://backend-chatapp-rdj6.onrender.com/getmsg', {
                    from: userId,
                    to: to.to,
                });
                console.log('response:', response);
                // Sắp xếp tin nhắn theo thời gian tạo
                const sortedMessages = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                // Cập nhật state messages với các tin nhắn mới
                setMessage(sortedMessages);

                console.log('userId:', userId);
                console.log('selectedID:', selectedID);
                console.log('sortedMessages:', sortedMessages);
                // Đánh dấu rằng đã nhận tin nhắn từ server
                setReceivedMessage(true);
            } catch (error) {
                console.error('Error receiving message:', error);
            }
        }
    };
    useEffect(() => {
        if (to.to) {
            fetchDataFromServer(); // Gọi hàm để lấy dữ liệu từ server khi có giá trị của to.to
        }
        // Kết nối tới server socket.io
        socketRef.current = socketIOClient.connect(host);

        // Lắng nghe sự kiện 'sendDataServer' từ server
        socketRef.current.on('sendDataServer', () => {
            fetchDataFromServer(); // Gọi hàm để lấy dữ liệu từ server
        });
        socketRef.current.on('sendDataServer', () => {
            fetchDataFromServer(); // Gọi hàm để lấy dữ liệu từ server
        });
        // Ngắt kết nối khi component unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, [to.to]); // Gọi useEffect khi selectedID thay đổi

    const handleContextMenu = (event) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của chuột phải
    };

    const handleDeleteMessage = async (index, messageId) => {
        try {
            // Gọi API để xóa tin nhắn với ID cụ thể
            await axios.delete(`https://backend-chatapp-rdj6.onrender.com/deletemsg/${messageId}`);
            await socketRef.current.emit('sendDataClient', {
                responseData: 'sendDataClient',
            });
            // Xóa tin nhắn khỏi mảng messages
            const updatedMessages = messages.filter((message) => message.id !== messageId);
            updatedMessages.splice(index, 1);
            console.log('updatedMessages:', updatedMessages);
            fetchDataFromServer();
            setMessage(updatedMessages);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };
    console.log('messagesContentChat:', messages);
    const handleRecallMessage = async (messageId) => {
        try {
            await axios.put(`https://backend-chatapp-rdj6.onrender.com/retrievemsg/${messageId}/${userId}`);
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

    function isImageUrl(url) {
        // Biểu thức chính quy để kiểm tra định dạng URL hình ảnh
        const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/;
        return imageUrlRegex.test(url);
    }

    const supportedFileExtensions = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'json', 'csv'];

    // Kiểm tra nếu đuôi tệp được hỗ trợ
    const isFileExtensionSupported = (filename) => {
        if (filename) {
            const extension = filename.split('.').pop(); // Lấy phần mở rộng của tệp
            return supportedFileExtensions.includes(extension);
        }
        return false; // Trả về false nếu filename không tồn tại
    };

    const handleVisibility = () => {
        setShowListFriends(false);
    };

    const handleListFriendsShareClick = (messageContent) => {
        console.log('messageContent:', messageContent);
        setSharedMessage(messageContent);
        setShowListFriends(true);
    };

    function isVideoUrl(url) {
        // Biểu thức chính quy để kiểm tra định dạng URL video MP4
        const mp4UrlRegex = /\.(mp4)$/;
        return mp4UrlRegex.test(url);
    }

    function isAudioUrl(url) {
        // Biểu thức chính quy để kiểm tra định dạng URL âm thanh MP3
        const mp3UrlRegex = /\.(mp3)$/;
        return mp3UrlRegex.test(url);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('containerMessage')}>
                {messages.map((message, index) => (
                    <div className={cx('boxMessage')} key={index}>
                        {!message.fromSelf && <img className={cx('avatarImg')} src={message.avatar} alt="avatar" />}

                        <Tippy
                            interactive
                            placement="top"
                            trigger="contextmenu"
                            render={(attrs) => (
                                <div className={cx('wrapOption')} tabIndex="-1" {...attrs}>
                                    <div>
                                        {!message.fromSelf && (
                                            <div>
                                                <div
                                                    className={cx('wrapOptionShareMsg')}
                                                    onClick={() => handleListFriendsShareClick(message)}
                                                >
                                                    <FontAwesomeIcon className={cx('icon')} icon={faShare} />
                                                    <h3 className={cx('title')}>Chia sẻ</h3>
                                                </div>
                                            </div>
                                        )}
                                        {/* Render các tùy chọn khác nếu tin nhắn từ người dùng hiện tại */}
                                        {message.fromSelf && !message.isHidden && (
                                            <div>
                                                <div>
                                                    <div
                                                        className={cx('wrapOptionShareMsg')}
                                                        onClick={() => handleListFriendsShareClick(message)}
                                                    >
                                                        <FontAwesomeIcon className={cx('icon')} icon={faShare} />
                                                        <h3 className={cx('title')}>Chia sẻ</h3>
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx('wrapOptionRecall')}
                                                    onClick={() => handleRecallMessage(message.id)}
                                                >
                                                    <FontAwesomeIcon className={cx('icon')} icon={faTrashCan} />
                                                    <h3 className={cx('title')}>Gở ở phía tôi</h3>
                                                </div>
                                                <div
                                                    className={cx('wrapOptionDelete')}
                                                    onClick={() => handleDeleteMessage(index, message.id)}
                                                >
                                                    <FontAwesomeIcon className={cx('icon')} icon={faArrowRotateRight} />
                                                    <h3 className={cx('title')}>Thu hồi tin nhắn</h3>
                                                </div>
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
                                {!message.fromSelf && <span className={cx('senderName')}>{message.name}</span>}

                                {isFileExtensionSupported(message.message) ? (
                                    <div className="file-wrapper">
                                        <a className={cx('editFile')} href={message.message} download>
                                            <img
                                                className={cx('imageFile')}
                                                src="https://fileviewerplus.com/img/icon/256/jpg-63.png"
                                                alt="imageFile"
                                            />
                                            {message.message}
                                        </a>
                                    </div>
                                ) : isVideoUrl(message.message) ? (
                                    <video controls className={cx('video')}>
                                        <source src={message.message} type="video/mp4" />
                                    </video>
                                ) : isImageUrl(message.message) ? (
                                    <img src={message.message} alt="imageURL" className={cx('imageURL')} />
                                ) : isAudioUrl(message.message) ? (
                                    <audio controls className={cx('audio')}>
                                        <source src={message.message} type="audio/mpeg" />
                                    </audio>
                                ) : (
                                    message.message
                                )}
                            </div>
                        </Tippy>
                    </div>
                ))}
                {showListFriends && <ShareMessage sharedMessage={sharedMessage} onHide={handleVisibility} />}
            </div>
        </div>
    );
}

export default ContentChat;
