import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss';

function Search() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.searchBox}>
                <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
                <input className={styles.searchBtn} type="text" placeholder="Tìm kiếm" />
            </div>
        </div>
    );
}

export default Search;
