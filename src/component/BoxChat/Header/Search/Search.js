import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import ListChat from '../../ListChat/ListChat';
import ItemChat from '../../ListChat/ItemChat';

const cx = classNames.bind(styles);

function Search() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    function onItemClick(item) {
        setSelectedItem(item);
    }

    function filterItems() {
        return searchTerm.trim() !== '' ? (
            <ListChat>
                {filteredItems.map((item, index) => (
                    <ItemChat
                        key={index}
                        avatar={item.avatar}
                        title={item.title}
                        email={item.email}
                        icon={item.icon}
                        onItemClick={onItemClick}
                    />
                ))}
            </ListChat>
        ) : null;
    }

    const filteredItems = [
        {
            avatar: (
                <img
                    className={cx('avatarImg')}
                    src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg"
                    alt="avatar"
                />
            ),
            title: 'Nguyen Van A',
            email: 'ngthtuan333@gmail.com',
            icon: faUserPlus,
        },
        {
            avatar: (
                <img
                    className={cx('avatarImg')}
                    src="https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205594_wh1200.png"
                    alt="avatar"
                />
            ),
            title: 'Nguyen Van B',
            email: 'tuannguyen12@gmail.com',
            icon: faUserPlus,
        },
        {
            avatar: (
                <img
                    className={cx('avatarImg')}
                    src="https://img.lovepik.com/free-png/20211204/lovepik-cartoon-avatar-png-image_401302777_wh1200.png"
                    alt="avatar"
                />
            ),
            title: 'Nguyen Van C',
            email: 'nguyenvanC@gmail.com',
            icon: faUserPlus,
        },
        {
            avatar: (
                <img
                    className={cx('avatarImg')}
                    src="https://img.lovepik.com/free-png/20211206/lovepik-cartoon-avatar-png-image_401349915_wh1200.png"
                    alt="avatar"
                />
            ),
            title: 'Nguyen Van D',
            email: 'dinhdoclap@gmail.com',
            icon: faUserPlus,
        },
    ].filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('searchBox')}>
                <input
                    className={cx('searchBtn')}
                    type="text"
                    placeholder="Tìm kiếm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Tippy
                    interactive
                    placement="bottom"
                    trigger="click"
                    render={(attrs) => (
                        <div className={cx('showBoxSearch')} tabIndex="-1" {...attrs}>
                            {filterItems()}
                        </div>
                    )}
                >
                    <FontAwesomeIcon className={cx('searchIcon')} icon={faMagnifyingGlass} />
                </Tippy>
            </div>
        </div>
    );
}

export default Search;
