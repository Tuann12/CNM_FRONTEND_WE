import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faContactBook, faGear } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.scss';

function Navbar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.topIcon}>
                    <div className={styles.avatar}>
                        <img className={styles.avatarImg} src="https://i.pravatar.cc/150?img=10" alt="avatar" />
                    </div>
                    <div className={styles.wrapIcon}>
                        <div className={`${styles.boxIcon} ${styles.active}`}>
                            <FontAwesomeIcon className={styles.icon} icon={faComment} />
                        </div>

                        <div className={styles.boxIcon}>
                            <FontAwesomeIcon className={styles.icon} icon={faContactBook} />
                        </div>
                    </div>
                </div>
                <div className={styles.bottomIcon}>
                    <div className={styles.boxIcon}>
                        <FontAwesomeIcon className={styles.icon} icon={faGear} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
