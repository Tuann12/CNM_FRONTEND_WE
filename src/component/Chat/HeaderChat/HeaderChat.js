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
    const [showShareMessage, setShowShareMessage] = useState(false); // State to control the ShareMessage component

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleAddMember = () => {
        setShowShareMessage({ action: 'addMember' });
    };

    const handleDeleteMember = () => {
        setShowShareMessage({ action: 'deleteMember' });
    };

    const handleAssignRole = () => {
        setShowShareMessage({ action: 'assignRole' });
    };
    const handleDeleteGroup = async () => {
        try {
            // Gọi API xóa nhóm
            await axios.delete(`http://localhost:4000/group/deleteGroup/${itemData.id}`);

            // Đóng popup sau khi xóa nhóm thành công
            setIsPopupOpen(false);

            // Hiển thị thông báo hoặc thực hiện các xử lý khác nếu cần
            alert('Nhóm đã được giải tán thành công');
        } catch (error) {
            console.error('Error deleting group:', error);
            alert('Đã xảy ra lỗi khi giải tán nhóm');
        }
    };

    const onHideShareMessage = () => {
        // Function to handle hiding the ShareMessage component
        setShowShareMessage(false);
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

    return (
        <div className={cx('wrapper')}>
            {/* Content of HeaderChat component */}
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
                        <li onClick={handleAddMember}>Thêm thành viên</li>
                        <li onClick={handleDeleteMember}>Xóa thành viên</li>
                        <li onClick={handleAssignRole}>Gán quyền</li>
                        <li onClick={handleDeleteGroup}>Giải tán</li>
                    </ul>
                </div>
            )}

            {/* Render ShareMessage component if showShareMessage state is true */}
            {showShareMessage && <ShareMessage onHide={onHideShareMessage} action={showShareMessage.action} />}
        </div>
    );
}

export default HeaderChat;
