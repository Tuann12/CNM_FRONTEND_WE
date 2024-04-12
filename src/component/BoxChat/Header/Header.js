import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Search from './Search/Search';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState } from 'react';
import CreateGroup from './CreateGroup';

const cx = classNames.bind(styles);

function Header() {
    const [showCreateGroup, setShowCreateGroup] = useState(false);

    const handleVisibility = () => {
        setShowCreateGroup(false);
    };

    const handleShowCreateGroup = () => {
        setShowCreateGroup(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Search />
                <div className={cx('iconAdd')}>
                    <div className={cx('icon')} onClick={handleShowCreateGroup}>
                        <FontAwesomeIcon icon={faUserGroup} />
                    </div>
                </div>
                {showCreateGroup && <CreateGroup onHide={handleVisibility} />}
            </div>
        </div>
    );
}

export default Header;
