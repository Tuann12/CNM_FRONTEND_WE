import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faUserPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import ListChat from '../../component/BoxChat/ListChat/ListChat';
import ItemChat from '../../component/BoxChat/ListChat/ItemChat';
import Navbar from '../../component/Navbar/Navbar';
import axios from 'axios';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

function Contact() {
    const [friendList, setFriendList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [friendRequestsSent, setFriendRequestsSent] = useState([]);
    const [showFriendRequests, setShowFriendRequests] = useState(false);
    const [activeTab, setActiveTab] = useState('listFriends'); // State để theo dõi tab nào đang được chọn
    const storedData = localStorage.getItem('loginData');
    const userId = JSON.parse(storedData).foundUser._id;

    useEffect(() => {
        fetchFriendList();
        fetchFriendRequestsSent();
        fetchGroupList();
    }, []);

    const fetchFriendRequestsSent = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/user/getFriendRequestsSentToUser/${userId}`);
            setFriendRequestsSent(response.data.friendRequestsSent);
        } catch (error) {
            console.error('Error fetching friend requests sent:', error);
        }
    };

    const fetchFriendList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/user/getFriendList/${userId}`);
            setFriendList(response.data.friendList);
        } catch (error) {
            console.error('Error fetching friend list:', error);
        }
    };

    const fetchGroupList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/group/getGroupList/${userId}`);
            setGroupList(response.data.userData.groupList);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleAccept = async (user) => {
        try {
            const response = await axios.post('http://localhost:4000/user/acceptFriendRequestAndSendMessage', {
                userId: JSON.parse(storedData).foundUser._id,
                friendId: user._id,
            });
            console.log(response.data.message);
            setFriendRequestsSent((prevRequests) => prevRequests.filter((request) => request._id !== user._id));
            alert('Đã chấp nhận lời mời kết bạn');
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleDecline = async (user) => {
        try {
            const response = await axios.post('http://localhost:4000/user/rejectFriendRequest', {
                userId: JSON.parse(storedData).foundUser._id,
                friendId: user._id,
            });
            console.log(response.data.message);
            setFriendRequestsSent((prevRequests) => prevRequests.filter((request) => request._id !== user._id));
            alert('Đã từ chối lời mời kết bạn');
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };

    const onItemClick = (item, type) => {
        console.log('Đã chọn:', type, item);
    };

    const getAvatarUrl = (user) => {
        return user.avatar
            ? user.avatar
            : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg';
    };

    const handleNavClick = (tabName) => {
        setActiveTab(tabName); // Đặt tab được chọn thành active
        if (tabName === 'listAcceptFriends') {
            setShowFriendRequests(true);
            fetchFriendRequestsSent();
        } else if (tabName === 'listGroup') {
            // Thêm điều kiện để xử lý tab "Danh sách nhóm"
            setShowFriendRequests(false);
            fetchGroupList(); // Gọi hàm fetchGroupList khi tab "Danh sách nhóm" được chọn
        } else {
            setShowFriendRequests(false);
            fetchFriendList();
        }
    };

    const renderFriendList = () => {
        return (
            <div className={cx('wrapListFriends')}>
                <ListChat>
                    {friendList.map((friend) => (
                        <div className={cx('itemChat')}>
                            <ItemChat
                                key={friend._id}
                                id={friend._id}
                                avatar={<img className={cx('avatarImg')} src={getAvatarUrl(friend)} alt="avatar" />}
                                title={friend.name}
                                onItemClick={() => onItemClick(friend, 'friend')}
                                type="friend"
                            />
                        </div>
                    ))}
                </ListChat>
            </div>
        );
    };

    const renderFriendRequestsList = () => {
        return (
            <div className={cx('wrapFriendRequestList')}>
                <ListChat>
                    {friendRequestsSent.map((user, index) => (
                        <div key={index} className={cx('itemChat')}>
                            <ItemChat
                                avatar={<img className={cx('avatarImg')} src={getAvatarUrl(user)} alt="avatar" />}
                                title={user.name}
                                email={user.email}
                                iconAccept={faCheck}
                                iconDecline={faTimes}
                                onAdd={() => handleAccept(user)}
                                onDec={() => handleDecline(user)}
                            />
                        </div>
                    ))}
                </ListChat>
            </div>
        );
    };

    const renderGroupList = () => {
        return (
            <div className={cx('wrapListGroup')}>
                <ListChat>
                    {groupList.map((group) => (
                        <div className={cx('itemChat')}>
                            <ItemChat
                                key={group._id}
                                id={group._id}
                                avatar={<img className={cx('avatarImg')} src={group.avatar} alt="avatar" />}
                                title={group.name}
                                onItemClick={() => onItemClick(group, 'group')}
                                type="group"
                                groupID={group._id}
                            />
                        </div>
                    ))}
                </ListChat>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('container')}>
                <div className={cx('nav')}>
                    <div
                        className={cx('listFriends', { active: activeTab === 'listFriends' })}
                        onClick={() => handleNavClick('listFriends')}
                    >
                        <FontAwesomeIcon icon={faUserGroup} className={cx('icon')} />
                        <span className={cx('title')}>Danh sách bạn bè</span>
                    </div>
                    <div
                        className={cx('listGroup', { active: activeTab === 'listGroup' })}
                        onClick={() => handleNavClick('listGroup')}
                    >
                        <FontAwesomeIcon icon={faUserPlus} className={cx('icon')} />
                        <span className={cx('title')}>Danh sách nhóm</span>
                    </div>
                    <div
                        className={cx('listAcceptFriends', { active: activeTab === 'listAcceptFriends' })}
                        onClick={() => handleNavClick('listAcceptFriends')}
                    >
                        <FontAwesomeIcon icon={faUserPlus} className={cx('icon')} />
                        <span className={cx('title')}>Danh sách chờ kết bạn</span>
                    </div>
                </div>
                {showFriendRequests
                    ? renderFriendRequestsList()
                    : activeTab === 'listGroup'
                    ? renderGroupList()
                    : renderFriendList()}
            </div>
        </div>
    );
}

export default Contact;
