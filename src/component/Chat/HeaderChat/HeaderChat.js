import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMagnifyingGlass, faUserGroup, faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './HeaderChat.module.scss';
import { emitter } from '../../BoxChat/ListChat/ItemChat';
import ShareMessage from '../../Chat/ContentChat/ShareMessage';
import axios from 'axios';
import { faUserMinus, faUserTimes, faUserSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HeaderChat() {
    const [itemData, setItemData] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showShareMessage, setShowShareMessage] = useState({ action: '', groupId: '' });
    const [membersList, setMembersList] = useState([]);
    const [showMembersList, setShowMembersList] = useState(false); // State to control member list visibility
    const [role, setRole] = useState(''); // State to store role of current user in group
    const storedData = localStorage.getItem('loginData');
    let userId = JSON.parse(storedData).foundUser._id;
    const [reloadComponent, setReloadComponent] = useState(false); // State để reload component

    const socketRef = useRef();
    const host = 'http://localhost:4000';
    useEffect(() => {
        socketRef.current = socketIOClient.connect(host);
        socketRef.current.on('getId', (data) => {});

        socketRef.current.on('transferLeader', () => {
            setReloadComponent((prevState) => !prevState);
            setIsPopupOpen(false);
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    useEffect(() => {
        setIsPopupOpen(false);
    }, [itemData]);
    const togglePopup = async () => {
        setIsPopupOpen(!isPopupOpen);
        const response = await axios.get(`http://localhost:4000/group/getGroupMembers/${itemData.id}`);
        console.log('role:', response.data.groupMembers);
        const role = response.data.groupMembers.find((member) => member._id === userId).role;
        console.log('role of user:', role);
        setRole(role);
        setShowMembersList(false);
    };

    const fetchMembersList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/group/getGroupMembers/${itemData.id}`);
            setMembersList(response.data.groupMembers);
            setShowMembersList(true);
        } catch (error) {
            console.error('Error fetching members list:', error);
        }
    };

    const handleViewMembers = () => {
        togglePopup();
        setMembersList(true);
        if (isPopupOpen) {
            console.log('Fetching members list');
            fetchMembersList();
        } else {
            console.log('Closing members list');
            setShowMembersList(false); // Hide members list when closing popup
        }
    };
    const handleAddMember = () => {
        setShowShareMessage({ action: 'addMember', groupId: itemData.id });
        setIsPopupOpen(false);
    };

    const handleDeleteMember = () => {
        setShowShareMessage({ action: 'deleteMember', groupId: itemData.id });
        setIsPopupOpen(false);
    };

    const handleAssignRole = () => {
        setShowShareMessage({ action: 'assignRole', groupId: itemData.id });
        setIsPopupOpen(false);
    };
    const handleTranferLeader = () => {
        setShowShareMessage({ action: 'transferLeader', groupId: itemData.id });
        setIsPopupOpen(false);
    };
    const handleLeaveGroup = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/group/leaveGroup/${itemData.id}/${userId}`);
            console.log('Response from setCoLeader:', response.data);

            alert('Rời khỏi nhóm thành công!');
            await socketRef.current.emit('addGroup', {
                responseData: 'deleteGroup',
            });
            setIsPopupOpen(false);
            setItemData({});
            return response.data; // Trả về dữ liệu phản hồi từ API
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                // Otherwise, log the error
                console.error('Error removing members from group:', error);
            }
        }
    };
    const handleDeleteGroup = async () => {
        try {
            await axios.delete(`http://localhost:4000/group/deleteGroup/${itemData.id}`);
            await socketRef.current.emit('addGroup', {
                responseData: 'deleteGroup',
            });
            setItemData({});
            setIsPopupOpen(false);
            alert('Nhóm đã được giải tán thành công');
        } catch (error) {
            console.error('Error deleting group:', error);
            alert('Đã xảy ra lỗi khi giải tán nhóm');
        }
    };
    const onHideShareMessage = () => {
        setShowShareMessage({ action: '', groupId: '' });
    };

    useEffect(() => {
        const handler = (data) => {
            setItemData(data);
        };

        emitter.on('itemClick', handler);

        return () => {
            emitter.off('itemClick', handler);
        };
    }, []);
    const clostList = () => {
        setShowMembersList(false);
    };
    const handleUnfriend = async () => {
        try {
            const response = await axios.post('http://localhost:4000/user/cancelFriendship', {
                userId: userId,
                friendId: itemData.id,
            });
            alert('Hủy kết bạn thành công');
            await socketRef.current.emit('addGroup', {
                responseData: 'deleteGroup',
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                // Otherwise, log the error
                console.error('Error removing members from group:', error);
            }
        }
    };
    console.log('showMembersList:', showMembersList);
    console.log('membersList:', membersList);
    console.log('isShowPopup:', isPopupOpen);
    let renderMenuItems;
    if (role === 'leader') {
        renderMenuItems = (
            <>
                <li onClick={handleViewMembers}>Xem Danh sách thành viên</li>
                <li onClick={handleAddMember}>Thêm thành viên</li>
                <li onClick={handleDeleteMember}>Xóa thành viên</li>
                <li onClick={handleAssignRole}>Gán nhóm phó</li>
                <li onClick={handleTranferLeader}>Nhường nhóm trưởng</li>
                <li onClick={handleDeleteGroup}>Giải tán</li>
            </>
        );
    } else if (role === 'coLeader') {
        renderMenuItems = (
            <>
                <li onClick={handleViewMembers}>Xem Danh sách thành viên</li>
                <li onClick={handleAddMember}>Thêm thành viên</li>
                <li onClick={handleDeleteMember}>Xóa thành viên</li>
                <li onClick={handleLeaveGroup}>Rời nhóm</li>
            </>
        );
    } else if (role === 'member') {
        renderMenuItems = (
            <>
                <li onClick={handleViewMembers}>Xem Danh sách thành viên</li>
                <li onClick={handleLeaveGroup}>Rời nhóm</li>
            </>
        );
    } else {
        renderMenuItems = null; // Optionally, handle other roles or no role
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('Info')}>
                <img
                    className={cx('avatarImg')}
                    src={
                        itemData.avatar
                            ? itemData.avatar.props.src
                            : 'https://vapa.vn/wp-content/uploads/2022/12/anh-nen-mau-trang-001.jpg'
                    }
                    alt={itemData.avatar ? itemData.avatar.props.alt : 'placeholder'}
                />
                <h3 className={cx('title')}>{itemData.title}</h3>
            </div>
            <div className={cx('wrapIcon')}>
                {itemData.type === 'friend' && (
                    <div className={cx('icon')} onClick={handleUnfriend}>
                        <FontAwesomeIcon icon={faUserSlash} />
                    </div>
                )}
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faVideo} />
                </div>
                {itemData.type === 'group' && (
                    <div className={cx('icon')} onClick={togglePopup}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                )}
            </div>

            {isPopupOpen && (
                <div className={cx('popup')}>
                    <ul>{renderMenuItems}</ul>
                </div>
            )}

            {showMembersList && (
                <div className={cx('popup')}>
                    <ul>
                        {membersList.map((member) => (
                            <div key={member._id}>
                                <li>
                                    {member.name} - {member.role}
                                </li>
                            </div>
                        ))}
                    </ul>
                    <button onClick={clostList}>Đóng</button>
                </div>
            )}
            {showShareMessage.action && (
                <ShareMessage
                    onHide={onHideShareMessage}
                    action={showShareMessage.action}
                    groupId={showShareMessage.groupId}
                />
            )}
        </div>
    );
}
export default HeaderChat;
