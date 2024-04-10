import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faMessage, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentChat.module.scss';
import { emitter } from '../../BoxChat/ListChat/ItemChat';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const cx = classNames.bind(styles);

function ContentChat(to) {
    console.log('click 11111');
    console.log('to:', to.to);
    const host = 'http://localhost:4000';

    const selectedID = localStorage.getItem('selectedID');
    const [receivedMessage, setReceivedMessage] = useState(false); // Biến để kiểm tra đã nhận tin nhắn từ server hay chưa

    const socketRef = useRef();
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

    const fetchDataFromServer = async () => {
        try {
            // Gửi yêu cầu POST để lấy tin nhắn mới từ server
            const response = await axios.post('http://localhost:4000/getmsg', {
                from: userId,
                to: to.to,
            });

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
            await axios.delete(`http://localhost:4000/deletemsg/${messageId}`);

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
                                    <div>
                                        {message.fromSelf && !message.isHidden && (
                                            <div>
                                                {' '}
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
                                ) : // Nếu không phải là tệp được hỗ trợ, hiển thị nội dung thông thường
                                isImageUrl(message.message) ? (
                                    <img src={message.message} alt="imageURL" className={cx('imageURL')} />
                                ) : (
                                    message.message
                                )}
                            </div>
                        </Tippy>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentChat;
