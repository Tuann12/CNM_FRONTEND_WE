import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBack, faArrowRotateRight, faComment, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentChat.module.scss';
import { emitter } from '../../BoxChat/ListChat/ItemChat';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';

const cx = classNames.bind(styles);

function ContentChat({ setMessages }) {
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
    console.log('avatar ContentChat', itemData.avatar);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (storedData && itemData.id) {
                    const response = await axios.post('http://localhost:4000/getmsg', {
                        from: userId,
                        to: itemData.id,
                    });
                    setMessage(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchInterval = setInterval(() => {
            fetchData();
        }, 500); // Fetch dữ liệu sau mỗi 0.5 giây

        return () => clearInterval(fetchInterval); // Hủy interval khi component unmount
    }, [storedData, itemData.id, userId]);

    const handleContextMenu = (event) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của chuột phải
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('containerMessage')}>
                {messages.map((message, index) => (
                    <div className={cx('boxMessage')}>
                        {!message.fromSelf && (
                            <img className={cx('avatarImg')} src={itemData.avatar.props.src} alt="avatar" />
                        )}
                        <Tippy
                            interactive
                            placement="top"
                            trigger="contextmenu"
                            render={(attrs) => (
                                <div className={cx('wrapOption')} tabIndex="-1" {...attrs}>
                                    <div className={cx('wrapOptionDelete')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faTrashCan} />
                                        <h3 className={cx('title')}>Xóa chỉ ở phía tôi</h3>
                                    </div>
                                    <div className={cx('wrapOptionRecall')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faArrowRotateRight} />
                                        <h3 className={cx('title')}>Thu hồi</h3>
                                    </div>
                                </div>
                            )}
                        >
                            <div
                                key={index}
                                className={cx('message', { fromSelf: message.fromSelf })}
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
