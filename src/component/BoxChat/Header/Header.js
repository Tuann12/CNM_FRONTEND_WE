import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Search from './Search/Search';
import styles from './Header.module.scss';

function Header() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Search />
                <div className={styles.iconAdd}>
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </div>
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={faUserGroup} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
