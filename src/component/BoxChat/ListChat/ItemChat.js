import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './ListChat.module.scss';
import mitt from 'mitt';

const cx = classNames.bind(styles);

const emitter = mitt();

function ItemChat({ avatar, title, contentChat, email, time, icon, onItemClick }) {
    const handleClick = () => {
        onItemClick({ avatar, title });
        emitter.emit('itemClick', { avatar, title });
    };

    return (
        <div className={cx('ItemChatWrap')} onClick={handleClick}>
            <div className={cx('BoxChatItem')}>
                <div className={cx('avatar')}>{avatar}</div>
                <div className={cx('content')}>
                    <h3 className={cx('title')}>{title}</h3>
                    <span className={cx('content-chat')}>{contentChat}</span>
                    <span className={cx('email')}>{email}</span>
                </div>
                <div className={cx('time')}>{time}</div>
                <div className={cx('iconRequestFriend')}>
                    <FontAwesomeIcon className={cx('icon')} icon={icon} />
                </div>
            </div>
        </div>
    );
}

export default ItemChat;
export { emitter };
