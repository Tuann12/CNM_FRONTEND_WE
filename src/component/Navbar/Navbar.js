import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faContactBook, faGear } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('topIcon')}>
                    <div className={cx('avatar')}>
                        <img
                            className={cx('avatarImg')}
                            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vietnamworks.com%2Fhrinsider%2Fanh-dai-dien-facebook-y-nghia.html&psig=AOvVaw3OCxQGJVjRnjJJ6yo4eA0J&ust=1711724887601000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjqqpiel4UDFQAAAAAdAAAAABAK"
                            alt="avatar"
                        />
                    </div>
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
