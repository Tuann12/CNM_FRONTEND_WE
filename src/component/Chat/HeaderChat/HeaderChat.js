import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMagnifyingGlass, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './HeaderChat.module.scss';
import { emitter } from '../../BoxChat/ListChat/ItemChat';

const cx = classNames.bind(styles);

function HeaderChat() {
    const [itemData, setItemData] = useState({ avatar: '', title: '' });

    useEffect(() => {
        const handler = (data) => {
            setItemData(data);
        };

        emitter.on('itemClick', handler);

        return () => {
            emitter.off('itemClick', handler);
        };
    }, []);
    console.log(itemData.avatar);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('Info')}>
                <img
                    className={cx('avatarImg')}
                    src={itemData.avatar ? itemData.avatar.props.src : 'placeholder.jpg'}
                    alt={itemData.avatar ? itemData.avatar.props.alt : 'placeholder'}
                />
                <h3 className={cx('title')}>{itemData.title}</h3>
            </div>
            <div className={cx('wrapIcon')}>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faUserGroup} />
                </div>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faVideo} />
                </div>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faUserGroup} />
                </div>
            </div>
        </div>
    );
}
export default HeaderChat;
