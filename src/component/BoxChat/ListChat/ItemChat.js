import classNames from 'classnames/bind';
import styles from './ListChat.module.scss';

const cx = classNames.bind(styles);

function ItemChat({ avatar, title, contentChat, time }) {
    return (
        <div className={cx('ItemChatWrap')}>
            <div className={cx('BoxChatItem')}>
                <div className={cx('avatar')}>{avatar}</div>
                <div className={cx('content')}>
                    <h3 className={cx('title')}>{title}</h3>
                    <span className={cx('content-chat')}>{contentChat}</span>
                </div>
                <div className={cx('time')}>{time}</div>
            </div>
        </div>
    );
}

export default ItemChat;
