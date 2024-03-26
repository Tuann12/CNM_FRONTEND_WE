import HeaderChat from './HeaderChat/HeaderChat';
import ContentChat from './ContentChat/ContentChat';
import InputChat from './InputChat/InputChat';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

const cx = classNames.bind(styles);

function Chat() {
    return (
        <div className={cx('wrapper')}>
            <HeaderChat />
            <ContentChat />
            <InputChat />
        </div>
    );
}
export default Chat;
