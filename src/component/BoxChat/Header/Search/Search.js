import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('searchBox')}>
                <FontAwesomeIcon className={cx('searchIcon')} icon={faMagnifyingGlass} />
                <input className={cx('searchBtn')} type="text" placeholder="Tìm kiếm" />
            </div>
        </div>
    );
}

export default Search;
