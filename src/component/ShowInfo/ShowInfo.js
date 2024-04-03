import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { faXmark, faPenToSquare, faCamera } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ShowInfo.module.scss';
import UpdateInfo from './UpdateInfo/UpdateInfo';

const cx = classNames.bind(styles);

function ShowInfo({ onHide }) {
    const [isVisible, setIsVisible] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [avatarImage, setAvatarImage] = useState(null);
    const userData = JSON.parse(localStorage.getItem('loginData'));

    const handleUpdate = () => {
        setShowUpdate(true);
    };

    const handleCancel = () => {
        setShowUpdate(false);
    };

    const handleHide = () => {
        onHide();
    };

    // Hàm xử lý khi người dùng chọn hình ảnh
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setAvatarImage(imageUrl); // Cập nhật state với URL của hình ảnh
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    console.log('userData', userData);
    console.log('userData', JSON.parse(localStorage.getItem('loginData')));

    return (
        <div>
            <div className={cx('overlay')}></div>
            {showUpdate ? (
                <UpdateInfo onCancel={handleCancel} onClose={handleHide} />
            ) : (
                <div className={cx('wrapper', { visible: isVisible })}>
                    <div className={cx('profileHeader')}>
                        <h3 className={cx('title')}>Thông tin tài khoản</h3>
                        <div className={cx('boxIcon')} onClick={handleHide}>
                            <FontAwesomeIcon className={cx('icon')} icon={faXmark} />
                        </div>
                    </div>
                    <div className={cx('profileContent')}>
                        <div className={cx('banner')}>
                            <img
                                className={cx('bannerImg')}
                                src="https://cover-talk.zadn.vn/5/a/1/b/7/dc602e48929270e32806de153cb3c2e9.jpg"
                                alt="banner"
                            />
                        </div>
                        <div className={cx('boxAvt')}>
                            <div className={cx('avt')}>
                                <img
                                    className={cx('avtImg')}
                                    src={
                                        avatarImage ||
                                        userData?.foundUser.avatar ||
                                        'https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg'
                                    }
                                    alt="avt"
                                />
                                <div className={cx('editAvt')}>
                                    <label htmlFor="avatarInput">
                                        <FontAwesomeIcon className={cx('iconEditAvt')} icon={faCamera} />
                                    </label>
                                    <input
                                        type="file"
                                        id="avatarInput"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                            <div className={cx('boxTitle')}>
                                <h3 className={cx('title')}> {userData.foundUser.name || 'John Doe'} </h3>
                                <div className={cx('titleIcon')} onClick={handleUpdate}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <h3 className={cx('infoTitle')}>Thông tin cá nhân</h3>
                            <div className={cx('infoSex')}>
                                <div className={cx('infoSex')}>
                                    <span className={cx('sex')}> Giới tính </span>
                                    <span className={cx('sexResult')}> {userData.foundUser.gender ? 'Nam' : 'Nữ'}</span>
                                </div>
                            </div>
                            <div className={cx('infoEmail')}>
                                <span className={cx('email')}> Email</span>
                                <span className={cx('emailResult')}>
                                    {' '}
                                    {userData.foundUser.email || 'john.doe@example.com'}
                                </span>
                            </div>
                            <div className={cx('update')} onClick={handleUpdate}>
                                <div className={cx('updateContainer')}>
                                    <FontAwesomeIcon className={cx('updateIcon')} icon={faPenToSquare} />
                                    <h3 className={cx('updateTitle')}>Cập nhật</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showUpdate && <UpdateInfo />}
                </div>
            )}
        </div>
    );
}
export default ShowInfo;
