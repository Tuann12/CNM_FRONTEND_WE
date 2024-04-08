import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentChat.module.scss';
import { emitter } from '../../BoxChat/ListChat/ItemChat';

const cx = classNames.bind(styles);
function ContentChat({ messages }) {
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
    console.log('ID in ContentChat:', itemData.id); // Log id của ItemChat được chọn từ localStorage
    return (
        <div className={cx('wrapper')}>
            <div className={cx('containerMessage')}>
                {messages.map((message, index) => (
                    <div key={index} className={cx('message')}>
                        {message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentChat;
