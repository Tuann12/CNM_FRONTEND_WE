import { useState } from 'react';
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

    const handleUpdate = () => {
        onUpdateInfo(name, gender);
        onFileChange(avatar);
        onCancel();
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
                <button className={cx('btnUpdate')} onClick={handleUpdate}>
                    Cập nhật
                </button>
            </div>
        </div>
    );
}
export default UpdateInfo;
