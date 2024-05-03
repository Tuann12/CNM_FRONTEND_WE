import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faImage } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './UpdateInfo.module.scss';

const cx = classNames.bind(styles);

function UpdateInfo({ onCancel, onClose, onUpdateInfo }) {
    const userData = JSON.parse(localStorage.getItem('loginData'));
    const [name, setName] = useState(userData.foundUser.name || '');
    const [gender, setGender] = useState(userData.foundUser.gender || false);
    const [avatar, setAvatar] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
        setIsDirty(true);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value === 'male' ? true : false);
        setIsDirty(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setIsDirty(true);
    };

    const handleUpdate = async () => {
        try {
            let updatedAvatarUrl = userData.foundUser.avatar;

            if (avatar) {
                // Tạo formData để gửi file avatar lên server
                const formData = new FormData();
                formData.append('avatar', avatar);

                // Gửi file avatar lên API
                const avatarResponse = await fetch(
                    `https://backend-chatapp-rdj6.onrender.com/user/uploadAvatarS3/${userData.foundUser._id}`,
                    {
                        method: 'POST',
                        body: formData,
                    },
                );

                // Lấy URL của avatar đã tải lên từ phản hồi của API upload
                const avatarData = await avatarResponse.json();
                updatedAvatarUrl = avatarData.avatar;
            }

            const updatedUserData = {
                name: name,
                gender: Boolean(gender),
                avatar: updatedAvatarUrl || (userData.foundUser.avatar ? userData.foundUser.avatar : null),
            };

            const response = await fetch(
                `https://backend-chatapp-rdj6.onrender.com/user/updateUser/${userData.foundUser._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUserData),
                },
            );

            const updatedUser = await response.json();
            if (!response.ok) {
                throw new Error('Failed to update user data');
            } else {
                const newUserData = {
                    ...userData,
                    foundUser: updatedUser,
                };
                localStorage.setItem('loginData', JSON.stringify(newUserData));
                alert('Cập nhật thông tin thành công');
                onUpdateInfo(updatedUserData.name, updatedUserData.gender, updatedUserData.avatar);
                setIsDirty(false);
                onCancel();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('profileHeader')}>
                <div className={cx('boxIcon')} onClick={onCancel}>
                    <FontAwesomeIcon className={cx('icon')} icon={faChevronLeft} />
                </div>
                <h3 className={cx('title')}>Cập nhật thông tin cá nhân</h3>
                <div className={cx('boxIcon')} onClick={onClose}>
                    <FontAwesomeIcon className={cx('icon')} icon={faXmark} />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('boxName')}>
                    <h3 className={cx('lblName')}> Tên hiển thị</h3>
                    <input className={cx('inpName')} type="text" value={name} onChange={handleNameChange} />
                </div>

                <div className={cx('boxInfo')}>
                    <h3 className={cx('lblInfo')}>Thông tin cá nhân</h3>
                    <div className={cx('boxGender')}>
                        <label>
                            <input
                                className={cx('inpGender')}
                                defaultChecked={gender}
                                value="male"
                                type="radio"
                                name="gender"
                                onChange={handleGenderChange}
                            />
                            Nam
                        </label>

                        <label>
                            <input
                                className={cx('inpGender')}
                                checked={!gender}
                                value="female"
                                type="radio"
                                name="gender"
                                onChange={handleGenderChange}
                            />
                            Nữ
                        </label>
                    </div>
                </div>
                <div className={cx('uploadAvt')}>
                    <label htmlFor="avatarInput" className={cx('lblTitle')}>
                        <FontAwesomeIcon className={cx('iconEditAvt')} icon={faImage} />
                        Tải lên từ máy tính
                    </label>
                    <input
                        type="file"
                        id="avatarInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            <div className={cx('bottomUpdate')}>
                <button className={cx('btnCancel')} onClick={onCancel}>
                    Hủy
                </button>
                <button className={cx('btnUpdate')} onClick={handleUpdate} disabled={!isDirty}>
                    Cập nhật
                </button>
            </div>
        </div>
    );
}
export default UpdateInfo;
