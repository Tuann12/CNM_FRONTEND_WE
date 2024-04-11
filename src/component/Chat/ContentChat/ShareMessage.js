import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentChat.module.scss';
import ListChat from '../../BoxChat/ListChat/ListChat';
import ItemChat from '../../BoxChat/ListChat/ItemChat';
import axios from 'axios';

const cx = classNames.bind(styles);

function ShareMessage({ sharedMessage }) {
    console.log('sharedMessage', sharedMessage);
    const [friendList, setFriendList] = useState([]);
    const [selectedFriendIds, setSelectedFriendIds] = useState([]);
    const [isShared, setIsShared] = useState(false); // State để điều khiển hiển thị

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

    useEffect(() => {
        if (isShared) {
            // Thực hiện các hành động cần thiết sau khi chia sẻ
            // Ví dụ: Cập nhật lại giao diện, hiển thị thông báo thành công, v.v.
            console.log('Shared successfully!'); // Thông báo chia sẻ thành công (có thể thay bằng hành động thực tế)
        }
    }, [isShared]);
    console.log('share messsage content', sharedMessage.message);

    const handleShare = async () => {
        try {
            const response = await axios.post('http://localhost:4000/forwardMessage', {
                from: userId,
                to: selectedFriendIds,
                message: sharedMessage.message,
            });
            console.log('response cua ham handleShare', response.data);
            alert('Chia sẻ thành công!'); // Thông báo chia sẻ thành công
            setIsShared(true); // Khi chia sẻ thành công, ẩn component
        } catch (error) {
            console.error('Error sharing message:', error);
        }
    };

    const getAvatarUrl = (friend) => {
        return friend.avatar
            ? friend.avatar
            : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg';
    };

    const toggleFriendSelection = (friendId) => {
        const isSelected = selectedFriendIds.includes(friendId);
        const updatedSelectedFriendIds = isSelected
            ? selectedFriendIds.filter((id) => id !== friendId)
            : [...selectedFriendIds, friendId];
        setSelectedFriendIds(updatedSelectedFriendIds);
    };

    const onCheckboxChange = (event) => {
        const { value } = event.target;
        toggleFriendSelection(value);
    };

    const isSelected = (friendId) => {
        return selectedFriendIds.includes(friendId);
    };

    return (
        // Sử dụng biến isShared để điều khiển hiển thị
        !isShared && (
            <div className={cx('wrapListShare')}>
                <div className={cx('containerListShare')}>
                    <div className={cx('iconClose')} onClick={() => setIsShared(true)}>
                        <FontAwesomeIcon className={cx('iconX')} icon={faXmark} />
                    </div>
                    <div className={cx('listFriends')}>
                        <ListChat>
                            {friendList.map((friend) => (
                                <div className={cx('wrapListFriends')}>
                                    <div className={cx('boxFriends')}>
                                        <ItemChat
                                            key={friend._id}
                                            id={friend._id}
                                            avatar={
                                                <img
                                                    className={cx('avatarImg')}
                                                    src={getAvatarUrl(friend)}
                                                    alt="avatar"
                                                />
                                            }
                                            title={friend.name}
                                            onItemClick={() => toggleFriendSelection(friend._id)}
                                        />
                                    </div>
                                    <input
                                        type="checkbox"
                                        className={cx('btnCheck')}
                                        id={`content-${friend._id}`}
                                        name={`content-${friend._id}`}
                                        value={friend._id}
                                        onChange={onCheckboxChange}
                                        checked={isSelected(friend._id)}
                                    />
                                </div>
                            ))}
                        </ListChat>
                    </div>

                    <button className={cx('btnUpdate')} onClick={handleShare}>
                        Chia sẻ
                    </button>
                </div>
            </div>
        )
    );
}

export default ShareMessage;
