import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCamera } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import ListChat from '../ListChat/ListChat';
import ItemChat from '../ListChat/ItemChat';
import axios from 'axios';

const cx = classNames.bind(styles);

const CreateGroup = ({ onHide }) => {
    const [friendList, setFriendList] = useState([]);
    const [selectedFriendIds, setSelectedFriendIds] = useState([]);
    const [groupName, setGroupName] = useState(''); // Thêm state để lưu tên nhóm
    const [avatarToSend, setAvatarToSend] = useState(null);
    const [avatar, setAvatar] = useState(null);
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

    const getAvatarUrl = (friend) => {
        return friend.avatar
            ? friend.avatar
            : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg';
    };

    const handleHide = () => {
        onHide();
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

    const handleFileChange = async (e) => {
        const imageUrl = e.target.files[0]; // Get the selected file
        setAvatar(imageUrl); // Set the selected file as the avatar

        if (imageUrl) {
            // Check if an image is selected
            try {
                // Create formData to send the avatar file to the server
                const formData = new FormData();
                formData.append('avatar', imageUrl);

                // Send the avatar file to the API
                const avatarResponse = await fetch(`http://localhost:4000/user/uploadAvatarS3/${userId}`, {
                    method: 'POST',
                    body: formData,
                });

                // Check if the avatar was uploaded successfully
                if (!avatarResponse.ok) {
                    throw new Error('Failed to upload avatar');
                }

                // Get the URL of the uploaded avatar from the API response
                const avatarData = await avatarResponse.json();
                const updatedAvatarUrl = avatarData.avatar;
                console.log('updatedAvatarUrl:', updatedAvatarUrl);

                // Set the updatedAvatarUrl state
                setAvatarToSend(updatedAvatarUrl);
            } catch (error) {
                console.error('Error uploading avatar:', error);
                // Handle error uploading avatar
            }
        }
    };

    const createGroup = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/group/newGroups`, {
                name: groupName,
                creatorId: userId,
                avatar: avatarToSend,
                members: [...selectedFriendIds, userId],
            });
            console.log('Group created successfully:', response.data);
            alert('Tạo nhóm thành công');
            handleHide();
        } catch (error) {
            console.error('Error creating group:', error);
            // Handle error creating group
        }
    };

    return (
        <div className={cx('wrapListShare')}>
            <div className={cx('containerListShare')}>
                <div className={cx('headerGroup')}>
                    <div>
                        <h3 className={cx('titleGroup')}>Tạo Nhóm</h3>
                    </div>
                    <div className={cx('iconClose')} onClick={handleHide}>
                        <FontAwesomeIcon className={cx('iconX')} icon={faXmark} />
                    </div>
                </div>
                <div className={cx('wrapInp')}>
                    <div className={cx('uploadAvt')}>
                        <label htmlFor="avatarInput" className={cx('lblTitle')}>
                            <FontAwesomeIcon className={cx('iconEditAvt')} icon={faCamera} />
                        </label>
                        <input
                            type="file"
                            id="avatarInput"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className={cx('inpCreateGroup')}>
                        <input
                            className={cx('inpCreateTitleGroup')}
                            placeholder="Nhập tên nhóm..."
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
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

                <button className={cx('btnUpdate')} onClick={createGroup}>
                    Tạo Nhóm
                </button>
            </div>
        </div>
    );
};

export default CreateGroup;
