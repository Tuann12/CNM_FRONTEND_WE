import classNames from 'classnames/bind';
import styles from './ItemChat.module.scss';

const cx = classNames.bind(styles);

function ItemChat() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('avatar')}>
                    <img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />
                </div>
                <div className={cx('content')}>
                    <h3 className={cx('title')}>Nguyễn Thanh Tuấn</h3>
                    <span className={cx('content-chat')}>Hãy nhập gì đó</span>
                </div>
                <div className={cx('time')}>3 phút</div>
            </div>
        </div>
    );
}

export default ItemChat;
