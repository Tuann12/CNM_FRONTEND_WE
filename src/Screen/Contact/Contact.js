import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './Contact.module.scss';
import classNames from 'classnames/bind';
import ListChat from '../../component/BoxChat/ListChat/ListChat';
import ItemChat from '../../component/BoxChat/ListChat/ItemChat';
import Navbar from '../../component/Navbar/Navbar';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('container')}>
                <ListChat>
                    <div className={cx('itemChat')}>
                        <ItemChat
                            avatar={
                                <img
                                    className={cx('avatarImg')}
                                    src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg"
                                    alt="avatar"
                                />
                            }
                            title="Nguyen Van A"
                            email="ngthtuan333@gmail.com"
                            iconAccept={faCheck}
                            iconDecline={faXmark}
                        />
                    </div>
                    <div className={cx('itemChat')}>
                        <ItemChat
                            avatar={
                                <img
                                    className={cx('avatarImg')}
                                    src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg"
                                    alt="avatar"
                                />
                            }
                            title="Nguyen Van A"
                            email="ngthtuan333@gmail.com"
                            iconAccept={faCheck}
                            iconDecline={faXmark}
                        />
                    </div>{' '}
                    <div className={cx('itemChat')}>
                        <ItemChat
                            avatar={
                                <img
                                    className={cx('avatarImg')}
                                    src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg"
                                    alt="avatar"
                                />
                            }
                            title="Nguyen Van A"
                            email="ngthtuan333@gmail.com"
                            iconAccept={faCheck}
                            iconDecline={faXmark}
                        />
                    </div>{' '}
                    <div className={cx('itemChat')}>
                        <ItemChat
                            avatar={
                                <img
                                    className={cx('avatarImg')}
                                    src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg"
                                    alt="avatar"
                                />
                            }
                            title="Nguyen Van A"
                            email="ngthtuan333@gmail.com"
                            iconAccept={faCheck}
                            iconDecline={faXmark}
                        />
                    </div>
                </ListChat>
            </div>
        </div>
    );
}
export default Contact;
