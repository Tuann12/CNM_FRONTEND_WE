import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faFaceLaugh, faFaceGrinWide, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './InputChat.module.scss';

const cx = classNames.bind(styles);

function InputChat() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('crossBarIcon')}>
                <div className={cx('tickerIcon')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faFaceLaugh} />
                </div>
                <div className={cx('tickerIcon')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faImage} />
                </div>
            </div>
            <div className={cx('boxInpChat')}>
                <textarea className={cx('chatInp')} type="text" placeholder="Nhập tin nhắn..." />
                <div className={cx('boxIcon')}>
                    <div className={cx('iconInpChat')}>
                        <FontAwesomeIcon className={cx('iconInp')} icon={faFaceGrinWide} />
                    </div>
                    <div className={cx('iconInpChat')}>
                        <FontAwesomeIcon className={cx('iconInp')} icon={faThumbsUp} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputChat;
