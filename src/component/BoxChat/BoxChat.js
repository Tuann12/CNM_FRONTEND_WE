import ListChat from './ListChat/ListChat';
import ItemChat from './ListChat/ItemChat';
import styles from './BoxChat.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function BoxChat() {
    return (
        <div>
            <ListChat>
                <ItemChat
                    avatar={<img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />}
                    title="Nguyen Van A"
                    contentChat="Hello"
                    time="14 Minutes"
                />
                <ItemChat
                    avatar={<img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />}
                    title="Nguyen Van A"
                    contentChat="Hello"
                    time="14 Minutes"
                />
                <ItemChat
                    avatar={<img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />}
                    title="Nguyen Van A"
                    contentChat="Hello"
                    time="14 Minutes"
                />
                <ItemChat
                    avatar={<img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />}
                    title="Nguyen Van A"
                    contentChat="Hello"
                    time="14 Minutes"
                />
                <ItemChat
                    avatar={<img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />}
                    title="Nguyen Van A"
                    contentChat="Hello"
                    time="14 Minutes"
                />
                <ItemChat
                    avatar={<img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />}
                    title="Nguyen Van A"
                    contentChat="Hello"
                    time="14 Minutes"
                />
                <ItemChat
                    avatar={<img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />}
                    title="Nguyen Van A"
                    contentChat="Hello"
                    time="14 Minutes"
                />
                <ItemChat
                    avatar={<img className={cx('avatarImg')} src="https://i.pravatar.cc/150?img=10" alt="avatar" />}
                    title="Nguyen Van A"
                    contentChat="Hello"
                    time="14 Minutes"
                />
            </ListChat>
        </div>
    );
}
export default BoxChat;
