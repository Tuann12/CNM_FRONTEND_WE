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
    const [selectedCoLeader, setSelectedCoLeader] = useState(null);

    const storedData = localStorage.getItem('loginData');
    const userId = JSON.parse(storedData).foundUser._id;
    const handleCoLeaderSelection = (friendId) => {
        setSelectedCoLeader(friendId); // Cập nhật ID của nhóm phó đã chọn
    };
    useEffect(() => {
        console.log(`ShareMessage component is called with action: ${action}`, groupId);
        switch (action) {
            case 'addMember':
                fetchNonGroupFriends();
                break;
            case 'deleteMember':
                fetchMembersList();
                console.log('Delete member action');
                break;
            case 'assignRole':
                fetchMembersForCoLeader();
                console.log('Assign role action');
                break;
            default:
                fetchFriendList();
                break;
        }
    }, [action]);
    const fetchMembersList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/group/getGroupMembers/${groupId}`);
            const filteredMembers = response.data.groupMembers.filter((member) => member.role !== 'leader');
            setFriendList(filteredMembers);
        } catch (error) {
            console.error('Error fetching members list:', error);
        }
    };
    const fetchMembersForCoLeader = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/group/getGroupMembers/${groupId}`);
            const filteredMembers = response.data.groupMembers.filter(
                (member) => member.role !== 'leader' && member.role !== 'coLeader',
            );
            console.log('Filtered members:', filteredMembers);
            setFriendList(filteredMembers);
        } catch (error) {
            console.error('Error fetching members list:', error);
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

    const fetchNonGroupFriends = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/group/getNonGroupFriends/${userId}/${groupId}`);
            const { friendList } = response.data;
            setFriendList(friendList);
        } catch (error) {
            console.error('Error fetching non-group friends:', error);
        }
    };
    const sendForwardMessageRequest = async () => {
        try {
            const response = await axios.post('http://localhost:4000/forwardMessage', {
                from: userId,
                to: selectedFriendIds,
                message: sharedMessage.message,
            });
            console.log('Response from handleShare:', response.data);
            alert('Chia sẻ thành công!'); // Thông báo thành công
            handleHide(); // Ẩn component sau khi hoàn thành hành động
        } catch (error) {
            console.error('Error sharing message:', error);
        }
    };
    const addMemberToGroup = async (groupId, selectedFriendIds, handleHide) => {
        try {
            const response = await axios.put(`http://localhost:4000/group/addMemberToGroup/${groupId}`, {
                memberIds: selectedFriendIds,
            });
            console.log('Response from addMemberToGroup:', response.data);
            alert('Thêm thành viên vào nhóm thành công!');
            handleHide();
        } catch (error) {
            console.error('Error adding member to group:', error);
        }
    };
    const removeMembersFromGroup = async (groupId, memberIdsToRemove, handleHide) => {
        try {
            const response = await axios.put(`http://localhost:4000/group/removeMembersFromGroup/${groupId}`, {
                memberIds: memberIdsToRemove,
            });
            console.log('Response from removeMembersFromGroup:', response.data);
            alert('Xóa thành viên khỏi nhóm thành công!');
            handleHide();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                // Otherwise, log the error
                console.error('Error removing members from group:', error);
            }
        }
    };
    const setCoLeader = async (groupId, userId) => {
        try {
            const response = await axios.put(`http://localhost:4000/group/setCoLeader/${groupId}/${userId}`);
            console.log('Response from setCoLeader:', response.data);
            alert('Đặt thành viên làm nhóm phó thành công!');
            handleHide();
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

    const handleHide = () => {
        onHide();
    };

    const handleShare = async () => {
        switch (action) {
            case 'addMember':
                addMemberToGroup(groupId, selectedFriendIds, handleHide);
                break;
            case 'deleteMember':
                removeMembersFromGroup(groupId, selectedFriendIds, handleHide);
                break;
            case 'assignRole':
                setCoLeader(groupId, selectedFriendIds, handleHide);
                break;
            default:
                sendForwardMessageRequest();
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

    const toggleFriendSelection1 = (friendId) => {
        const isSelected = selectedFriendIds.includes(friendId);
        let updatedSelectedFriendIds = [];
        if (isSelected) {
            // Nếu mục đã được chọn, chỉ giữ mục đó
            updatedSelectedFriendIds = [friendId];
        } else {
            // Nếu mục chưa được chọn, loại bỏ tất cả các mục khác và thêm mục mới
            updatedSelectedFriendIds = [friendId];
        }
        setSelectedFriendIds(updatedSelectedFriendIds);
    };

    const onCheckboxChange = (event) => {
        const { value } = event.target;
        switch (action) {
            case 'assignRole':
                toggleFriendSelection1(value);
                break;
            default:
                toggleFriendSelection(value);
                break;
        }
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
                                        onItemClick={() => {
                                            switch (action) {
                                                case 'assignRole':
                                                    toggleFriendSelection1(friend._id);
                                                    break;
                                                default:
                                                    toggleFriendSelection(friend._id);
                                                    break;
                                            }
                                        }}
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
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export default ShareMessage;
