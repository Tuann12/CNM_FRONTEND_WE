import React, { useState } from 'react';
import HeaderChat from './HeaderChat/HeaderChat';
import ContentChat from './ContentChat/ContentChat';
import InputChat from './InputChat/InputChat';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

const cx = classNames.bind(styles);

function Chat() {
    const [selectedItem, setSelectedItem] = useState({ avatar: '', title: '' });
    const [messages, setMessages] = useState([]);

    const handleMessageSend = (message) => {
        setMessages([...messages, message]);
    };

    return (
        <div className={cx('wrapper')}>
            <HeaderChat selectedItem={selectedItem} />
            <ContentChat messages={messages} />
            <InputChat onSend={handleMessageSend} />
        </div>
    );
}

export default Chat;
