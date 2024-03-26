import ItemChat from './ItemChat/ItemChat';
import classNames from 'classnames/bind';
import styles from './ListChat.module.scss';

const cx = classNames.bind(styles);

function ListChat() {
    return (
        <div className={cx('wrapper')}>
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
        </div>
    );
}

export default ListChat;
