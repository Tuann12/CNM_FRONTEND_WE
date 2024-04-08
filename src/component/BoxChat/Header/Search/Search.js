import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import ListChat from '../../ListChat/ListChat';
import ItemChat from '../../ListChat/ItemChat';
import axios from 'axios';

const cx = classNames.bind(styles);

function Search() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState('');

    async function handleSearch() {
        try {
            const response = await axios.get(`http://localhost:4000/user/findUserByEmail/${searchEmail}`);
            if (response.data.success) {
                setSearchResults([response.data.user]);
                setSearchError('');
            } else {
                setSearchResults([]);
                setSearchError('Không tìm thấy người dùng');
            }
        } catch (error) {
            console.error('Error searching for user:', error);
            setSearchError('Đã xảy ra lỗi khi tìm kiếm người dùng');
        }
    }

    async function onItemClick(item) {
        setSelectedItem(item);
        const storedData = localStorage.getItem('loginData');
        console.log(JSON.parse(storedData));
        try {
            const response = await axios.post('http://localhost:4000/user/sendFriendRequest', {
                senderId: JSON.parse(storedData).foundUser._id, // Lấy ID của người gửi từ localStorage
                receiverId: item._id, // Lấy ID của người nhận từ item được nhấp
            });
            console.log(response.data.message); // In ra thông báo từ server
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    }

    function renderSearchResults() {
        return searchResults.map((user, index) => (
            <ItemChat
                key={index}
                avatar={
                    user.avatar ? (
                        <img className={cx('avatarImg')} src={user.avatar} alt="avatar" />
                    ) : (
                        <img
                            className={cx('avatarImg')}
                            src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg"
                            alt="default-avatar"
                        />
                    )
                }
                title={user.name}
                email={user.email}
                icon={faUserPlus}
                onItemClick={() => onItemClick(user)} // Truyền user vào hàm onItemClick
            />
        ));
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('searchBox')}>
                <input
                    className={cx('searchBtn')}
                    type="text"
                    placeholder="Tìm kiếm"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
                <Tippy
                    interactive
                    placement="bottom"
                    trigger="click"
                    render={(attrs) => (
                        <div className={cx('showBoxSearch')} tabIndex="-1" {...attrs}>
                            {searchResults.length > 0 ? (
                                <ListChat>{renderSearchResults()}</ListChat>
                            ) : (
                                <p>{searchError}</p>
                            )}
                        </div>
                    )}
                >
                    <FontAwesomeIcon className={cx('searchIcon')} icon={faMagnifyingGlass} onClick={handleSearch} />
                </Tippy>
            </div>
        </div>
    );
}

export default Search;
