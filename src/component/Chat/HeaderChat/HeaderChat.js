import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMagnifyingGlass, faUserGroup, faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './HeaderChat.module.scss';
import { emitter } from '../../BoxChat/ListChat/ItemChat';

const cx = classNames.bind(styles);

function HeaderChat(parsedData) {
    const [itemData, setItemData] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleAddMember = () => {
        // Xử lý khi nhấn vào thêm thành viên
    };

    const handleDeleteMember = () => {
        // Xử lý khi nhấn vào xóa thành viên
    };

    const handleAssignRole = () => {
        // Xử lý khi nhấn vào phân quyền
    };

    const handleDeleteGroup = () => {
        // Xử lý khi nhấn vào xóa nhóm
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
        </div>
    );
}

export default HeaderChat;
