import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Search from './Search/Search';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Search />
                <div className={cx('iconAdd')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </div>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faUserGroup} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
