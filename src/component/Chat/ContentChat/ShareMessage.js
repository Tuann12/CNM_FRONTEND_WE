import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentChat.module.scss';
import ListChat from '../../BoxChat/ListChat/ListChat';
import ItemChat from '../../BoxChat/ListChat/ItemChat';
import axios from 'axios';

const cx = classNames.bind(styles);

function ShareMessage({ sharedMessage, onHide, action, groupId }) {
    console.log('sharedMessage', sharedMessage);
    const [friendList, setFriendList] = useState([]);
    const [selectedFriendIds, setSelectedFriendIds] = useState([]);

    const storedData = localStorage.getItem('loginData');
    const userId = JSON.parse(storedData).foundUser._id;
    useEffect(() => {
        console.log(`ShareMessage component is called with action: ${action}`, groupId);
        switch (action) {
            case 'addMember':
                fetchNonGroupFriends();
                break;
            case 'deleteMember':
                console.log('Delete member action');
                break;
            case 'assignRole':
                console.log('Assign role action');
                break;
            default:
                break;
        }
    }, [action]);
    const fetchNonGroupFriends = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/group/getNonGroupFriends/${userId}/${groupId}`);
            const { friendList } = response.data;
            setFriendList(friendList);
        } catch (error) {
            console.error('Error fetching non-group friends:', error);
        }
    };

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

    const handleHide = () => {
        onHide();
    };

    const handleShare = async () => {
        try {
            const response = await axios.post('http://localhost:4000/forwardMessage', {
                from: userId,
                to: selectedFriendIds,
                message: sharedMessage.message,
            });
            console.log('response cua ham handleShare', response.data);
            alert('Chia sẻ thành công!'); // Thông báo chia sẻ thành công
            handleHide(); // Khi chia sẻ thành công, ẩn component
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
        <div className={cx('wrapListShare')}>
            <div className={cx('containerListShare')}>
                <div className={cx('iconClose')} onClick={handleHide}>
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
                                            <img className={cx('avatarImg')} src={getAvatarUrl(friend)} alt="avatar" />
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
    );
}

export default ShareMessage;
