import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faContactBook, faGear } from '@fortawesome/free-solid-svg-icons';
import ShowInfo from '../ShowInfo/ShowInfo';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {
    const [showTippy, setShowTippy] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [userData, setUserData] = useState();
    const location = useLocation();

    const handleTippyVisibility = () => {
        setShowTippy(!showTippy);
        setShowInfo(false);
    };

    const handleProfileClick = () => {
        setShowTippy(false);
        setShowInfo(true);
    };
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        window.location.href = '/';
    };

    const fetchData = () => {
        const storedData = localStorage.getItem('loginData');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }
    };

    const updateUserData = (newUserData) => {
        setUserData(newUserData);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('topIcon')}>
                <Tippy
                    interactive
                    placement="right"
                    trigger="click"
                    visible={showTippy}
                    onClickOutside={() => setShowTippy(false)}
                    render={(attrs) => (
                        <div className={cx('profile')} tabIndex="-1" {...attrs}>
                            <div className={cx('wrapProfile')}>
                                <div className={cx('header')}>{userData.foundUser.name || 'Tuấn Nguyễn'}</div>
                                <div className={cx('content')}>
                                    <div className={cx('info')} onClick={handleProfileClick}>
                                        Hồ sơ của bạn
                                    </div>
                                    {/* </Tippy> */}
                                    <div className={cx('setting')}>Cài đặt</div>
                                </div>
                                <div className={cx('logout')} onClick={handleLogout}>
                                    Đăng xuất
                                </div>{' '}
                            </div>
                        </div>
                    )}
                >
                    <div className={cx('avatar')} onClick={handleTippyVisibility}>
                        <img
                            className={cx('avatarImg')}
                            src={
                                userData?.foundUser.avatar ||
                                'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg'
                            }
                            alt="avatar"
                        />
                    </div>
                </Tippy>
                {showInfo && <ShowInfo onHide={handleTippyVisibility} updateUserData={updateUserData} />}
                <div className={cx('wrapIcon')}>
                    <div className={cx('boxIcon', { active: isActive('/home') })}>
                        <Link to="/home">
                            <FontAwesomeIcon className={cx('icon')} icon={faComment} />
                        </Link>
                    </div>

                    <div className={cx('boxIcon', { active: isActive('/contact') })}>
                        <Link to="/contact">
                            <FontAwesomeIcon className={cx('icon')} icon={faContactBook} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={cx('bottomIcon')}>
                <div className={cx('boxIcon')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faGear} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
