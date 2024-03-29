import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faContactBook, faGear } from '@fortawesome/free-solid-svg-icons';
import ShowInfo from '../ShowInfo/ShowInfo';
import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {
    const [showTippy, setShowTippy] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const handleTippyVisibility = () => {
        setShowTippy(!showTippy);
        setShowInfo(false);
    };

    const handleProfileClick = () => {
        setShowTippy(false);
        setShowInfo(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
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
                                    <div className={cx('header')}>Tuấn Nguyễn</div>
                                    <div className={cx('content')}>
                                        <div className={cx('info')} onClick={handleProfileClick}>
                                            Hồ sơ của bạn
                                        </div>
                                        {/* </Tippy> */}
                                        <div className={cx('setting')}>Cài đặt</div>
                                    </div>
                                    <div className={cx('logout')}>Đăng xuất</div>
                                </div>
                            </div>
                        )}
                    >
                        <div className={cx('avatar')} onClick={handleTippyVisibility}>
                            <img
                                className={cx('avatarImg')}
                                src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg"
                                alt="avatar"
                            />
                        </div>
                    </Tippy>
                    {showInfo && <ShowInfo onHide={handleTippyVisibility} />}
                    <div className={cx('wrapIcon')}>
                        <div className={cx('boxIcon', 'active')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faComment} />
                        </div>

                        <div className={cx('boxIcon')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faContactBook} />
                        </div>
                    </div>
                </div>
                <div className={cx('bottomIcon')}>
                    <div className={cx('boxIcon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faGear} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
