import React, { useState, useEffect } from 'react';
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
    const [friendList, setFriendList] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState('');
    const storedData = localStorage.getItem('loginData');
    const userId = JSON.parse(storedData).foundUser._id;

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/getFriendList/${userId}`);
                setFriendList(response.data.friendList);
            } catch (error) {
                console.error('Error fetching friend list:', error);
            }
        };

        fetchFriendList();
    }, [userId]);

    async function handleSearch() {
        try {
            const response = await axios.get(`http://localhost:4000/user/findUserByEmail/${searchEmail}`);
            if (response.data.success) {
                const foundUser = response.data.user;
                if (foundUser.email === JSON.parse(storedData).foundUser.email) {
                    setSearchResults([]);
                    setSearchError('Đây là địa chỉ email của bạn.');
                } else {
                    setSearchResults([foundUser]);
                    setSearchError('');
                }
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
            alert('Đã gửi lời mời kết bạn'); // Hiển thị thông báo đã gửi lời mời kết bạn
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    }

    function isFriend(userId) {
        return friendList.some((friend) => friend._id === userId);
    }
    function empty() {
        setSearchResults([]);
        setSearchError('');
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
                icon={isFriend(user._id) ? null : faUserPlus} // Hiển thị icon bất kể user có là bạn bè hay không
                onItemClick={isFriend(user._id) ? empty : () => onItemClick(user)} // Không cần kiểm tra điều kiện, onItemClick vẫn được gán cho mọi user
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
