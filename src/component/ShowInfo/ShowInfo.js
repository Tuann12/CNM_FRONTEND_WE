import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { faXmark, faPenToSquare, faCamera } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ShowInfo.module.scss';

const cx = classNames.bind(styles);

function ShowInfo({ onHide }) {
    const [isVisible, setIsVisible] = useState(false);
    const userData = JSON.parse(localStorage.getItem('loginData'));

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleHide = () => {
        onHide();
    };
    console.log('userData', userData);
    console.log('userData', JSON.parse(localStorage.getItem('loginData')));
    return (
        <div>
            <div className={cx('overlay')}></div>
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
                                src="https://zpsocial-f52-org.zadn.vn/435e11d21a79fb27a268.jpg"
                                alt="avt"
                            />
                            <div className={cx('editAvt')}>
                                <FontAwesomeIcon className={cx('iconEditAvt')} icon={faCamera} />
                            </div>
                        </div>
                        <div className={cx('boxTitle')}>
                            <h3 className={cx('title')}> {userData.foundUser.name || 'Tuấn Nguyễn'} </h3>
                            <div className={cx('titleIcon')}>
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
                            <span className={cx('emailResult')}> {userData.foundUser.email || 'Tuấn Nguyễn'}</span>
                        </div>
                        <div className={cx('update')}>
                            <div className={cx('updateContainer')}>
                                <FontAwesomeIcon className={cx('updateIcon')} icon={faPenToSquare} />
                                <h3 className={cx('updateTitle')}>Cập nhật</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ShowInfo;
