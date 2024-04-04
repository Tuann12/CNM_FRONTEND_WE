import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faImage } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './UpdateInfo.module.scss';

const cx = classNames.bind(styles);

function UpdateInfo({ onCancel, onClose, onFileChange, onUpdateInfo }) {
    const userData = JSON.parse(localStorage.getItem('loginData'));
    const [name, setName] = useState(userData.foundUser.name || '');
    const [gender, setGender] = useState(userData.foundUser.gender || false);
    const [avatar, setAvatar] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        // Kiểm tra xem có thay đổi nào được thực hiện không
        setIsDirty(name !== userData.foundUser.name || gender !== userData.foundUser.gender || avatar !== null);
    }, [name, gender, avatar, userData.foundUser.name, userData.foundUser.gender]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value === 'male' ? true : false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file);
    };

    const handleUpdate = async () => {
        try {
            const updatedUserData = {
                name: name,
                gender: gender,
                avatar: avatar, // assuming avatar is sent as binary data
            };

            // Make a PUT request to update the user data
            const response = await fetch(`http://localhost:4000/user/updateUser/${userData.foundUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // You might need to include additional headers like authorization token
                },
                body: JSON.stringify(updatedUserData),
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            } else {
                alert('Cập nhật thông tin thành công');
            }

            // Update local storage with the updated user data
            const updatedUser = await response.json();
            localStorage.setItem(
                'loginData',
                JSON.stringify({
                    foundUser: updatedUser,
                }),
            );

            // Call the onUpdateInfo function (assuming it's responsible for updating some parent component state)
            onUpdateInfo(name, gender);
            onFileChange(avatar);
            setIsDirty(false);
            onCancel();
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
