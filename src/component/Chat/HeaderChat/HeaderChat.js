import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMagnifyingGlass, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './HeaderChat.module.scss';

const cx = classNames.bind(styles);
function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('Info')}>
                <img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />
                <h3 className={cx('title')}>Nguyen Thanh Tuan</h3>
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
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faUserGroup} />
                </div>
            </div>
        </div>
    );
}
export default Header;
