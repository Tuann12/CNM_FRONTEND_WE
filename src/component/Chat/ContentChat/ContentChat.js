import classNames from 'classnames/bind';
import styles from './ContentChat.module.scss';

const cx = classNames.bind(styles);
function ContentChat() {
    return <div className={cx('wrapper')}></div>;
}
export default ContentChat;
