import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './ListChat.module.scss';
import mitt from 'mitt';
import axios from 'axios'; // Import axios to make API calls

const cx = classNames.bind(styles);

const emitter = mitt();

function ItemChat({ avatar, title, contentChat, email, time, icon, iconAccept, iconDecline, onItemClick }) {
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
                <div className={cx('iconAcceptFriends')}>
                    <FontAwesomeIcon className={cx('iconDecline')} icon={iconDecline} />
                    {/* Call handleAccept function when the accept button is clicked */}
                    <FontAwesomeIcon className={cx('iconAccept')} icon={iconAccept} onClick={onItemClick} />
                </div>
            </div>
        </div>
    );
}

export default ItemChat;
export { emitter };
