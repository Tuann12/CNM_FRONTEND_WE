import classNames from 'classnames/bind';
import styles from './ListChat.module.scss';

const cx = classNames.bind(styles);

function ListChat({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default ListChat;
