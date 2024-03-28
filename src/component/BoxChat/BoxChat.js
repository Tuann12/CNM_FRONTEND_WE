import React, { useState } from 'react';
import ListChat from './ListChat/ListChat';
import ItemChat from './ListChat/ItemChat';
import styles from './BoxChat.module.scss';
import classNames from 'classnames/bind';
import avt1 from '../../images/image1.jpeg';

const cx = classNames.bind(styles);

function BoxChat() {
    const [selectedItem, setSelectedItem] = useState(null);

    function onItemClick(item) {
        setSelectedItem(item);
    }

    return (
        <div>
            <ListChat>
                <ItemChat
                    avatar={<img className={cx('avatarImg')} src={avt1} alt="avatar" />}
                    title="Nguyen Van A"
                    contentChat="Hello"
                    time="14 Minutes"
                    onItemClick={onItemClick}
                />
                <ItemChat
                    avatar={
                        <img
                            className={cx('avatarImg')}
                            src="https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205594_wh1200.png"
                            alt="avatar"
                        />
                    }
                    title="Nguyen Van B"
                    contentChat="Hello"
                    time="14 Minutes"
                    onItemClick={onItemClick}
                />
                <ItemChat
                    avatar={
                        <img
                            className={cx('avatarImg')}
                            src="https://img.lovepik.com/free-png/20211204/lovepik-cartoon-avatar-png-image_401302777_wh1200.png"
                            alt="avatar"
                        />
                    }
                    title="Nguyen Van C"
                    contentChat="Hello"
                    time="14 Minutes"
                    onItemClick={onItemClick}
                />
                <ItemChat
                    avatar={
                        <img
                            className={cx('avatarImg')}
                            src="https://img.lovepik.com/free-png/20211206/lovepik-cartoon-avatar-png-image_401349915_wh1200.png"
                            alt="avatar"
                        />
                    }
                    title="Nguyen Van D"
                    contentChat="Hello"
                    time="14 Minutes"
                    onItemClick={onItemClick}
                />
                <ItemChat
                    avatar={
                        <img
                            className={cx('avatarImg')}
                            src="https://img.lovepik.com/free-png/20210926/lovepik-cartoon-avatar-png-image_401440426_wh1200.png"
                            alt="avatar"
                        />
                    }
                    title="Nguyen Van E"
                    contentChat="Hello"
                    time="14 Minutes"
                    onItemClick={onItemClick}
                />
                <ItemChat
                    avatar={
                        <img
                            className={cx('avatarImg')}
                            src="https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205594_wh1200.png"
                            alt="avatar"
                        />
                    }
                    title="Nguyen Van F"
                    contentChat="Hello"
                    time="14 Minutes"
                    onItemClick={onItemClick}
                />
                <ItemChat
                    avatar={
                        <img
                            className={cx('avatarImg')}
                            src="https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205590_wh1200.png"
                            alt="avatar"
                        />
                    }
                    title="Nguyen Van G"
                    contentChat="Hello"
                    time="14 Minutes"
                    onItemClick={onItemClick}
                />
                <ItemChat
                    avatar={
                        <img
                            className={cx('avatarImg')}
                            src="https://img.lovepik.com/element/40120/5298.png_860.png"
                            alt="avatar"
                        />
                    }
                    title="Nguyen Van H"
                    contentChat="Hello"
                    time="14 Minutes"
                    onItemClick={onItemClick}
                />
            </ListChat>
        </div>
    );
}
export default BoxChat;
