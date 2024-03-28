import React, { useState } from 'react';
import HeaderChat from './HeaderChat/HeaderChat';
import ContentChat from './ContentChat/ContentChat';
import InputChat from './InputChat/InputChat';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

const cx = classNames.bind(styles);

function Chat() {
    const [selectedItem, setSelectedItem] = useState({ avatar: '', title: '' });

    const handleItemClick = ({ avatar, title }) => {
        setSelectedItem({ avatar, title });
    };

    return (
        <div className={cx('wrapper')}>
            <HeaderChat selectedItem={selectedItem} />
            <ContentChat />
            <InputChat />
        </div>
    );
}
export default Chat;
