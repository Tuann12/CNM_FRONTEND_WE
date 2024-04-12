import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './ListChat.module.scss';
import mitt from 'mitt';
import axios from 'axios'; // Import axios to make API calls

const cx = classNames.bind(styles);

const emitter = mitt();

function ItemChat({
    id,
    avatar,
    title,
    contentChat,
    email,
    time,
    icon,
    group,
    iconAccept,
    iconDecline,
    onItemClick,
    onAdd,
    onDec,
    type,
}) {
    const handleClick = () => {
        onItemClick({ avatar, title, id, type }); // Truyền type khi gọi hàm onItemClick
        emitter.emit('itemClick', { avatar, title, id, type });
        console.log('Item clicked:', { avatar, title, id, type });

        localStorage.setItem('selectedID', id);
    };
    const handleAccept = async (event) => {
        event.stopPropagation();
        onAdd();
    };
    const handleDecline = async (event) => {
        event.stopPropagation();
        onDec();
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
                    <FontAwesomeIcon className={cx('iconDecline')} icon={iconDecline} onClick={handleDecline} />
                    {/* Call handleAccept function when the accept button is clicked */}
                    <FontAwesomeIcon className={cx('iconAccept')} icon={iconAccept} onClick={handleAccept} />
                </div>
            </div>
        </div>
    );
}

export default ItemChat;
export { emitter };
