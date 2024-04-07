import classNames from 'classnames/bind';
import styles from './ContentChat.module.scss';

const cx = classNames.bind(styles);
function ContentChat({ messages }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('containerMessage')}>
                {messages.map((message, index) => (
                    <div key={index} className={cx('message')}>
                        {message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentChat;
