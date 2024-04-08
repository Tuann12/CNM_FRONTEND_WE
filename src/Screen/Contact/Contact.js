import styles from './Contact.module.scss';
import classNames from 'classnames/bind';
import ListChat from '../../component/BoxChat/ListChat/ListChat';
import ItemChat from '../../component/BoxChat/ListChat/ItemChat';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <ListChat>
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
                    btnDecline="Decline"
                    btnAccept="Accept"
                />
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
                    btnDecline="Decline"
                    btnAccept="Accept"
                />
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
                    btnDecline="Decline"
                    btnAccept="Accept"
                />
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
                    btnDecline="Decline"
                    btnAccept="Accept"
                />
            </ListChat>
        </div>
    );
}
export default Contact;
