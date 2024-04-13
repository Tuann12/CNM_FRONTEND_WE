import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMagnifyingGlass, faUserGroup, faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './HeaderChat.module.scss';
import { emitter } from '../../BoxChat/ListChat/ItemChat';
import ShareMessage from '../../Chat/ContentChat/ShareMessage';
import axios from 'axios';

const cx = classNames.bind(styles);

function HeaderChat(parsedData) {
    const [itemData, setItemData] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showShareMessage, setShowShareMessage] = useState({ action: '', groupId: '' });
    const [membersList, setMembersList] = useState([]);
    const [showMembersList, setShowMembersList] = useState(false); // State to control member list visibility

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
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
    };

    const handleDeleteMember = () => {
        // Handle delete member action
    };

    const handleAssignRole = () => {
        // Handle assign role action
    };

    const handleDeleteGroup = async () => {
        try {
            await axios.delete(`http://localhost:4000/group/deleteGroup/${itemData.id}`);
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
    console.log('showMembersList:', showMembersList);
    console.log('membersList:', membersList);
    console.log('isShowPopup:', isPopupOpen);
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
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faUserGroup} />
                </div>
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
                    <ul>
                        <li onClick={handleViewMembers}>Xem Danh sách thành viên</li>
                        <li onClick={handleAddMember}>Thêm thành viên</li>
                        <li onClick={handleDeleteMember}>Xóa thành viên</li>
                        <li onClick={handleAssignRole}>Gán quyền</li>
                        <li onClick={handleDeleteGroup}>Giải tán</li>
                    </ul>
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
